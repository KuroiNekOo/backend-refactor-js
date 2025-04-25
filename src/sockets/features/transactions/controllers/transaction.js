import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const lastUpdateTimestamps = new Map();

const transactionController = {

  shouldUpdate(rib) {
    const now = Date.now();
    const lastUpdate = lastUpdateTimestamps.get(rib);
    if (lastUpdate && (now - lastUpdate < 1000)) {
      return false;
    }
    lastUpdateTimestamps.set(rib, now);
    return true;
  },

  async newTransaction(data, _, callback) {

    const result = await transactionRepository.paymentByRIB(data);
  
    // -- Gestion d'une erreur non bloquante (promesse non await) --
    // Si la transaction échoue, répondre avec une erreur via le callback
    if (shouldUpdate(result.sender.rib)) {

      bankAccountsRepository.updateBankAccount(
        result.sender.rib, { balance: result.sender.balance },
      ).catch((err) => {
        console.error('Erreur dans updateBankAccount (non bloquante) :', err);
      });

    }

    if (shouldUpdate(result.recipient.rib)) {
  
      bankAccountsRepository.updateBankAccount(
        result.recipient.rib, { balance: result.recipient.balance },
      ).catch((err) => {
        console.error('Erreur dans updateBankAccount (non bloquante) :', err);
      });
  
    }

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ success: true });
  
  },

};

export default transactionController;