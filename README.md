# EmpFlow — Premium Full-Stack Employee Management System

EmpFlow is a futuristic, full-stack Employee Management System built with a glassmorphic dark UI, real-time analytics, and secure cloud integration. It is designed to be beginner-friendly while demonstrating enterprise-grade architecture.

---

## 🚀 Key Features
- **Glassmorphism Dark UI:** Frosted-glass components, sleek animations, and dynamic ambient background light orbs.
- **Talent Command Center:** Dynamic stat cards (Total Workforce, Active Duty, Avg Compensation, New Hires) and analytics charts.
- **Workforce Registry:** Complete CRUD capabilities (Add, Edit, View, and Decommission employees) with real-time search and filters.
- **Cloud Asset Storage:** Profile avatars uploaded via backend APIs stream directly into an **Amazon S3** bucket.
- **Enterprise Security:** Isolated database networking within an **AWS VPC**, protected by security groups and powered by **AWS IAM Roles**.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite, TailwindCSS v3, Framer Motion, Recharts, React Icons
- **Backend:** Node.js, Express, Multer, Multer-S3, JSON Web Tokens, Bcrypt
- **Database:** MySQL 8 (AWS RDS compatible)
- **Cloud Infrastructure:** AWS EC2, AWS RDS, AWS S3, AWS IAM, Custom VPC

---

## 📂 Project Directory Map
- [`frontend/`](file:///C:/Users/karu3/Desktop/cc_proj/frontend) — Single-page React application with glassmorphic styles.
- [`backend/`](file:///C:/Users/karu3/Desktop/cc_proj/backend) — Node.js Express REST API server.
- [`docs/`](file:///C:/Users/karu3/Desktop/cc_proj/docs) — Database schemas, cloud deployment guides, architecture diagrams, and Viva prep sheets.
  - [MySQL DB Schema](file:///C:/Users/karu3/Desktop/cc_proj/docs/schema.sql)
  - [AWS Services Setup & Security Groups](file:///C:/Users/karu3/Desktop/cc_proj/docs/aws_setup.md)
  - [Step-by-Step EC2 Deployment Guide](file:///C:/Users/karu3/Desktop/cc_proj/docs/deployment.md)
  - [System Architecture Specification](file:///C:/Users/karu3/Desktop/cc_proj/docs/architecture.md)
  - [University Coursework Report Points](file:///C:/Users/karu3/Desktop/cc_proj/docs/coursework_report.md)
  - [Viva Preparation Guide Q&A Sheet](file:///C:/Users/karu3/Desktop/cc_proj/docs/viva_qa.md)

---

## ⚙️ Quick Start Installation

### 1. Database Setup
Import the database schema into your local MySQL server or AWS RDS instance:
```bash
mysql -u root -p < docs/schema.sql
```

### 2. Configure Backend Server
Navigate to the `backend/` directory, install packages, and update environment variables:
```bash
cd backend
npm install
cp .env.example .env
# Edit the variables inside .env using a text editor
```
Start the API backend server:
```bash
# Run in development mode
npm run dev

# Run in production mode
npm start
```

### 3. Configure Frontend App
Navigate to the `frontend/` directory, install packages, and start the development server:
```bash
cd ../frontend
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔐 Default Access Credentials
Use the system-wide developer fast-link credentials to bypass credentials during setup:
- **Operator Username:** `admin`
- **Security Keycode:** `admin123`

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.
