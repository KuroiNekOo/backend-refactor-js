import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const transactionController = {

  async newTransaction(data, _, callback) {

    const result = await transactionRepository.paymentByRIB(data);
  
    // -- Gestion d'une erreur non bloquante (promesse non await) --
    // Si la transaction échoue, répondre avec une erreur via le callback
    bankAccountsRepository.updateBankAccount(
      result.sender.rib, { balance: result.sender.balance },
    ).catch((err) => {
      console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    });
  
    bankAccountsRepository.updateBankAccount(
      result.recipient.rib, { balance: result.recipient.balance },
    ).catch((err) => {
      console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    });
  
    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ success: true });
  
  },

};

export default transactionController;