import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';
import marketPriceRepository from '../../../../shared/repositories/db/marketPrice.repository.js';

const transactionController = {

  // async newTransaction(data, _, callback) {

  //   bankAccountsRepository.transferFunds(data).catch((err) => {
  //     console.error('Erreur dans updateBankAccount (non bloquante) :', err);
  //   });

  //   // Répondre avec succès (ça peut être ajusté si besoin)
  //   callback({ success: true });
  // },

  transactionInitiate(data, socket, callback) {
    const { io } = socket.data;

    io.emit('transaction:redirect', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async transactionConfirm(data, socket, callback) {
    const { io } = socket.data;

    bankAccountsRepository.transferFunds(data).catch((err) => {
      console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    });

    io.emit('transaction:validated', data);

    callback({ success: true });
  },

  async createBankAccount(data, socket, callback) {
    const { io } = socket.data;

    // bankAccountsRepository.createBankAccount(data).catch((err) => {
    //   console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    // });

    const bankAccount = await bankAccountsRepository.createBankAccount(data);

    io.emit('account:created', bankAccount);

    callback({ success: true });
  },

  async deleteBankAccount(data, socket, callback) {
    const { io } = socket.data;

    // bankAccountsRepository.deleteBankAccount(data).catch((err) => {
    //   console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    // });

    const bankAccountDeleted = await bankAccountsRepository.deleteBankAccount(data);

    io.emit('account:deleted', bankAccountDeleted);

    callback({ success: true });
  },

  async setDefaultBankAccount(data, socket, callback) {
    const { io } = socket.data;

    bankAccountsRepository.setDefaultBankAccount(data).catch((err) => {
      console.error('Erreur dans setDefaultBankAccount (non bloquante) :', err);
    });

    io.emit('account:defaulted', data);

    callback({ success: true });
  },

  async setPriceFluctuation(data, socket, callback) {
    const { io } = socket.data;

    marketPriceRepository.setPriceFluctuation(data).catch((err) => {
      console.error('Erreur dans setPriceFluctuation (non bloquante) :', err);
    });

    io.emit('setpricefluctuated', data);

    callback({ success: true });
  },

};

export default transactionController;
