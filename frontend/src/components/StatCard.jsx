import React from 'react';
import { motion } from 'framer-motion';

export const StatCard = ({ title, value, icon: Icon, description, trend, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="glass-card rounded-xl p-5 flex flex-col relative overflow-hidden group hover:border-neutral-600/40 transition-colors"
    >
      <div className="flex items-center justify-between mb-3.5">
        <span className="text-[10px] font-semibold tracking-wider text-[var(--text-secondary)] uppercase">{title}</span>
        <div className="text-[var(--text-secondary)]">
          <Icon className="text-sm" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)] font-mono">{value}</span>
        {trend && (
          <span className="text-[10px] font-medium text-[var(--text-primary)] bg-[var(--bg-input)] px-2 py-0.5 rounded-lg border border-[var(--border-color)]">
            {trend}
          </span>
        )}
      </div>

      <p className="text-[10.5px] text-[var(--text-secondary)] mt-auto leading-relaxed">{description}</p>
    </motion.div>
  );
};
export default StatCard;
