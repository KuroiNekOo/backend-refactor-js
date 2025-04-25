import transactionRepository from '../../../../shared/repositories/cache/transaction.repository.js';
import bankAccountsRepository from '../../../../shared/repositories/db/bankAccounts.repository.js';

const timeouts = {};  // Un objet pour stocker les timeoutId

// Mettre à jour les comptes en base une fois le délai de 2s écoulé
function processUpdates(params) {

  const {  ribSender, ribRecipient, balanceSender, balanceRecipient } = params;

  const labelSender = 'SENDER';
  const labelRecipient = 'RECIPIENT';

  const startTime = new Date();
  console.log('Heure de début de la mise à jour:', startTime.toLocaleTimeString());

  console.log(`[UPDATE] [${labelSender}] Mise à jour pour ${ribSender}`);
  bankAccountsRepository.updateBankAccount(ribSender, { balance: balanceSender }).catch((err) => {
    console.error(`[ERROR] Erreur updateBankAccount pour ${ribSender}:`, err);
  });

  console.log(`[UPDATE] [${labelRecipient}] Mise à jour pour ${ribRecipient}`);
  bankAccountsRepository.updateBankAccount(ribRecipient, { balance: balanceRecipient }).catch((err) => {
    console.error(`[ERROR] Erreur updateBankAccount pour ${ribRecipient}:`, err);
  });

}

const transactionController = {

  // async newTransaction(data, _, callback) {

  //   const result = await transactionRepository.paymentByRIB(data);
    
  //   // Fonction qui essaie d'enregistrer un RIB en cache
  //   const tryUpdate = (rib, label) => {
  //     // console.log(`[ATTENTE] [${label}] RIB ${rib} ajouté pour mise à jour.`);
  //     return;
  //   };

  //   tryUpdate(result.sender.rib, 'SENDER');
  //   tryUpdate(result.recipient.rib, 'RECIPIENT');

  //   // Générer une clé unique en fonction du ribSender et ribRecipient
  //   const key = `${result.sender.rib}-${result.recipient.rib}`;

  //   // Si un timeout existe déjà pour ce couple, on le réinitialise
  //   if (timeouts[key]) {
  //     clearTimeout(timeouts[key]);  // Annuler le précédent timer
  //   }
    
  //   // Définir un nouveau timer de 2 secondes
  //   const timeoutId = setTimeout(async () => {
  //     // Récupérer les deux comptes bancaires de redis
  //     const { balance: senderBalance } = await transactionRepository.getBalanceByRIB({
  //       uuid: data.uuid.sender,
  //       rib: data.sender,
  //     });

  //     const { balance: recipientBalance } = await transactionRepository.getBalanceByRIB({
  //       uuid: data.uuid.recipient,
  //       rib: data.recipient,
  //     });

  //     processUpdates({
  //       ribSender: data.sender,
  //       ribRecipient: data.recipient,
  //       balanceSender: senderBalance[0],
  //       balanceRecipient: recipientBalance[0],
  //     });  // Effectuer l'senderData?.[0] après 2s d'attente
  //   }, 2000);

  //   // Stocker le timeoutId dans l'objet avec la clé spécifique
  //   timeouts[key] = timeoutId;

  //   // Répondre avec succès (ça peut être ajusté si besoin)
  //   callback({ success: true });
  // },

  async newTransaction(data, _, callback) {
    try {
      await redis.xAdd('transactions:stream', '*', {
        id: data.id,
        uuidSender: data.uuid.sender,
        uuidRecipient: data.uuid.recipient,
        ribSender: data.sender,
        ribRecipient: data.recipient,
        amount: data.amount,
        timestamp: Date.now(),
      });

      callback({ success: true });
    } catch (err) {
      console.error('[XADD ERROR]', err);
      callback({ success: false, error: err.message });
    }
  },

};

export default transactionController;
