import { getRedisClient } from '../../../config/redis.js';

// Importation du client Redis
const redis = getRedisClient();

// Durée de vie des verrous en millisecondes
const TTL = 5000;

const transactionRepository = {

  async paymentByRIB(params) {
    const { id, uuid, sender, recipient, amount } = params;
  
    const senderKey = `user:${uuid.sender}`;
    const recipientKey = `user:${uuid.recipient}`;
    const senderLockKey = `lock:user:${uuid.sender}:balance`;
    const recipientLockKey = `lock:user:${uuid.recipient}:balance`;
  
    // 🔒 Acquérir les verrous
    // const acquiredSenderLock = await redis.set(senderLockKey, '1', { NX: true, PX: TTL });

    // if (!acquiredSenderLock) {
    //   throw new Error("Une autre transaction est en cours sur le compte émetteur.");
    // }
    const acquiredSenderLock = await acquireLockWithRetry(senderLockKey, TTL, 5, 100); // 5 tentatives, 100ms de délai

    if (!acquiredSenderLock) {
      throw new Error("Verrou émetteur non acquis après plusieurs tentatives.");
    }
    

    const acquiredRecipientLock = await acquireLockWithRetry(recipientLockKey, TTL, 5, 100);

    if (!acquiredRecipientLock) {
      await redis.del(senderLockKey);
      throw new Error("Verrou bénéficiaire non acquis après plusieurs tentatives.");
    }    
    // const acquiredRecipientLock = await redis.set(recipientLockKey, '1', { NX: true, PX: TTL });
    
    // if (!acquiredRecipientLock) {
    //   // Libérer le verrou du sender si celui du recipient échoue
    //   await redis.del(senderLockKey);
    //   throw new Error("Une autre transaction est en cours sur le compte bénéficiaire.");
    // }
  
    try {
      // 🔍 Lire les balances
      const senderData = await redis.json.get(senderKey, {
        path: `$.bankAccounts[?(@.id=="${sender}")].balance`,
      });
  
      const recipientData = await redis.json.get(recipientKey, {
        path: `$.bankAccounts[?(@.id=="${recipient}")].balance`,
      });
  
      const senderBalance = senderData?.[0] ?? null;
      const recipientBalance = recipientData?.[0] ?? null;
  
      if (senderBalance === null || recipientBalance === null) {
        return {
          sender: { rib: sender, balance: senderBalance },
          recipient: { rib: recipient, balance: recipientBalance },
        };
      }
  
      if (senderBalance < amount) {
        throw new Error("Fonds insuffisants.");
      }
  
      if (recipientBalance + amount > 1_000_000) {
        throw new Error("Limite insuffisante.");
      }
  
      // 💸 Mise à jour atomique
      await Promise.all([
        redis.json.numIncrBy(senderKey, `$.bankAccounts[?(@.id=="${sender}")].balance`, -amount),
        redis.json.numIncrBy(recipientKey, `$.bankAccounts[?(@.id=="${recipient}")].balance`, amount),
        redis.json.arrAppend(senderKey, `$.bankAccounts[?(@.id=="${sender}")].transactions`, {
          id,
          recipient,
          amount,
          status: 'success',
          timestamp: Date.now(),
        }),
        redis.json.arrAppend(recipientKey, `$.bankAccounts[?(@.id=="${recipient}")].transactions`, {
          id,
          sender,
          amount,
          status: 'success',
          timestamp: Date.now(),
        }),
      ]);
  
      return {
        sender: { rib: sender, balance: senderBalance - amount },
        recipient: { rib: recipient, balance: recipientBalance + amount },
      };
    } catch (err) {
      throw new Error(`La transaction a échoué : ${err.message}`);
    } finally {
      await Promise.all([
        redis.del(senderLockKey),
        redis.del(recipientLockKey),
      ]);
    }
  },

};

async function acquireLockWithRetry(key, ttl, retries = 3, delay = 100) {
  for (let i = 0; i < retries; i++) {
    const lock = await redis.set(key, '1', { NX: true, PX: ttl });
    if (lock) return true;
    await new Promise((res) => setTimeout(res, delay));
  }
  return false;
}


export default transactionRepository;
