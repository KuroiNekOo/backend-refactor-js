import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const lastUpdateTimestamps = new Map();

function shouldUpdate(rib) {
  const now = Date.now();
  const lastUpdate = lastUpdateTimestamps.get(rib);

  // Vérifie s'il y a eu une mise à jour dans les 2 dernières secondes (2000 ms)
  if (lastUpdate && (now - lastUpdate < 2000)) {
    console.log(`[IGNORE] Transaction ignored for ${rib} (last update was ${now - lastUpdate}ms ago).`);
    return false;
  }

  lastUpdateTimestamps.set(rib, now);
  return true;
}

const transactionController = {

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