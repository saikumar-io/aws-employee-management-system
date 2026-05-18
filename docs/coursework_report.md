# EmpFlow — Coursework Report Bullet Points

Use these structured points to quickly assemble your university project report or academic dossier.

---

## 1. Project Overview & Objectives
- **Problem Statement:** Traditional employee record portals suffer from fragmented information, rigid visual designs, and lack real-time workforce analysis indicators.
- **Project Solution:** Developed **EmpFlow**, a secure, high-fidelity dark glassmorphic portal engineered using standard React v18, Node Express, and an AWS cloud infrastructure.
- **Primary Goals:**
  - Standardized secure CRUD workflows (Add, view, query, update, delete workforce profiles).
  - Streamlined avatar file uploads directly to AWS cloud storage.
  - Interactive, reactive dashboards providing visual salary and workforce statistics.

---

## 2. Key Architecture Decisions
- **Decoupled Client-Server Pipeline:** A React frontend paired with an Express API backend allows for isolated scaling, clean system testing, and independent updates.
- **Glassmorphic Cyberpunk Theme:** Designed with Tailwind v3 and custom ambient backdrops to deliver a high-quality visual style that mimics premium SaaS web portals.
- **AWS Free-Tier Infrastructure:** Built using low-cost cloud components (EC2 Linux nodes, RDS databases, S3 buckets) to ensure easy deployment under standard student budgets.
- **IAM Role Security:** Replaces static plaintext AWS secret keys on the server with EC2 IAM instance profiles for secure bucket access.

---

## 3. Database Design Details
- **Normalized Schema:** Utilizes normalized database relations (Admins, Departments, Employees tables) to prevent data duplication.
- **Database Safety:** Enforces referential integrity using foreign keys (`department_id`) with cascade actions (`ON DELETE SET NULL`), preventing orphaned records if a department is removed.
- **Database Security:** Stores admin passwords as secure hashed strings using Bcrypt, protecting the database from credential leaks.

---

## 4. Key Implementation Highlights
- **Direct S3 Streaming:** Files are uploaded using `multer-s3` to stream avatar images straight to AWS buckets. This keeps the EC2 server lightweight by avoiding local storage overhead.
- **Reactive Data Visualizations:** Integrated **Recharts** charts that automatically adapt to screen sizes and update whenever workforce records are modified.
- **Route Guard Security:** Implemented frontend auth checks that redirect unauthorized visitors back to the `/login` route.

---

## 5. Deployment & System Testing
- **Nginx Web Proxy Setup:** Configured Nginx on EC2 to serve static React pages directly, while acting as a reverse proxy that routes API traffic to Node.js.
- **Process Keep-Alive Daemon:** Used PM2 to keep the backend API running continuously in the background, with automatic restarts on crash or system reboot.
- **Network Isolation:** Configured security groups so the RDS database only accepts requests from the EC2 instance, shielding it from external internet threats.
