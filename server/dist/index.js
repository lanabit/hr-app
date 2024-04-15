"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const router_1 = __importDefault(require("./api/router"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = 4000;
app.use(router_1.default);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send(`<h1>😃 Welcome to Express</h1>`);
});
// app.post('/loginTest', async (req: Request, res: Response) => {
//   console.log(req.body);
//   const { email, password } = req.body;
//   console.log(email);
//   const [user] = await prisma.employee.findMany({
//     where: {
//       email: email,
//     },
//   });
//   if (user.password != password) {
//     return res.status(404).send('salah password atau email');
//   }
//   console.log(user);
//   const { id, position, name } = user;
//   return res.send({
//     data: { id, position, name, email },
//   });
// });
// app.post('/keepLogin', async (req: Request, res: Response) => {
//   const { userId } = req.body;
//   // console.log(userId);
//   const findEmployee = await prisma.employee.findUnique({
//     where: {
//       id: userId,
//     },
//   });
//   console.log(findEmployee);
//   res.send(findEmployee);
// });
app.listen(port, () => {
    console.log(`😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`);
});
