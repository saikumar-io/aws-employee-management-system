const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Create a connection pool — reuses connections for performance
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, // Enabled to allow executing schema.sql setup script
  ssl: {
    // Required for AWS RDS connections
    rejectUnauthorized: false,
  },
});

// Test connection and auto-initialize tables on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ MySQL connected successfully');
    
    // Check if the 'employees' table already exists
    const [tables] = await conn.query(
      `SELECT COUNT(*) AS count FROM information_schema.tables 
       WHERE table_schema = ? AND table_name = 'employees'`,
      [process.env.DB_NAME || 'emp_db']
    );

    if (tables[0].count === 0) {
      console.log('⚠️ Database tables not found. Initializing schema...');
      // Read docs/schema.sql from the project root
      const schemaPath = path.join(__dirname, '..', '..', '..', 'docs', 'schema.sql');
      if (fs.existsSync(schemaPath)) {
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        await conn.query(schemaSql);
        console.log('✅ Database schema initialized and seeded successfully!');
      } else {
        console.warn(`❌ Schema file not found at: ${schemaPath}`);
      }
    } else {
      console.log('ℹ️ Database tables already exist. Skipping schema initialization.');
    }
    
    conn.release();
  } catch (err) {
    console.error('❌ MySQL connection or initialization failed:', err.message);
  }
})();

module.exports = pool;
