import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rkportal',
    password: 'password',
    port: 5432,
});

const seed = async () => {
    try {
        console.log('Seeding...');

        // Users
        await pool.query(`
            INSERT INTO users (email, password_hash, role, full_name, is_verified) 
            VALUES ('admin@rk.com', '$2b$10$YourHashHere', 'ADMIN', 'Demo Admin', true)
            ON CONFLICT (email) DO NOTHING;
        `);

        // Job (Load)
        await pool.query(`
            INSERT INTO jobs (shipper_id, origin, destination, material_type, weight_volume, status)
            VALUES ((SELECT id FROM users LIMIT 1), 'Mumbai', 'Delhi', 'Chemicals', '20MT', 'OPEN')
            RETURNING id;
        `);

        // Events
        await pool.query(`
            INSERT INTO events (title, date, location, description) VALUES 
            ('Transport Expo 2026', '2026-03-20', 'Mumbai', 'Biggest Transport Expo'),
            ('Logistics Summit', '2026-04-15', 'Delhi', 'National Logistics Summit')
        `); // No ON CONFLICT for simple table without unique constraint on title maybe? Schema didn't specify unique.

        // Partners
        await pool.query(`
            INSERT INTO partners (name, type, description) VALUES 
            ('RK Engineering', 'Fabricator', 'Expert in Tank Fabrication'),
            ('Apex Fab Tech', 'Fabricator', 'SS 316 Specialist')
        `);

        console.log('Seeding complete.');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
};

seed();
