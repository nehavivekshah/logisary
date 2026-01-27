import type { Response } from 'express';
import pool from '../config/db.js';
import type { AuthRequest } from '../middleware/auth.js';

export const getAdminStats = async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const userCount = await pool.query('SELECT COUNT(*) FROM users');
        const jobCount = await pool.query('SELECT COUNT(*) FROM jobs');
        const bidCount = await pool.query('SELECT COUNT(*) FROM bids');

        res.json({
            users: parseInt(userCount.rows[0].count),
            jobs: parseInt(jobCount.rows[0].count),
            bids: parseInt(bidCount.rows[0].count)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
