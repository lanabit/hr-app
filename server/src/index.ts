import express, { Express, Request, Response } from "express";
import router from "./api/router";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app: Express = express();
const port = 4000;

app.use(router);
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
app.get("/", (req: Request, res: Response) => {
  res.send(`<h1>😃 Welcome to Express</h1>`);
});

app.listen(port, () => {
  console.log(
    `😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`
  );
});
