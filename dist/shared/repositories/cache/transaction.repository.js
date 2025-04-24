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
exports.transactionsRedisRepository = void 0;
const redis_1 = require("../../../config/redis");
// Importation du client Redis
const redis = (0, redis_1.getRedisClient)();
// Durée de vie des verrous en millisecondes
const TTL = 5000;
exports.transactionsRedisRepository = {
    paymentByRIB(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { id, uuid, sender, recipient, amount } = params;
            const senderKey = `user:${uuid.sender}`;
            const recipientKey = `user:${uuid.recipient}`;
            const senderLockKey = `lock:user:${uuid.sender}:balance`;
            const recipientLockKey = `lock:user:${uuid.recipient}:balance`;
            // 🔒 Acquérir les verrous
            const acquiredSenderLock = yield redis.set(senderLockKey, '1', { NX: true, PX: TTL });
            const acquiredRecipientLock = yield redis.set(recipientLockKey, '1', { NX: true, PX: TTL });
            if (!acquiredSenderLock || !acquiredRecipientLock) {
                throw new Error("Une autre transaction est en cours, veuillez réessayer.");
            }
            try {
                // 🔍 Lire les balances
                const senderData = yield redis.json.get(senderKey, {
                    path: `$.bankAccounts[?(@.rib=="${sender}")].balance`,
                });
                const recipientData = yield redis.json.get(recipientKey, {
                    path: `$.bankAccounts[?(@.rib=="${recipient}")].balance`,
                });
                const senderBalance = (_a = senderData === null || senderData === void 0 ? void 0 : senderData[0]) !== null && _a !== void 0 ? _a : null;
                const recipientBalance = (_b = recipientData === null || recipientData === void 0 ? void 0 : recipientData[0]) !== null && _b !== void 0 ? _b : null;
                if (senderBalance === null || recipientBalance === null) {
                    return {
                        sender: { rib: sender, balance: senderBalance },
                        recipient: { rib: recipient, balance: recipientBalance },
                    };
                }
                if (senderBalance < amount) {
                    throw new Error("Fonds insuffisants.");
                }
                if (recipientBalance + amount > 1000000) {
                    throw new Error("Limite insuffisante.");
                }
                // 💸 Mise à jour atomique
                yield Promise.all([
                    redis.json.numIncrBy(senderKey, `$.bankAccounts[?(@.rib=="${sender}")].balance`, -amount),
                    redis.json.numIncrBy(recipientKey, `$.bankAccounts[?(@.rib=="${recipient}")].balance`, amount),
                    redis.json.arrAppend(senderKey, `$.bankAccounts[?(@.rib=="${sender}")].transactions`, {
                        id,
                        recipient,
                        amount,
                        status: 'success',
                        timestamp: Date.now(),
                    }),
                    redis.json.arrAppend(recipientKey, `$.bankAccounts[?(@.rib=="${recipient}")].transactions`, {
                        id,
                        sender,
                        amount,
                        status: 'success',
                        timestamp: Date.now(),
                    }),
                ]);
                return {
                    sender: { rib: sender, balance: senderBalance - amount },
                    recipient: { rib: recipient, balance: recipientBalance + amount },
                };
            }
            catch (err) {
                throw new Error(`La transaction a échoué : ${err.message}`);
            }
            finally {
                yield Promise.all([
                    redis.del(senderLockKey),
                    redis.del(recipientLockKey),
                ]);
            }
        });
    }
};
