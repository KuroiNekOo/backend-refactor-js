import { createClient } from 'redis';

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      console.log(`Tentative de reconnexion Redis #${retries}`);
      return Math.min(retries * 500, 5000);
    },
    keepAlive: 1000,
    connectTimeout: 10000,
  },
});

redisClient.on('error', async (err) => {
  console.error('Redis Client Error:', err);

  if (!redisClient.isOpen && !redisClient.isReady) {
    console.log('Tentative de reconnexion Redis...');
    try {
      await redisClient.connect();
      console.log('Redis reconnecté avec succès.');
    } catch (reconnectErr) {
      console.error('Échec de reconnexion Redis:', reconnectErr);
    }
  }
});

export const initRedis = async () => {
  try {
    await redisClient.connect();
    // console.log('✅ Connected to Redis');
  } catch (err) {
    console.error('❌ Failed to connect to Redis', err);
  }
};

export const getRedisClient = () => redisClient;

export const closeRedis = async () => {
  if (redisClient.isOpen) {
    await redisClient.quit();
    // console.log('🛑 Redis closed');
  }
};
