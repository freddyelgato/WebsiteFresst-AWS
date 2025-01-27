/* Crear base de datos */
CREATE DATABASE space_of_sport;

/* Usar base de datos */
USE space_of_sport;

/* Crear tabla */
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL
);

/* Insertar datos */
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'admin123', 'admin'),
('Regular User', 'user@example.com', 'user123', 'user');