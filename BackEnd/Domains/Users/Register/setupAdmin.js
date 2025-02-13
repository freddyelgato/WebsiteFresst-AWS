import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pkg;  // Destructuring Pool from the imported object

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Hash the admin password
const hashedPassword = await bcrypt.hash('admin123', 10); // Number of hash rounds, adjust as needed
console.log('Hashed password:', hashedPassword);

// Then, insert the user with the hashed password into the database
const insertUser = await pool.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', ['Admin', 'admin@email.com', hashedPassword, 'admin']);

console.log('Admin user created successfully');
