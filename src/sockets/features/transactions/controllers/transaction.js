import { paymentByRIB } from '../../../../shared/repositories/cache/transaction.repository.js';

export const newTransaction = async (data, socket, callback) => {
  // Logique métier
  console.log("socket:", socket.id);
  console.log('New transaction:', data);
  // Logique métier, par exemple traiter une transaction

  const result = await paymentByRIB(data);

  console.log('Transaction result:', result);

  // Si tout se passe bien, répondre avec un succès via le callback
  callback({ success: true });
};