import CompanyRepository from "../../../../shared/repositories/db/company.repository";

const CompaniesController = {

  async recruitmentSend(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('recruitment:send:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async recruitmentConfirmed(data, socket, callback) {
    CompanyRepository.addPlayerToCompany(data).catch((err) => {
      console.error('Erreur dans addPlayerToCompany (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('recruitment:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async dismissalSend(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('dismissal:send:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async dismissalConfirmed(data, socket, callback) {
    CompanyRepository.removePlayerFromCompany(data).catch((err) => {
      console.error('Erreur dans removePlayerFromCompany (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('dismissal:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

};

export default CompaniesController;
