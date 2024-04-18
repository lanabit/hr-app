import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './api/router';

const app: Express = express();
const port = 4000;

app.use(router);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>😃 Welcome to Express</h1>`);
});

app.listen(port, () => {
  console.log(
    `😃 🥶 ⚡️[server]: Server is running at http://localhost:${port}`
  );
});
