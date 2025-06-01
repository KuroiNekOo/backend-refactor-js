import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';
import marketPriceRepository from '../../../../shared/repositories/db/marketPrice.repository.js';

const transactionController = {

  transactionInitiate(data, socket, callback) {
    const { io } = socket.data;

    io.emit('transaction:redirect', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async transactionConfirm(data, socket, callback) {
    const { io } = socket.data;

    // bankAccountsRepository.transferFunds(data).catch((err) => {
    //   console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    // });

    const transactions = await bankAccountsRepository.transferFunds(data);

    io.emit('transaction:validated', transactions);

    callback({ success: true });
  },

  async transactionCancel(data, socket, callback) {
    const { io } = socket.data;

    io.emit('transaction:cancelled', data);

    callback({ success: true });
  },

  async createBankAccount(data, socket, callback) {
    const { io } = socket.data;

    // bankAccountsRepository.createBankAccount(data).catch((err) => {
    //   console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    // });

    const bankAccount = await bankAccountsRepository.createBankAccount(data);

    if (!bankAccount) {
      throw new Error('Error creating bank account');
    }

    io.emit('account:created', bankAccount);

    callback({ success: true });
  },

  async deleteBankAccount(data, socket, callback) {
    const { io } = socket.data;

    // bankAccountsRepository.deleteBankAccount(data).catch((err) => {
    //   console.error('Erreur dans updateBankAccount (non bloquante) :', err);
    // });

    const bankAccountDeleted = await bankAccountsRepository.deleteBankAccount(data);

    if (!bankAccountDeleted) {
      throw new Error('Error deleting bank account');
    }

    io.emit('account:deleted', bankAccountDeleted);

    callback({ success: true });
  },

  async setDefaultBankAccount(data, socket, callback) {
    const { io } = socket.data;

    // bankAccountsRepository.setDefaultBankAccount(data).catch((err) => {
    //   console.error('Erreur dans setDefaultBankAccount (non bloquante) :', err);
    // });

    const bankAccount = await bankAccountsRepository.setDefaultBankAccount(data);

    io.emit('account:defaulted', bankAccount);

    callback({ success: true });
  },

  async setPriceFluctuation(data, socket, callback) {
    const { io } = socket.data;

    // marketPriceRepository.setPriceFluctuation(data).catch((err) => {
    //   console.error('Erreur dans setPriceFluctuation (non bloquante) :', err);
    // });

    const marketPrice = await marketPriceRepository.setPriceFluctuation(data);

    io.emit('setpricefluctuated', marketPrice);

    callback({ success: true });
  },

};

export default transactionController;
