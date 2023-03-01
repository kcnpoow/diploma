import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import formData from 'express-form-data';
import mongoose from 'mongoose';

import userRouter from './routers/user.router.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:9999', credentials: true }));
app.use(cookieParser());
app.use(formData.parse());
app.use(formData.format());
app.use(formData.union());
app.use('/api/user', userRouter);
app.use(errorMiddleware);

const start = () => {
  try {
    mongoose.set('strictQuery', false);
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
