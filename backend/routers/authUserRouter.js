import { Router } from 'express';

import userController from '../controllers/UserController.js';

const router = new Router();

router.put('/update', userController.update);

export default router;
