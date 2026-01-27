import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import type { User, UserRole } from '../types/index.js';

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const register = async (req: Request, res: Response) => {
    const { email, password, role, full_name, phone_number, company_name } = req.body;

    try {
        // Check if user exists
        const userCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // Transaction
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const userRes = await client.query(
                'INSERT INTO users (email, password_hash, role, full_name, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, role, full_name, created_at',
                [email, passwordHash, role, full_name, phone_number]
            );
            const user = userRes.rows[0];

            if (role === 'CARRIER' && company_name) {
                await client.query(
                    'INSERT INTO carrier_profiles (user_id, company_name) VALUES ($1, $2)',
                    [user.id, company_name]
                );
            }

            await client.query('COMMIT');
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, email: user.email },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, email: user.email, role: user.role, full_name: user.full_name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
