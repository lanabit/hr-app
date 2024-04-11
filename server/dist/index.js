"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./api/router"));
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = (0, express_1.default)();
const port = 4000;
app.use(router_1.default);
/* app.get("/checkshift", async (req: Request, res: Response) => {
  try {
    const shift_data = await prisma.shift.findMany();

    res.send({
      status: "success",
      data: shift_data,
    });
  } catch (error: any) {
    res.send(error.message);
  }
});
 */
app.get("/", (req, res) => {
    res.send(`<h1>😃 Welcome to Express</h1>`);
});
app.listen(port, () => {
    console.log(`😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`);
});
