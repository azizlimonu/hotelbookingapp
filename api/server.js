import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();

// connect mongoDB
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected To MongoDB");
  } catch (error) {
    throw error
  }
}

mongoose.set('strictQuery', false);

mongoose.connection.on('disconnected', () => {
  console.log("MongoDB Disconnected");
});

// middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// usage routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  connect();
  console.log(`Server Running On Port ${PORT}`);
});
