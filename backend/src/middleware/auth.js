const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware (Bypassed for Direct Mode).
 * Attaches a mock user payload and calls next() to allow credential-free operation.
 */
const verifyToken = (req, res, next) => {
  // Direct Mode pass-through: always authorize
  req.user = { id: 1, username: 'admin', role: 'admin' };
  next();
};

module.exports = { verifyToken };
