import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiCpu } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

export const Login = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter all security credentials');
      return;
    }

    const result = await login(username, password);
    if (result.success) {
      toast.success('Access Granted. Navigating to Command Center...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-right" toastOptions={{ style: { background: 'rgba(3,0,20,0.9)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      
      {/* Dynamic light bubble background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-indigo-500/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="glass-card max-w-md w-full p-8 relative overflow-hidden"
      >
        {/* Glow border ring */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Branding header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 animate-float">
            <FiCpu className="text-2xl text-white" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            EMP<span className="text-indigo-400">FLOW</span> COMMAND
          </h2>
          <p className="text-xs text-slate-400 mt-1.5">Provide credentials to initialize telemetry link.</p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Operator Username
            </label>
            <div className="relative">
              <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 glass-input"
                placeholder="Enter admin ID"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
              Security Keycode
            </label>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 glass-input"
                placeholder="Enter password code"
                required
              />
            </div>
          </div>

          {/* Quick instructions alert */}
          <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3 text-xs text-indigo-300 flex flex-col gap-1">
            <span className="font-bold uppercase tracking-wider">💡 System Fast-Link Enabled:</span>
            <span>Default Operator ID: <strong className="text-white font-mono">admin</strong></span>
            <span>Default Security Keycode: <strong className="text-white font-mono">admin123</strong></span>
          </div>

          {/* Action button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full glass-button-primary flex items-center justify-center gap-2 py-3"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Establish Telemetry Link</span>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-8 text-center text-[10px] text-slate-500 font-mono">
          SECURE PROTOCOL SEC-X109 // TLS REQUIRED
        </div>
      </motion.div>
    </div>
  );
};
export default Login;
