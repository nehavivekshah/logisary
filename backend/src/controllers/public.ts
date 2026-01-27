import type { Request, Response } from 'express';
import pool from '../config/db.js';

export const getLandingPageData = async (req: Request, res: Response) => {
    try {
        // 1. Vehicles: Get carriers with fleet details (limit 5)
        const vehicles = await pool.query(`
            SELECT u.id, cp.company_name, cp.fleet_size, cp.service_types,
                   'Mumbai' as origin, 'Delhi' as destination, -- Placeholder as carrier profiles don't inherently have ONE route
                   '20MT' as capacity
            FROM carrier_profiles cp
            JOIN users u ON cp.user_id = u.id
            WHERE cp.fleet_size > 0
            LIMIT 5
        `);

        // 2. Tenders: Get recent jobs (limit 5) - simulating tenders
        const tenders = await pool.query(`
            SELECT id, description as title, '2026-01-30' as due_date
            FROM jobs
            WHERE status = 'OPEN'
            ORDER BY created_at DESC
            LIMIT 5
        `);

        // 3. Events
        const events = await pool.query('SELECT * FROM events ORDER BY date ASC LIMIT 5');

        // 4. Partners
        const partners = await pool.query("SELECT * FROM partners WHERE type = 'Fabricator' LIMIT 5");

        // 5. Loads (Public Jobs)
        const loads = await pool.query("SELECT origin, destination, weight_volume FROM jobs WHERE status = 'OPEN' ORDER BY created_at DESC LIMIT 10");

        res.json({
            vehicles: vehicles.rows,
            tenders: tenders.rows,
            events: events.rows,
            partners: partners.rows,
            loads: loads.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getServices = async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM services ORDER BY title ASC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

