import express from 'express';
import { createRouter } from './routes/index.js';

const app = express();

app.use(express.json());

app.use(createRouter())

export default app;