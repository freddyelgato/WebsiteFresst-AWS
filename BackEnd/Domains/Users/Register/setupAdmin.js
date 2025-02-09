import pkg from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const { Pool } = pkg;  // Desestructuración de Pool desde el objeto importado

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Hashear la contraseña del administrador
const hashedPassword = await bcrypt.hash('admin123', 10); // Número de rondas de hash, ajusta según sea necesario
console.log('Contraseña hasheada:', hashedPassword);

// Luego, inserta el usuario con la contraseña hasheada en la base de datos
const insertUser = await pool.query('INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)', ['Admin', 'admin@email.com', hashedPassword, 'admin']);

console.log('Usuario admin creado con éxito');
