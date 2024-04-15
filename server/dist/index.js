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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`<h1>😃 Welcome to Express</h1>`);
});
// app.get('/test', async (req: Request, res: Response) => {
//   const getData = await prisma.employee.findMany();
//   res.send(getData);
//   console.log(getData);
// });
// app.get('/filter', async (req: Request, res: Response) => {
//   const findEmployee = await prisma.employee.findMany({
//     where: {
//       id: 1,
//     },
//   });
//   res.send(findEmployee);
// });
app.post('/loginTest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    const [user] = yield prisma.employee.findMany({
        where: {
            email: email,
        },
    });
    if (user.password != password) {
        return res.status(404).send('salah password atau email');
    }
    console.log(user);
    const { id, position, name } = user;
    return res.send({
        data: { id, position, name, email },
    });
}));
app.post('/keepLogin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.body;
    // console.log(userId);
    const findEmployee = yield prisma.employee.findUnique({
        where: {
            id: userId,
        },
    });
    console.log(findEmployee);
    res.send(findEmployee);
}));
app.listen(port, () => {
    console.log(`😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`);
});
