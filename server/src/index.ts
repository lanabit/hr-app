import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import router from './api/router';

const prisma = new PrismaClient();

const app: Express = express();
const port = 4000;

app.use(router);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
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
  console.log(
    `😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`
  );
});
