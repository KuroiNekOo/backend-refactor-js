"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    HTTP_PORT: zod_1.z.string().default('3000'),
    HTTP_DOMAIN: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string().url(),
    REDIS_URL: zod_1.z.string().url(),
    SESSION_SECRET: zod_1.z.string().min(10),
});
exports.env = envSchema.parse(process.env);
