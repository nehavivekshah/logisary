import express from 'express';
import { checkStatus, installApp, seedData } from '../controllers/setup.js';

const router = express.Router();

router.get('/status', checkStatus);
router.post('/install', installApp);
router.post('/seed', seedData);

export default router;
