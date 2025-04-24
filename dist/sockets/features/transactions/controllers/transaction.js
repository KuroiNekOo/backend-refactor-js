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
exports.newTransaction = void 0;
const newTransaction = (data, socket, callback) => __awaiter(void 0, void 0, void 0, function* () {
    // Logique métier
    console.log("io:", socket.data.io);
    console.log("socket:", socket.id);
    console.log("callback:", callback);
    console.log('New transaction:', data);
    // Logique métier, par exemple traiter une transaction
    // Si tout se passe bien, répondre avec un succès via le callback
    callback({ success: true });
});
exports.newTransaction = newTransaction;
