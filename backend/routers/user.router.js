import { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware.js';
import userController from '../controllers/user.controller.js';

const userRouter = new Router();

userRouter.get('/refresh', userController.refresh);
userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);
userRouter.get('/logout', authMiddleware, userController.logout);
userRouter.put('/update', authMiddleware, userController.update);

export default userRouter;
