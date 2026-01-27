import type { Request, Response } from 'express';
import pool from '../config/db.js';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id;
        const role = (req as any).user.role;

        let stats = {
            activeJobs: 0,
            pendingBids: 0,
            myBids: 0
        };

        if (role === 'SHIPPER') {
            // Count active jobs (not DELIVERED) posted by this shipper
            const jobsRes = await pool.query(
                "SELECT COUNT(*) FROM jobs WHERE shipper_id = $1 AND status != 'DELIVERED'",
                [userId]
            );
            stats.activeJobs = parseInt(jobsRes.rows[0].count);

            // Count pending bids on my jobs
            const bidsRes = await pool.query(
                "SELECT COUNT(*) FROM bids b JOIN jobs j ON b.job_id = j.id WHERE j.shipper_id = $1 AND b.status = 'PENDING'",
                [userId]
            );
            stats.pendingBids = parseInt(bidsRes.rows[0].count);

        } else if (role === 'CARRIER') {
            // Count my bids
            const bidsRes = await pool.query(
                "SELECT COUNT(*) FROM bids WHERE carrier_id = $1",
                [userId]
            );
            stats.myBids = parseInt(bidsRes.rows[0].count);

            // Count active jobs assigned to me (where I have an ACCEPTED bid? or job has carrier_id?)
            // Currently schema might not have carrier_id on job directly, usually linked via accepted bid.
            // Let's assume for now we just count 'ACCEPTED' bids as active jobs
            const activeRes = await pool.query(
                "SELECT COUNT(*) FROM bids WHERE carrier_id = $1 AND status = 'ACCEPTED'",
                [userId]
            );
            // OR better: Jobs I won that are not delivered
            // "SELECT COUNT(*) FROM jobs j JOIN bids b ON j.id = b.id WHERE b.carrier_id = $1 ..." - simplistic approach for now:
            stats.activeJobs = parseInt(activeRes.rows[0].count);
        }

        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
