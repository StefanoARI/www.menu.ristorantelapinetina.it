-- Schema MySQL per Ristorante La Pinetina
-- Database: risto114_menu

CREATE DATABASE IF NOT EXISTS risto114_menu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE risto114_menu;

CREATE TABLE IF NOT EXISTS menus (
    id INT AUTO_INCREMENT PRIMARY KEY,
    menu_key VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(150) NOT NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    content_json LONGTEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(150) NOT NULL,
    role VARCHAR(50) DEFAULT 'Gestore'
);

INSERT INTO admin_users (username, password_hash, email, role) 
VALUES ('risto114_gestore', '$2y$10$EXAMPLEHASHSECURE', 'gestore@ristorantelapinetina.it', 'Super Admin')
ON DUPLICATE KEY UPDATE id=id;
