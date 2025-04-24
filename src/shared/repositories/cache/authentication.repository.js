import { getRedisClient } from '../../../config/redis.js';
import { AUTH_CODE_REGEX } from '../../../sockets/features/authentication/schemas/authentication.schemas.js';
import RandExp from 'randexp';

// Importation du client Redis
const redis = getRedisClient();

// Durée de vie en secondes
const TTL = 300;

const authenticationRepository = {

  async generateCode(uuid) {
    // Génération d'un code avec randexp
    const code = new RandExp(AUTH_CODE_REGEX).gen();

    // Stockage du code dans Redis avec un TTL
    await redis.set(`signup:code:${uuid}`, code, {
      EX: TTL,
    });

    return code;
  },

  async checkCode(uuid, code) {
    // Vérification du code dans Redis
    const storedCode = await redis.get(`signup:code:${uuid}`);

    if (storedCode === code) {
      // Si le code est correct, suppression de l'entrée dans Redis
      await redis.del(`signup:code:${uuid}`);
      return true;
    }

    return false;
  },

};

export default authenticationRepository;
