import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import initDb from './db/init.js';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/users.js';
import setupRoutes from './routes/setup.js';
import publicRoutes from './routes/public.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);
app.use('/setup', setupRoutes);
app.use('/public', publicRoutes);

app.get('/', (req, res) => {
  res.send('RK Portal API is running');
});

import { createServer } from 'http';
import { initSocket } from './socket.js';

const startServer = async () => {
  const httpServer = createServer(app);
  initSocket(httpServer);

  // Attempt to initialize DB, but don't crash if it fails (e.g. no Docker)
  await initDb();

  httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
