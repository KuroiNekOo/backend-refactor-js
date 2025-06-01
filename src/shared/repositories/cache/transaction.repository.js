// import { getRedisClient } from '../../../config/redis.js';

// // Importation du client Redis
// const redis = getRedisClient();

// const transactionRepository = {

//   async paymentByRIB(params) {
//     const { id, uuid, sender, recipient, amount } = params;
  
//     const senderKey = `player:${uuid.sender}`;
//     const recipientKey = `player:${uuid.recipient}`;

//     try {
//       // 🔍 Lire les balances
//       const senderData = await redis.json.get(senderKey, {
//         path: `$.bankAccounts[?(@.id=="${sender}")].balance`,
//       });
  
//       const recipientData = await redis.json.get(recipientKey, {
//         path: `$.bankAccounts[?(@.id=="${recipient}")].balance`,
//       });
  
//       const senderBalance = senderData?.[0] ?? null;
//       const recipientBalance = recipientData?.[0] ?? null;

//       if (senderBalance === null || recipientBalance === null) {
//         throw new Error("Les soldes sont introuvables.");
//       }

//       if (senderBalance < amount) {
//         throw new Error("Fonds insuffisants.");
//       }
  
//       if (recipientBalance + amount > 1_000_000) {
//         throw new Error("Limite insuffisante.");
//       }

//       // 💸 Mise à jour atomique
//       await Promise.all([
//         redis.json.numIncrBy(senderKey, `$.bankAccounts[?(@.id=="${sender}")].balance`, -amount),
//         redis.json.numIncrBy(recipientKey, `$.bankAccounts[?(@.id=="${recipient}")].balance`, amount),
//         redis.json.arrAppend(senderKey, `$.bankAccounts[?(@.id=="${sender}")].transactions`, {
//           id,
//           recipient,
//           amount,
//           status: 'success',
//           timestamp: Date.now(),
//         }),
//         redis.json.arrAppend(recipientKey, `$.bankAccounts[?(@.id=="${recipient}")].transactions`, {
//           id,
//           sender,
//           amount,
//           status: 'success',
//           timestamp: Date.now(),
//         }),
//       ]);
  
//       return {
//         sender: { rib: sender, balance: senderBalance - amount },
//         recipient: { rib: recipient, balance: recipientBalance + amount },
//       };
//     } catch (err) {
//       throw new Error(`La transaction a échoué : ${err.message}`);
//     }
//   },

//   async getBalanceByRIB(params) {
//     const { uuid, rib } = params;

//     const userKey = `player:${uuid}`;

//     const balance = await redis.json.get(userKey, {
//       path: `$.bankAccounts[?(@.id=="${rib}")].balance`,
//     });

//     if (balance === null || balance.length === 0) {
//       throw new Error('RIB non trouvé');
//     }

//     return {
//       rib,
//       balance,
//     };

//   },

// };



// export default transactionRepository;

import { getRedisClient } from '../../../config/redis.js';

const redis = getRedisClient();

const transactionRepository = {

  async paymentByRIB({ id, uuid, sender, recipient, amount }) {
    const senderKey = `player:${uuid.sender}`;
    const recipientKey = `player:${uuid.recipient}`;

    try {
      const senderData = await redis.json.get(senderKey, {
        path: `$.bankAccounts[?(@.id=="${sender}")].balance`,
      });

      const recipientData = await redis.json.get(recipientKey, {
        path: `$.bankAccounts[?(@.id=="${recipient}")].balance`,
      });

      const senderBalance = senderData?.[0];
      const recipientBalance = recipientData?.[0];

      if (senderBalance === null || recipientBalance === null)
        throw new Error("Balances introuvables");

      if (senderBalance < amount)
        throw new Error("Fonds insuffisants");

      if (recipientBalance + amount > 1_000_000)
        throw new Error("Limite dépassée");

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
      throw new Error(`Redis Error: ${err.message}`);
    }
  },

  async getBalanceByRIB({ uuid, rib }) {
    const userKey = `player:${uuid}`;
    const balance = await redis.json.get(userKey, {
      path: `$.bankAccounts[?(@.id=="${rib}")].balance`,
    });

    if (!balance?.length) {
      throw new Error("RIB introuvable");
    }

    return { rib, balance };
  },
};

export default transactionRepository;
