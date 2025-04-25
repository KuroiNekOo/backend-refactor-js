import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

import LRU from 'lru-cache';
import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const updateCache = new LRU({
  ttl: 2000,      // ⏱️ 2 secondes
  max: 1000,      // Limite d’entrées dans le cache
});

// Renvoie true si on peut faire l’update maintenant
function canUpdate(rib) {
  return !updateCache.has(rib);
}

// Marque un rib comme mis à jour
function markUpdated(rib) {
  updateCache.set(rib, true); // expire tout seul dans 2s
}

const transactionController = {

  async newTransaction(data, _, callback) {

    const result = await transactionRepository.paymentByRIB(data);
  
    const tryUpdate = (rib, balance, label) => {
      if (canUpdate(rib)) {
        bankAccountsRepository.updateBankAccount(rib, { balance }).catch((err) => {
          console.error(`[${label}] Erreur updateBankAccount :`, err);
        });
        markUpdated(rib);
      } else {
        console.log(`[SKIP] Update ignoré pour ${rib} (déjà fait récemment)`);
      }
    };

    tryUpdate(result.sender.rib, result.sender.balance, 'SENDER');
    tryUpdate(result.recipient.rib, result.recipient.balance, 'RECIPIENT');

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