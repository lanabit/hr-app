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
exports.keepLogin = exports.Login = void 0;
const LoginService_1 = require("./LoginService");
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const [user] = yield (0, LoginService_1.LoginQuery)(email);
        if (user.password != password) {
            return res.status(404).json({ message: 'Wrong password' });
        }
        const { id, position, name } = user;
        return res.send({
            data: {
                id,
                position,
                name,
                email,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            message: error,
        });
    }
});
exports.Login = Login;
const keepLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const findUserById = yield (0, LoginService_1.KeepLoginQuery)(userId);
        res.send(findUserById);
    }
    catch (error) {
        res.status(404).json({
            message: error,
        });
    }
});
exports.keepLogin = keepLogin;
