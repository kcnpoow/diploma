import { Router } from 'express';

import userController from '../controllers/UserController.js';

const router = new Router();

router.get('/refresh', userController.refresh);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.get('/logout', userController.logout);

export default router;
