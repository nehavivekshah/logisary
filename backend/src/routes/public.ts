import express from 'express';
import { getLandingPageData, getServices } from '../controllers/public.js';

const router = express.Router();

router.get('/landing', getLandingPageData);
router.get('/services', getServices);

export default router;

// export default router;
