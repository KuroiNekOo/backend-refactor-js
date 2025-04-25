import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const lastUpdateTimestamps = new Map();
const pendingTimeouts = new Map();

function scheduleDeferredUpdate(rib, balance, updateFn) {
  if (pendingTimeouts.has(rib)) return; // On évite de reprogrammer plusieurs fois

  const delay = 2000 - (Date.now() - lastUpdateTimestamps.get(rib));

  const timeout = setTimeout(() => {
    updateFn().catch((err) => {
      console.error(`[DEFERRED] Erreur updateBankAccount pour ${rib} :`, err);
    });

    lastUpdateTimestamps.set(rib, Date.now());
    pendingTimeouts.delete(rib);
  }, delay);

  pendingTimeouts.set(rib, timeout);
}

function shouldUpdate(rib) {
  const now = Date.now();
  const lastUpdate = lastUpdateTimestamps.get(rib);

  if (lastUpdate && (now - lastUpdate < 2000)) {
    console.log(`[DEFERRED] Trop récent pour ${rib}, on reporte l'update.`);
    return false;
  }

  lastUpdateTimestamps.set(rib, now);
  return true;
}

const transactionController = {

  async newTransaction(data, _, callback) {

    const result = await transactionRepository.paymentByRIB(data);
  
    const updateSender = () => bankAccountsRepository.updateBankAccount(
      result.sender.rib, { balance: result.sender.balance }
    );

    const updateRecipient = () => bankAccountsRepository.updateBankAccount(
      result.recipient.rib, { balance: result.recipient.balance }
    );

    if (shouldUpdate(result.sender.rib)) {
      updateSender().catch((err) => {
        console.error('Erreur updateBankAccount (sender) :', err);
      });
    } else {
      scheduleDeferredUpdate(result.sender.rib, result.sender.balance, updateSender);
    }

    if (shouldUpdate(result.recipient.rib)) {
      updateRecipient().catch((err) => {
        console.error('Erreur updateBankAccount (recipient) :', err);
      });
    } else {
      scheduleDeferredUpdate(result.recipient.rib, result.recipient.balance, updateRecipient);
    }

    // -- Gestion d'une erreur non bloquante (promesse non await) --
    // Si la transaction échoue, répondre avec une erreur via le callback
    // if (shouldUpdate(result.sender.rib)) {

    //   bankAccountsRepository.updateBankAccount(
    //     result.sender.rib, { balance: result.sender.balance },
    //   ).catch((err) => {
    //     console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    //   });

    // }

    // if (shouldUpdate(result.recipient.rib)) {
  
    //   bankAccountsRepository.updateBankAccount(
    //     result.recipient.rib, { balance: result.recipient.balance },
    //   ).catch((err) => {
    //     console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    //   });
  
    // }

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ success: true });
  
  },

};

export default transactionController;