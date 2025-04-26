import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const transactionController = {

  async newTransaction(data, _, callback) {

    bankAccountsRepository.transferFunds(data).catch((err) => {
      console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    });

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

};

export default transactionController;
