import redis from './src/config/redis.js';
import transactionRepository from './src/shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from './src/shared/repositories/db/bankAccounts.repository.js';
import { io } from './src/config/socket.js'; // socket.io instance partagée

async function processUpdates({ ribSender, ribRecipient, uuidSender, uuidRecipient }) {
  const sender = await transactionRepository.getBalanceByRIB({ uuid: uuidSender, rib: ribSender });
  const recipient = await transactionRepository.getBalanceByRIB({ uuid: uuidRecipient, rib: ribRecipient });

  await bankAccountsRepository.updateBankAccount(ribSender, { balance: sender.balance[0] });
  await bankAccountsRepository.updateBankAccount(ribRecipient, { balance: recipient.balance[0] });

  io.to(uuidSender).emit('transaction:update', {
    rib: ribSender,
    newBalance: sender.balance[0],
  });

  io.to(uuidRecipient).emit('transaction:update', {
    rib: ribRecipient,
    newBalance: recipient.balance[0],
  });
}

async function streamWorker() {
  console.log('[WORKER] Démarrage du worker Redis Stream...');
  while (true) {
    try {
      const entries = await redis.xRead(
        { key: 'transactions:stream', id: '$' },
        { BLOCK: 5000, COUNT: 1 }
      );

      if (entries) {
        const [stream] = entries;
        for (const entry of stream.messages) {
          const data = Object.fromEntries(entry.message);

          console.log(`[WORKER] Traitement de ${data.id}`);

          await transactionRepository.paymentByRIB({
            id: data.id,
            uuid: {
              sender: data.uuidSender,
              recipient: data.uuidRecipient,
            },
            sender: data.ribSender,
            recipient: data.ribRecipient,
            amount: Number(data.amount),
          });

          // Délai avant persistance SQL + envoi WS
          setTimeout(() => {
            processUpdates({
              ribSender: data.ribSender,
              ribRecipient: data.ribRecipient,
              uuidSender: data.uuidSender,
              uuidRecipient: data.uuidRecipient,
            });
          }, 2000);
        }
      }
    } catch (err) {
      console.error('[WORKER ERROR]', err);
    }
  }
}

streamWorker();
