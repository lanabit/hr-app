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
exports.KeepLoginQuery = exports.LoginQuery = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const LoginQuery = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const LoginQuery = yield prisma.employee.findMany({
        where: {
            email: email,
        },
    });
    return LoginQuery;
});
exports.LoginQuery = LoginQuery;
const KeepLoginQuery = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const KeepLoginQuery = yield prisma.employee.findUnique({
        where: {
            id: userId,
        },
    });
    return KeepLoginQuery;
});
exports.KeepLoginQuery = KeepLoginQuery;
