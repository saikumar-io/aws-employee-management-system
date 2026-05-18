import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Dashboard } from './pages/Dashboard';

const MainApp = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 border border-neutral-800 border-t-white rounded-full animate-spin" />
        <span className="text-neutral-500 font-mono text-[10px] tracking-widest uppercase">Initializing Console...</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Load main administrative and viewer panel directly at root */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Navigate to="/" replace />} />
      {/* Redirect all other unknown paths back to the main console */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
};

export default App;
