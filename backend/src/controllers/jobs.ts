import type { Request, Response } from 'express';
import pool from '../config/db.js';
import type { AuthRequest } from '../middleware/auth.js';
import type { Job } from '../types/index.js';
import { getIO } from '../socket.js';

export const createJob = async (req: AuthRequest, res: Response) => {
    if (req.user?.role !== 'SHIPPER') {
        return res.status(403).json({ message: 'Only shippers can post jobs' });
    }

    const { origin, destination, material_type, weight_volume, scheduled_date, description } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO jobs (shipper_id, origin, destination, material_type, weight_volume, scheduled_date, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [req.user.id, origin, destination, material_type, weight_volume, scheduled_date, description]
        );

        const newJob = result.rows[0];

        getIO().emit('new_job', {
            id: newJob.id,
            origin: newJob.origin,
            destination: newJob.destination
        });

        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Public endpoint for landing page
export const getPublicJobs = async (req: Request, res: Response) => {
    try {
        // Limit to 10 recent jobs for the landing page
        const result = await pool.query('SELECT origin, destination, weight_volume FROM jobs WHERE status = \'OPEN\' ORDER BY created_at DESC LIMIT 10');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getJobs = async (req: AuthRequest, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM jobs ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateJobStatus = async (req: AuthRequest, res: Response) => {
    // In a real app, verify that the user is the assigned carrier or the shipper
    const { id } = req.params;
    const { status } = req.body; // e.g., 'IN_TRANSIT', 'DELIVERED'

    try {
        const result = await pool.query(
            'UPDATE jobs SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const updatedJob = result.rows[0];

        // Notify via socket
        getIO().emit('job_update', {
            id: updatedJob.id,
            status: updatedJob.status,
            shipper_id: updatedJob.shipper_id
        });

        res.json(updatedJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
