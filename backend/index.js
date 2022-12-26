import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import errorMiddleware from './middlewares/errorMiddleware.js';
import userRouter from './routers/userRouter.js';
import authUserRouter from './routers/authUserRouter.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();
app.use(cors({ origin: 'http://localhost:9999', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRouter);
app.use('/api/user', authMiddleware, authUserRouter);
app.use(errorMiddleware);

const start = () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT);
  } catch (error) {
    console.log(error);
  }
};

start();
