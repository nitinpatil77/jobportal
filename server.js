import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import dbConfig from './config/dbConfig.js';
import { clerkWebhook } from './src/controller/webhooks.js';
import connectCloudinary from './config/cloudinary.js'
import Companyrouter from './src/routes/companyRoutes/companyRoutes.js';
import jobRouter from './src/routes/jobRoute/jobRoutes.js';
// initial express app
const app=express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;
// connect to the database
await dbConfig.connect();
// connect to cloudinary
await connectCloudinary();
// middleware
app.use(cors());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});
app.post('/webhooks',clerkWebhook)
app.use('/api/v1/company',Companyrouter);
app.use('/api/v1/jobs', jobRouter);
// start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});