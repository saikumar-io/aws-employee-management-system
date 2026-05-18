-- ─────────────────────────────────────────────────────────
-- EMPFLOW DATABASE INITIALIZATION SCHEMA
-- ─────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS emp_db;
USE emp_db;

-- 1. System administrators directory
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed default system administrator: admin / admin123
-- (Bcrypt hash of 'admin123' is $2a$10$T1K7f4/2t/m8kE0yW0Zk/ezl4rT5/o0zCj/1V0Wf7eL.HqyC6P3v6)
INSERT INTO admins (username, password_hash)
VALUES ('admin', '$2a$10$T1K7f4/2t/m8kE0yW0Zk/ezl4rT5/o0zCj/1V0Wf7eL.HqyC6P3v6')
ON DUPLICATE KEY UPDATE username=username;


-- 2. Departments lookup reference
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Seed core departments
INSERT INTO departments (id, name) VALUES
(1, 'Engineering'),
(2, 'Product Design'),
(3, 'Operations & Sec'),
(4, 'Quantum Research'),
(5, 'Human Resources')
ON DUPLICATE KEY UPDATE name=name;


-- 3. Core workforce database table
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(20),
  department_id INT,
  role VARCHAR(100),
  salary DECIMAL(10,2),
  status ENUM('active','inactive') DEFAULT 'active',
  avatar_url VARCHAR(500),
  joined_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- Seed default initial employees
INSERT INTO employees (first_name, last_name, email, phone, department_id, role, salary, status, avatar_url, joined_date)
VALUES
('Tony', 'Stark', 'tony@stark.com', '+1 (555) 012-3456', 4, 'Chief Quantum Architect', 250000.00, 'active', NULL, '2020-05-01'),
('Steve', 'Rogers', 'steve@avengers.com', '+1 (555) 987-6543', 3, 'Tactical Security Lead', 115000.00, 'active', NULL, '2021-08-15'),
('Wanda', 'Maximoff', 'wanda@magic.io', '+1 (555) 234-5678', 1, 'Core Platform Engineer', 145000.00, 'active', NULL, '2022-02-10'),
('Bruce', 'Banner', 'bruce@hulk.org', '+1 (555) 876-5432', 4, 'Bio-Gamma Consultant', 195000.00, 'inactive', NULL, '2023-11-20'),
('Natasha', 'Romanoff', 'natasha@blackwidow.net', '+1 (555) 345-6789', 5, 'Human Intelligence Officer', 98000.00, 'active', NULL, '2019-04-12');
