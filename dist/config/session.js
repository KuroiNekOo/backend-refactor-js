"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = require("connect-redis");
const redis_1 = require("./redis");
const redisStore = new connect_redis_1.RedisStore({
    client: (0, redis_1.getRedisClient)(),
    prefix: 'express_session_id:',
});
exports.sessionMiddleware = (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: redisStore,
    cookie: {
        maxAge: 3600000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    },
});
