dotenv.config();

import express from  'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';


// connecting database
mongoose.connect(process.env.MONGO_URL, (err)=>{
    if(err) throw err;
    console.log('Database connected');
})

// app config
const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// api routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({success: false, statusCode, message })
})