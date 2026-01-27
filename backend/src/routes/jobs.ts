import { Router } from 'express';
import { createJob, getJobs, updateJobStatus, getPublicJobs } from '../controllers/jobs.js';
import { authenticateToken } from '../middleware/auth.js';
import { placeBid, getJobBids } from '../controllers/bids.js';

const router = Router();

router.get('/public', getPublicJobs); // Public access
router.post('/', authenticateToken, createJob);
router.get('/', authenticateToken, getJobs);

// Bids nested under jobs
router.post('/:job_id/bids', authenticateToken, placeBid);
router.get('/:job_id/bids', authenticateToken, getJobBids);
router.patch('/:id/status', authenticateToken, updateJobStatus);

export default router;
