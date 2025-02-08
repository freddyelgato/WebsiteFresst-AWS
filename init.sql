CREATE TABLE IF NOT EXISTS users ( 
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    role VARCHAR(10) NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')) 
    );

INSERT INTO users (name, email, password, role)
SELECT 'Admin', 'admin@email.com', '$2a$10$N0.JGIVLQ5RCF9Uz2VnIX.w6qbf2OTxyTrr4wXGHEtFp8SR0N4kBe', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@email.com');