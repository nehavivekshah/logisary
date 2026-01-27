import type { Response } from 'express';
import pool from '../config/db.js';
import type { AuthRequest } from '../middleware/auth.js';
import { getIO } from '../socket.js';

export const placeBid = async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== 'CARRIER') {
        return res.status(403).json({ message: 'Only carriers can place bids' });
    }

    const { job_id } = req.params;
    const { amount, estimated_delivery_time, message } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO bids (job_id, carrier_id, amount, estimated_delivery_time, status, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [job_id, req.user.id, amount, estimated_delivery_time, 'PENDING', message]
        );

        const newBid = result.rows[0];

        getIO().emit('new_bid', {
            job_id,
            amount: newBid.amount,
            carrier_name: 'A Carrier'
        });

        res.status(201).json(newBid);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getJobBids = async (req: AuthRequest, res: Response) => {
    const { job_id } = req.params;

    // Check if user is the shipper of the job or the carrier who made the bid?
    // For simplicity, let's allow shippers to see all bids for their job.

    try {
        // Ideally verify ownership first
        const result = await pool.query('SELECT * FROM bids WHERE job_id = $1 ORDER BY amount ASC', [job_id]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
