import express, { Router } from 'express';
import { Login, keepLogin } from './LoginController';

const router = Router();
router.use(express.json());

router.post('/', Login);
router.post('/keep-login', keepLogin);

export default router;
