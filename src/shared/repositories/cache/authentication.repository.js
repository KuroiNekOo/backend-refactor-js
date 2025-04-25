import { getRedisClient } from '../../../config/redis.js';
import { AUTH_CODE_REGEX } from '../../../sockets/features/authentication/schemas/authentication.schemas.js';
import RandExp from 'randexp';

// Importation du client Redis
const redis = getRedisClient();

// Durée de vie en secondes
const TTL = 300;

const authenticationRepository = {

  async generateCode(prefix, uuid) {
    // Génération d'un code avec randexp
    const code = new RandExp(AUTH_CODE_REGEX).gen();

    // Stockage du code dans Redis avec un TTL
    await redis.set(`${prefix}:code:${uuid}`, code, {
      EX: TTL,
    });

    return code;
  },

  async checkCode(prefix, uuid, code) {
    // Vérification du code dans Redis
    const storedCode = await redis.get(`${prefix}:code:${uuid}`);

    if (storedCode === code) {
      // Si le code est correct, suppression de l'entrée dans Redis
      await redis.del(`${prefix}:code:${uuid}`);
      return true;
    }

    return false;
  },

  async storeSession(uuid, session) {
    // Convertir toutes les dates en chaînes ISO
    const sanitizedSession = JSON.parse(
      JSON.stringify(session, (_, value) =>
        value instanceof Date ? value.toISOString() : value
      )
    );

    return redis.json.set(`player:${uuid}`, '.', sanitizedSession);
  },

  async deleteStoreSession(uuid) {
    return redis.del(`player:${uuid}`);
  },

};

export default authenticationRepository;
