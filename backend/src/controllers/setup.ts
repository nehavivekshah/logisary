import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');

export const checkStatus = async (req: Request, res: Response) => {
    // Check if .env exists
    if (!fs.existsSync(envPath)) {
        return res.json({ installed: false, message: 'Configuration file not found' });
    }

    // Try connecting to DB
    // We import dynamically to avoid caching the old config
    try {
        const { default: pool } = await import('../config/db.js');
        await pool.query('SELECT NOW()');
        // Check if users table exists
        await pool.query('SELECT count(*) FROM users');
        res.json({ installed: true });
    } catch (error) {
        res.json({ installed: false, message: 'Database connection failed or not initialized', error: (error as any).message });
    }
};

export const installApp = async (req: Request, res: Response) => {
    const {
        dbHost, dbPort, dbName, dbUser, dbPassword,
        adminEmail, adminPassword, adminName
    } = req.body;

    // 1. Test Connection
    const tempPool = new Pool({
        user: dbUser,
        host: dbHost,
        database: dbName,
        password: dbPassword,
        port: parseInt(dbPort),
    });

    try {
        await tempPool.query('SELECT NOW()');
    } catch (error) {
        return res.status(400).json({ message: 'Database connection failed', error: (error as any).message });
    }

    // 2. Write .env file
    const envContent = `PORT=3000
DB_HOST=${dbHost}
DB_PORT=${dbPort}
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD=${dbPassword}
JWT_SECRET=${uuidv4()}
CORS_ORIGIN=http://localhost:3001
`;

    fs.writeFileSync(envPath, envContent);

    // 3. Initialize DB (Run Schema)
    try {
        const schemaPath = path.resolve(__dirname, '../db/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await tempPool.query(schemaSql);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to initialize database schema', error: (error as any).message });
    }

    // 4. Create Admin User
    try {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await tempPool.query(
            'INSERT INTO users (email, password_hash, role, full_name, is_verified) VALUES ($1, $2, $3, $4, $5)',
            [adminEmail, hashedPassword, 'ADMIN', adminName, true]
        );
    } catch (error) {
        // Ignore if already exists (restart capability) or handle error
        console.error("Admin creation warning:", error);
    } finally {
        await tempPool.end();
    }

    res.json({ success: true, message: 'Installation completed' });
};

export const seedData = async (req: Request, res: Response) => {
    try {
        const { default: pool } = await import('../config/db.js');

        // Insert sample events
        await pool.query(`
            INSERT INTO events (title, date, location, description) VALUES 
            ('Transport Expo 2026', '2026-03-20', 'Mumbai', 'Biggest Transport Expo'),
            ('Logistics Summit', '2026-04-15', 'Delhi', 'National Logistics Summit')
            ON CONFLICT DO NOTHING
        `);

        // Insert sample partners
        await pool.query(`
            INSERT INTO partners (name, type, description) VALUES 
            ('RK Engineering', 'Fabricator', 'Expert in Tank Fabrication'),
            ('Apex Fab Tech', 'Fabricator', 'SS 316 Specialist')
            ON CONFLICT DO NOTHING
        `);

        res.json({ success: true, message: 'Seed data inserted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to seed data', error: (error as any).message });
    }
};
