-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS BranchesDB;

-- Use the BranchesDB database
USE BranchesDB;

-- Create the branches table if it does not exist
CREATE TABLE IF NOT EXISTS sucursales (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- Auto-incrementing ID
    nombre VARCHAR(100),                -- Branch name
    direccion VARCHAR(255),             -- Address
    telefono VARCHAR(20),               -- Phone number
    ciudad VARCHAR(50),                 -- City
    email VARCHAR(100),                 -- Email address
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Creation date (defaults to current timestamp)
);
