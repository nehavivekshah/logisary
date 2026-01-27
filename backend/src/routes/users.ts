
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getDashboardStats } from '../controllers/users.js';

const router = express.Router();

router.get('/stats', authenticateToken, getDashboardStats);

export default router;
