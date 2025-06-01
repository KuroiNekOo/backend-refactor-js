import authenticationRepository from "../../../../shared/repositories/cache/authentication.repository.js";
import userRepository from "../../../../shared/repositories/db/user.repository.js";

const authenticationController = {

  async signupStep1(data, _, callback) {

    const { pseudo, uuid } = data;

    // Générer le code d'authentification unique dans Redis
    const code = await authenticationRepository.generateCode('signup', uuid);
  
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
    const codeFound = await authenticationRepository.checkCode('signup', uuid, code);

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

  async changePasswordStep1(data, socket, callback) {

    const { pseudo } = data;

    // Vérifier si le pseudo existe dans la base de données
    const user = await userRepository.getUserByPseudo(pseudo);

    if (!user) {
      throw new Error('User not found');
    }

    //! Vérifier que le pseudo est strictement égal au pseudo de l'utilisateur
    //! Car MySQL par défaut est insensible à la casse, ptn de bdd de merde
    if (user.name !== pseudo) {
      throw new Error('User not found');
    }

    const uuid = user.id;

    // Générer le code d'authentification unique dans Redis
    const code = await authenticationRepository.generateCode('changepassword', uuid);
  
    if (!code) {
      throw new Error('Code generation failed');
    }
  
    // Envoyer le succès à tous les canaux changepassword:step1:response
    socket.data.io.emit('changepassword:step1:response', {
      pseudo,
      uuid,
      code,
      url: `https://luxentis-dev.netlify.app/change-password?pseudo=${pseudo}&code=${code}&uuid=${uuid}`,
      success: true
    });

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({
      pseudo,
      uuid,
      success: true
    });
  
  },

  async changePasswordStep2(data, socket, callback) {

    const { code, uuid, password } = data;

    // Vérifier le code dans Redis
    const codeFound = await authenticationRepository.checkCode('changepassword', uuid, code);

    if (!codeFound) {
      throw new Error('Code verification failed');
    }

    // -- Gestion d'une erreur non bloquante (promesse non await) --
    userRepository.updateUserAccount(
      { id: uuid, password },
    ).catch((err) => {
      console.error('Erreur dans updateUserAccount (non bloquante) :', err);
    });

    // Envoyer le succès à tous les canaux changepassword:step2:response
    socket.data.io.emit('changepassword:step2:response', { uuid, success: true });

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ ...data, success: true });

  },

  async signin(data, _, callback) {
    const { uuid } = data;

    // Générer la session de l'utilisateur
    const session = await userRepository.generateSession(uuid);

    if (!session) {
      throw new Error('Session generation failed');
    }

    // Stocker la session dans redis
    const result = await authenticationRepository.storeSession(uuid, session);

    if (!result) {
      throw new Error('Session storage failed');
    }

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ ...data, success: true });

  },

  async signout(data, _, callback) {
    const { uuid } = data;

    // Supprimer la session de l'utilisateur
    const result = await authenticationRepository.deleteStoreSession(uuid);

    if (!result) {
      throw new Error('Session deletion failed');
    }

    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ ...data, success: true });

  }

};

export default authenticationController;