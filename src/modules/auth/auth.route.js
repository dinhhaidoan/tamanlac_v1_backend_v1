import { Router } from 'express';
import * as AuthController from './auth.controller.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google', AuthController.googleLogin);

export default router;