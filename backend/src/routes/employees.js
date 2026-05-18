const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const {
  getAllEmployees,
  getEmployeeById,
  getStats,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

// All routes below require a valid JWT
router.use(verifyToken);

// GET /api/employees/stats  — must be before /:id to avoid conflict
router.get('/stats', getStats);

// GET    /api/employees
router.get('/', getAllEmployees);

// GET    /api/employees/:id
router.get('/:id', getEmployeeById);

// POST   /api/employees  (with optional avatar upload)
router.post('/', upload.single('avatar'), createEmployee);

// PUT    /api/employees/:id
router.put('/:id', upload.single('avatar'), updateEmployee);

// DELETE /api/employees/:id
router.delete('/:id', deleteEmployee);

module.exports = router;
