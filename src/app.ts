import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
app.use(express.json());


export default app;