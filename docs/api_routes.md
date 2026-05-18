# EmpFlow — Backend API Reference Documentation

All endpoints are prefixed with `/api`. Returns standard JSON payloads.

---

## 1. Authentication Endpoints

### Establish Telemetry Link (Login)
- **Route:** `POST /auth/login`
- **Authentication Required:** No
- **Request Body:**
  ```json
  {
    "username": "admin",
    "password": "admin123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5...",
    "user": {
      "id": 1,
      "username": "admin"
    }
  }
  ```
- **Error Response (401 Unauthorized):**
  ```json
  {
    "error": "Invalid credentials"
  }
  ```

---

## 2. Workforce Employee Endpoints
All endpoints below require a valid session JWT token sent in the headers as:
`Authorization: Bearer <JWT_TOKEN>`

### Query Workforce Registry
- **Route:** `GET /employees`
- **Query Parameters (Optional):**
  - `search`: Filter by name, email, or role matching query string
  - `department`: Filter by department ID integer
  - `status`: Filter by `active` or `inactive` enum
- **Success Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "first_name": "Tony",
      "last_name": "Stark",
      "email": "tony@stark.com",
      "phone": "+1 (555) 012-3456",
      "department_id": 4,
      "role": "Chief Quantum Architect",
      "salary": "250000.00",
      "status": "active",
      "avatar_url": "https://emp-management-bucket.s3.amazonaws.com/avatars/171593920-avatar.png",
      "joined_date": "2020-05-01T00:00:00.000Z",
      "department_name": "Quantum Research"
    }
  ]
  ```

### Query Dossier Profile
- **Route:** `GET /employees/:id`
- **Success Response (200 OK):** Returns single matching employee profile.

### Query Registry Statistics
- **Route:** `GET /employees/stats`
- **Success Response (200 OK):**
  ```json
  {
    "total": 5,
    "active": 4,
    "inactive": 1,
    "avg_salary": "160600.00",
    "new_this_month": 0,
    "by_department": [
      { "department": "Quantum Research", "count": 2 },
      { "department": "Operations & Sec", "count": 1 }
    ]
  }
  ```

### Onboard Talent (Create Employee)
- **Route:** `POST /employees`
- **Content-Type:** `multipart/form-data`
- **Form Fields:**
  - `first_name` (string, required)
  - `last_name` (string, required)
  - `email` (string, required)
  - `phone` (string)
  - `department_id` (integer)
  - `role` (string, required)
  - `salary` (decimal, required)
  - `status` (enum `active` / `inactive`)
  - `joined_date` (date string)
  - `avatar` (file attachment, optional)
- **Success Response (201 Created):** Returns onboarding details payload.

### Modify Dossier (Update Employee)
- **Route:** `PUT /employees/:id`
- **Content-Type:** `multipart/form-data`
- **Form Fields:** Same as POST.
- **Success Response (200 OK):** Returns updated dossier records.

### Decommission Profile (Delete Employee)
- **Route:** `DELETE /employees/:id`
- **Success Response (200 OK):**
  ```json
  {
    "message": "Employee deleted successfully"
  }
  ```
