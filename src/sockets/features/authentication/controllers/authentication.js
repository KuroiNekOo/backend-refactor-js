import authenticationRepository from "../../../../shared/repositories/cache/authentication.repository.js";
import userRepository from "../../../../shared/repositories/db/user.repository.js";

const authenticationController = {

  async signupStep1(data, _, callback) {

    const { pseudo, uuid } = data;

    const code = await authenticationRepository.generateCode(uuid);
  
    if (!code) {
      throw new Error('Code generation failed');
    }
  
    // Si tout se passe bien, répondre avec un succès via le callback
    callback({
      pseudo,
      uuid,
      code,
      url: `https://luxentis-dev.netlify.app/signup?pseudo=${pseudo}&code=${code}&uuid=${uuid}`,
      success: true
    });
  
  },

  async signupStep2(data, socket, callback) {

    const { pseudo, code, uuid, password } = data;

    // Vérifier le code dans Redis
    const codeFound = await authenticationRepository.checkCode(uuid, code);

    if (!codeFound) {
      throw new Error('Code verification failed');
    }

    // -- Gestion d'une erreur non bloquante (promesse non await) --
    userRepository.createUserAccount(
      { id: uuid, name: pseudo, password },
    ).catch((err) => {
      console.error('Erreur dans updateUserAccount (non bloquante) :', err);
    });

    // Envoyer le succès à tous les canaux signup:step2:response
    socket.data.io.emit('signup:step2:response', { uuid, success: true });

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ ...data, success: true });

  },

};

export default authenticationController;