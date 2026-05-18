import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: 'Guest Viewer', role: 'viewer' });
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load persisted role preference or default to 'viewer'
    const storedRole = localStorage.getItem('emp_role') || 'viewer';
    setUser({
      username: storedRole === 'admin' ? 'Administrator' : 'Guest Viewer',
      role: storedRole,
    });

    // Load persisted theme preference
    const storedTheme = localStorage.getItem('emp_theme') || 'dark';
    setTheme(storedTheme);
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    setLoading(false);
  }, []);

  const toggleRole = () => {
    const newRole = user.role === 'admin' ? 'viewer' : 'admin';
    setUser({
      username: newRole === 'admin' ? 'Administrator' : 'Guest Viewer',
      role: newRole,
    });
    localStorage.setItem('emp_role', newRole);
  };

  const setRole = (role) => {
    setUser({
      username: role === 'admin' ? 'Administrator' : 'Guest Viewer',
      role: role,
    });
    localStorage.setItem('emp_role', role);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('emp_theme', newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  // Mock functions to prevent compile/run errors in other components
  const login = async () => ({ success: true });
  const logout = () => {
    setRole('viewer');
  };

  return (
    <AuthContext.Provider value={{ user, loading, toggleRole, setRole, theme, toggleTheme, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
