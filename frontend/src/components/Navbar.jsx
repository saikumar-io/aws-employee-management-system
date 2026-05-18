import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { AdminLoginModal } from './AdminLoginModal';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { user, setRole, theme, toggleTheme } = useAuth();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  const handleRoleToggleClick = (targetRole) => {
    if (targetRole === 'admin') {
      if (user.role === 'admin') return; // Already admin
      setIsAdminLoginOpen(true);
    } else {
      if (user.role === 'viewer') return; // Already viewer
      setRole('viewer');
      toast.success('Successfully exited Administrator Mode', {
        icon: '🔒'
      });
    }
  };

  const handleLoginSuccess = () => {
    setRole('admin');
    setIsAdminLoginOpen(false);
    toast.success('Administrator Mode unlocked successfully!', {
      icon: '🔐'
    });
  };

  return (
    <>
      <motion.header 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-30 w-full px-6 py-3.5 bg-[var(--bg-card)] border-b border-[var(--border-color)] transition-colors duration-300"
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          {/* Stark Triangle Logo */}
          <div className="flex items-center gap-3 select-none">
            <svg 
              viewBox="0 0 75 65" 
              fill="currentColor" 
              className="w-4 h-4 text-[var(--text-primary)] transform hover:scale-105 transition-transform"
            >
              <polygon points="37.5,0 75,65 0,65" />
            </svg>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-semibold tracking-tight text-[var(--text-primary)] font-sans">
                empflow
              </h1>
              <span className="text-[9px] bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] font-mono px-1.5 py-0.5 rounded">
                v1.1.0
              </span>
            </div>
          </div>

          {/* Theme & Mode Switcher */}
          <div className="flex items-center gap-3">
            {/* Elegant Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <FiSun className="text-xs" /> : <FiMoon className="text-xs" />}
            </button>

            {/* Mode Switcher Pill */}
            <div className="flex items-center bg-[var(--bg-input)] border border-[var(--border-color)] rounded-lg p-0.5 select-none text-[10px]">
              <button
                onClick={() => handleRoleToggleClick('viewer')}
                className={`px-3 py-1 rounded transition-all duration-150 ${
                  user.role === 'viewer' 
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] font-medium border border-[var(--border-color)] shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Viewer
              </button>
              <button
                onClick={() => handleRoleToggleClick('admin')}
                className={`px-3 py-1 rounded transition-all duration-150 ${
                  user.role === 'admin' 
                    ? 'bg-[var(--button-primary-bg)] text-[var(--button-primary-text)] font-semibold shadow-sm' 
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Admin Credentials Login modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
};
export default Navbar;
