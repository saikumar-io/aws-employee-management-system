import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLock, FiX, FiAlertCircle } from 'react-icons/fi';

export const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUsername('');
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onSuccess();
    } else {
      setError('Invalid admin credentials. Hint: admin / admin123');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="glass-card max-w-sm w-full p-6 relative z-10 text-left shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border-color)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] flex items-center gap-2">
                <FiLock className="text-neutral-400" />
                <span>Admin Authentication</span>
              </h3>
              <button
                onClick={onClose}
                className="text-neutral-500 hover:text-[var(--text-primary)] transition-colors"
              >
                <FiX className="text-sm" />
              </button>
            </div>

            <p className="text-[11px] text-[var(--text-secondary)] mb-4 leading-relaxed">
              Access to administrative tools requires authentication. Please provide the operational credentials.
            </p>

            {/* Error message */}
            {error && (
              <div className="mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] rounded-lg p-2.5 flex items-start gap-1.5 font-sans">
                <FiAlertCircle className="text-sm flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full glass-input"
                />
              </div>

              <div>
                <label className="block text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full glass-input"
                />
              </div>

              <div className="bg-[var(--bg-input)] rounded-lg p-2.5 border border-[var(--border-color)] text-[10px] text-neutral-500 font-mono flex items-center justify-between">
                <span>Demo Hint:</span>
                <span className="text-[var(--text-primary)]">admin / admin123</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="glass-button-secondary py-1.5 px-3"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="glass-button-primary py-1.5 px-3.5 font-semibold"
                >
                  Sign In
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AdminLoginModal;
