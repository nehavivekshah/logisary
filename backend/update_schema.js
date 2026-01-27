import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'rkportal',
    password: 'password',
    port: 5432,
});

const updateSchema = async () => {
    try {
        console.log('Updating schema...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                title VARCHAR(255) NOT NULL,
                description TEXT,
                icon VARCHAR(100),
                category VARCHAR(100),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Services table created.');

        console.log('Seeding Services...');
        await pool.query(`
            INSERT INTO services (title, category, description, icon) VALUES
            ('Lubricant & Additives', 'Industrial', 'Specialized lubricant transport', 'Droplets'),
            ('Hazard & Non-Hazard chemical', 'Chemical', 'Safe handling of hazardous materials', 'FlaskConical'),
            ('FMCG', 'Consumer', 'Fast moving consumer goods logistics', 'ShoppingBasket'),
            ('Industrial Oil', 'Industrial', 'Bulk industrial oil transportation', 'Fuel')
        `);
        console.log('Seeding complete.');
    } catch (e) {
        console.error(e);
    } finally {
        await pool.end();
    }
};

updateSchema();
