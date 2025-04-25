import { io } from 'socket.io-client';

// Fonction qui génère une transaction avec des données spécifiques
function generateTransaction(id, sender, recipient, ribSender, ribRecipient) {
  return {
    id,
    uuid: {
      sender,
      recipient,
    },
    sender: ribSender,
    recipient: ribRecipient,
    amount: 1,
  };
}

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// Première salve
async function sendRequestsFirstSalve() {
  // Console log l'heure du début de la première salve
  const startTime = new Date();
  console.log('Heure de début de la première salve:', startTime.toLocaleTimeString());

  const totalSalves = 150; // Nombre de salves à envoyer
  const interval = 50; // 50ms entre les salves
  const requestsPerSalve = 6; // Nombre de requêtes par salve

  // Données de base
  const baseRibSender = 'BA03D5C9';
  const baseRibRecipient = 'BA01F9C4';
  const baseUUIDSender = 'b91740dd-e9a0-4ab0-bfd8-b2948c2f6538';
  const baseUUIDRecipient = '1d6378f5-937a-40a1-8ce9-6bbcb9e14b7b';

  let salveCount = 0;

  // Fonction pour envoyer 6 requêtes en même temps
  const emitRequests = () => {
    for (let i = 0; i < requestsPerSalve; i++) {
      // Générer un uuid random
      const uuid = crypto.randomUUID();

      const transaction = generateTransaction(
        uuid,
        baseUUIDSender,
        baseUUIDRecipient,
        baseRibSender,
        baseRibRecipient,
      );
      // Émettre une requête via socket.io
      socket.emit('transaction', transaction, (response) => {
        return response?.success;
      });
    }
    salveCount += 1;
    if (salveCount >= totalSalves) {
      clearInterval(salveInterval); // Arrêter l'envoi des salves une fois la limite atteinte
      const endTime = new Date();
      console.log('Heure de fin de la première salve:', endTime.toLocaleTimeString());
    }
  };

  // Déclenche l'envoi toutes les 50ms
  const salveInterval = setInterval(emitRequests, interval);
}

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// Seconde salve
async function sendRequestsSecondSalve() {
  // Console log l'heure du début de la première salve
  const startTime = new Date();
  console.log('Heure de début de la seconde salve:', startTime.toLocaleTimeString());

  const totalSalves = 150; // Nombre de salves à envoyer
  const interval = 50; // 50ms entre les salves
  const requestsPerSalve = 6; // Nombre de requêtes par salve

  // Données de base
  const baseRibSender = 'BA00A2B3';
  const baseRibRecipient = 'BA000001';
  const baseUUIDSender = 'd455b3a1-bb8d-4979-bb79-d60bab0278c4';
  const baseUUIDRecipient = 'e6bd3f00-6a2a-4141-a71a-4abe95fba7c3';

  let salveCount = 0;

  // Fonction pour envoyer 6 requêtes en même temps
  const emitRequests = () => {
    for (let i = 0; i < requestsPerSalve; i++) {
      // Générer un uuid random
      const uuid = crypto.randomUUID();

      const transaction = generateTransaction(
        uuid,
        baseUUIDSender,
        baseUUIDRecipient,
        baseRibSender,
        baseRibRecipient,
      );
      // Émettre une requête via socket.io
      socket.emit('transaction', transaction, (response) => {
        return response?.success;
      });
    }
    salveCount += 1;
    if (salveCount >= totalSalves) {
      clearInterval(salveInterval); // Arrêter l'envoi des salves une fois la limite atteinte
      const endTime = new Date();
      console.log('Heure de fin de la seconde salve:', endTime.toLocaleTimeString());
    }
  };

  // Déclenche l'envoi toutes les 50ms
  const salveInterval = setInterval(emitRequests, interval);
}

// ===============================================================================================
// ===============================================================================================
// ===============================================================================================

// Connexion à Socket.IO et envoi des requêtes
const socket = io('http://localhost:4300/banks');

socket.on('connect', () => {
  console.log('Connecté au serveur Socket.IO');

  // Envoi de la première salve et attendre la fin pour lancer la deuxième
  sendRequestsFirstSalve().then(() => {
    console.log('Première salve terminée, envoi de la seconde salve...');
    sendRequestsSecondSalve();
  });

});

// Gestion des erreurs de connexion
socket.on('connect_error', (error) => {
  console.error('Erreur de connexion:', error);
});
