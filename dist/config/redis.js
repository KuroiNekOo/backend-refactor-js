"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeRedis = exports.getRedisClient = exports.initRedis = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
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
redisClient.on('error', (err) => __awaiter(void 0, void 0, void 0, function* () {
    console.error('Redis Client Error:', err);
    if (!redisClient.isOpen && !redisClient.isReady) {
        console.log('Tentative de reconnexion Redis...');
        try {
            yield redisClient.connect();
            console.log('Redis reconnecté avec succès.');
        }
        catch (reconnectErr) {
            console.error('Échec de reconnexion Redis:', reconnectErr);
        }
    }
}));
const initRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisClient.connect();
        // console.log('✅ Connected to Redis');
    }
    catch (err) {
        console.error('❌ Failed to connect to Redis', err);
    }
});
exports.initRedis = initRedis;
const getRedisClient = () => redisClient;
exports.getRedisClient = getRedisClient;
const closeRedis = () => __awaiter(void 0, void 0, void 0, function* () {
    if (redisClient.isOpen) {
        yield redisClient.quit();
        // console.log('🛑 Redis closed');
    }
});
exports.closeRedis = closeRedis;
