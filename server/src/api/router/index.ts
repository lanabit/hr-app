import express, { Router } from 'express';
import cors from 'cors';
import LoginRouter from '../login/LoginRouter';

const router = Router();

router.use(cors());
router.use(express.json());

router.use('/login', LoginRouter);

export default router;
