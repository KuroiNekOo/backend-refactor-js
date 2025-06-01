import CompanyRepository from "../../../../shared/repositories/db/company.repository";
import PermissionsRepository from "../../../../shared/repositories/db/permissions.repository";

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

  async recruitmentReject(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('recruitment:reject:response', data);

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

  async dismissalReject(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('dismissal:reject:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async createCompany(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:create:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async createCompanyConfirmed(data, socket, callback) {
    CompanyRepository.createCompany(data).catch((err) => {
      console.error('Erreur dans createCompany (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:create:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async createCompanyReject(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:create:reject:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async updateCompany(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:update:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async updateCompanyConfirmed(data, socket, callback) {
    CompanyRepository.updateCompany(data).catch((err) => {
      console.error('Erreur dans updateCompany (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:update:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async updateCompanyReject(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:update:reject:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async deleteCompany(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:delete:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async deleteCompanyConfirmed(data, socket, callback) {
    CompanyRepository.deleteCompany(data).catch((err) => {
      console.error('Erreur dans deleteCompany (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:delete:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async deleteCompanyReject(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('company:delete:reject:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async addPermissionsToPlayer(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('permission:add:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async addPermissionsToPlayerConfirmed(data, socket, callback) {
    PermissionsRepository.addPermissionsToUser(data).catch((err) => {
      console.error('Erreur dans addPermissionsToUser (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('permission:add:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async removePermissionsFromPlayer(data, socket, callback) {
    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('permission:remove:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

  async removePermissionsFromPlayerConfirmed(data, socket, callback) {
    PermissionsRepository.removePermissionsFromUser(data).catch((err) => {
      console.error('Erreur dans removePermissionsFromUser (non bloquante) :', err);
    });

    // repondre a tous sauf a l'emeteur
    socket.broadcast.emit('permission:remove:confirmed:response', data);

    // Répondre avec succès (ça peut être ajusté si besoin)
    callback({ success: true });
  },

};

export default CompaniesController;
