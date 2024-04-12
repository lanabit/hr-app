import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app: Express = express();
const port = 4000;

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>😃 Welcome to Express</h1>`);
});

app.get('/test', async (req: Request, res: Response) => {
  const getData = await prisma.employee.findMany();

  res.send(getData);

  console.log(getData);
});

app.get('/filter', async (req: Request, res: Response) => {
  const findEmployee = await prisma.employee.findMany({
    where: {
      id: 1,
    },
  });
  res.send(findEmployee);
});

app.listen(port, () => {
  console.log(
    `😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`
  );
});
