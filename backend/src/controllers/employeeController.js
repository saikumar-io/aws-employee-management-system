const pool = require('../config/db');

/* ─────────────────────────────────────────────────────────
   GET /api/employees
   Query params: ?search=&department=&status=
───────────────────────────────────────────────────────── */
const getAllEmployees = async (req, res) => {
  const { search = '', department = '', status = '' } = req.query;

  let query = `
    SELECT e.*, d.name AS department_name
    FROM employees e
    LEFT JOIN departments d ON e.department_id = d.id
    WHERE 1=1
  `;
  const params = [];

  if (search) {
    query += ` AND (e.first_name LIKE ? OR e.last_name LIKE ? OR e.email LIKE ? OR e.role LIKE ?)`;
    const s = `%${search}%`;
    params.push(s, s, s, s);
  }
  if (department) {
    query += ` AND e.department_id = ?`;
    params.push(department);
  }
  if (status) {
    query += ` AND e.status = ?`;
    params.push(status);
  }

  query += ` ORDER BY e.created_at DESC`;

  try {
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('getAllEmployees error:', err);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

/* ─────────────────────────────────────────────────────────
   GET /api/employees/stats
───────────────────────────────────────────────────────── */
const getStats = async (req, res) => {
  try {
    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM employees');
    const [[{ active }]] = await pool.query("SELECT COUNT(*) AS active FROM employees WHERE status='active'");
    const [[{ inactive }]] = await pool.query("SELECT COUNT(*) AS inactive FROM employees WHERE status='inactive'");
    const [[{ avg_salary }]] = await pool.query('SELECT AVG(salary) AS avg_salary FROM employees');

    // Employees per department
    const [byDept] = await pool.query(`
      SELECT d.name AS department, COUNT(e.id) AS count
      FROM employees e
      LEFT JOIN departments d ON e.department_id = d.id
      GROUP BY d.name
    `);

    // New hires this month
    const [[{ new_this_month }]] = await pool.query(`
      SELECT COUNT(*) AS new_this_month FROM employees
      WHERE MONTH(joined_date) = MONTH(CURDATE())
        AND YEAR(joined_date) = YEAR(CURDATE())
    `);

    res.json({
      total,
      active,
      inactive,
      avg_salary: parseFloat(avg_salary || 0).toFixed(2),
      new_this_month,
      by_department: byDept,
    });
  } catch (err) {
    console.error('getStats error:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

/* ─────────────────────────────────────────────────────────
   GET /api/employees/:id
───────────────────────────────────────────────────────── */
const getEmployeeById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT e.*, d.name AS department_name
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.id
       WHERE e.id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('getEmployeeById error:', err);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

/* ─────────────────────────────────────────────────────────
   POST /api/employees
───────────────────────────────────────────────────────── */
const createEmployee = async (req, res) => {
  const {
    first_name, last_name, email, phone,
    department_id, role, salary, status, joined_date,
  } = req.body;

  // Avatar URL from S3 if a file was uploaded
  const avatar_url = req.file ? req.file.location : null;

  try {
    const [result] = await pool.query(
      `INSERT INTO employees
        (first_name, last_name, email, phone, department_id, role, salary, status, avatar_url, joined_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, phone, department_id, role, salary, status || 'active', avatar_url, joined_date]
    );
    const [newEmp] = await pool.query('SELECT * FROM employees WHERE id = ?', [result.insertId]);
    res.status(201).json(newEmp[0]);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    console.error('createEmployee error:', err);
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

/* ─────────────────────────────────────────────────────────
   PUT /api/employees/:id
───────────────────────────────────────────────────────── */
const updateEmployee = async (req, res) => {
  const {
    first_name, last_name, email, phone,
    department_id, role, salary, status, joined_date,
  } = req.body;

  const avatar_url = req.file ? req.file.location : undefined;

  // Build dynamic SET clause — only update avatar_url if a new file was uploaded
  const fields = [
    'first_name', 'last_name', 'email', 'phone',
    'department_id', 'role', 'salary', 'status', 'joined_date',
  ];
  const values = [first_name, last_name, email, phone, department_id, role, salary, status, joined_date];

  if (avatar_url !== undefined) {
    fields.push('avatar_url');
    values.push(avatar_url);
  }

  const setClause = fields.map(f => `${f} = ?`).join(', ');
  values.push(req.params.id);

  try {
    const [result] = await pool.query(
      `UPDATE employees SET ${setClause} WHERE id = ?`,
      values
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });

    const [updated] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    res.json(updated[0]);
  } catch (err) {
    console.error('updateEmployee error:', err);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

/* ─────────────────────────────────────────────────────────
   DELETE /api/employees/:id
───────────────────────────────────────────────────────── */
const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error('deleteEmployee error:', err);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  getStats,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
