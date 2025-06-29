import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import dbConfig from './config/dbConfig.js';
import { clerkWebhook } from './src/controller/webhooks.js';

// initial express app
const app=express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;
dbConfig.connect();
// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
app.post('/webhooks',clerkWebhook)
// start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});