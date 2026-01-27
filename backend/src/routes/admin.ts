import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAdminStats } from '../controllers/admin.js';

const router = express.Router();

router.get('/stats', authenticateToken, getAdminStats);

export default router;
