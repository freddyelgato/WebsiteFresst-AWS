-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS BranchesDB;
USE BranchesDB;

-- Crear la tabla de sucursales
CREATE TABLE IF NOT EXISTS sucursales (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID autoincremental
    nombre VARCHAR(100),                -- Nombre de la sucursal
    direccion VARCHAR(255),             -- Dirección
    telefono VARCHAR(20),               -- Teléfono
    ciudad VARCHAR(50),                 -- Ciudad
    email VARCHAR(100),                 -- Correo electrónico
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha de creación
);
