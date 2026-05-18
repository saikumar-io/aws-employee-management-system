import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const Charts = ({ stats }) => {
  const { theme } = useAuth();

  if (!stats) {
    return (
      <div className="glass-card rounded-xl p-12 text-center text-[var(--text-secondary)] text-xs">
        No stats data currently available.
      </div>
    );
  }

  // Formatting department data for recharts
  const deptData = stats.by_department?.map((item) => ({
    name: item.department || 'Unassigned',
    value: item.count,
  })) || [];

  // Pie chart active vs inactive data
  const statusData = [
    { name: 'Active', value: stats.active },
    { name: 'Inactive', value: stats.inactive },
  ];

  // Dynamic colors based on active theme
  const chartFillColor = theme === 'dark' ? '#ffffff' : '#111827';
  const gridStroke = theme === 'dark' ? '#1e2638' : '#e2e8f0';
  const textStroke = theme === 'dark' ? '#9ca3af' : '#4b5563';
  const tooltipBg = theme === 'dark' ? '#0f131a' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#1e2638' : '#e2e8f0';
  const tooltipText = theme === 'dark' ? '#ffffff' : '#111827';

  const PIE_COLORS = theme === 'dark' 
    ? ['#ffffff', '#1e2638'] 
    : ['#111827', '#e2e8f0'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Department Distribution Bar Chart */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-6">
          Workforce Division Distribution
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="name" stroke={textStroke} fontSize={10} tickLine={false} />
              <YAxis stroke={textStroke} fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '8px',
                  color: tooltipText,
                  fontSize: '11px',
                  fontFamily: 'monospace'
                }}
              />
              <Bar dataKey="value" fill={chartFillColor} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Active vs Inactive Status Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-[10px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-6">
          Operational Registry Status
        </h3>
        <div className="h-72 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: tooltipBg,
                  borderColor: tooltipBorder,
                  borderRadius: '8px',
                  color: tooltipText,
                  fontSize: '11px',
                  fontFamily: 'monospace'
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span className="text-[10px] text-[var(--text-secondary)] font-medium font-sans uppercase tracking-wider">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
export default Charts;
