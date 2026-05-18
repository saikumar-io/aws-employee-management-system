import React from 'react';
import { FiGrid, FiUsers, FiTrendingUp, FiActivity, FiShield, FiFileText } from 'react-icons/fi';

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: FiGrid },
    { id: 'employees', label: 'Employees', icon: FiUsers },
    { id: 'stats', label: 'Analytics', icon: FiTrendingUp },
  ];

  return (
    <aside className="w-full md:w-56 flex-shrink-0 px-2 py-4 border-b md:border-b-0 md:border-r border-[var(--border-color)] bg-transparent transition-colors duration-300">
      {/* Navigation Menu */}
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-xs transition-all duration-150 relative ${
                isActive
                  ? 'bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold border-l-2 border-[var(--text-primary)] shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              <Icon className={`text-sm ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* System Telemetry Module */}
      <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
        <h4 className="px-3 text-[9px] font-semibold text-[var(--text-secondary)] tracking-wider uppercase mb-3">System Status</h4>
        <div className="space-y-2.5 px-3">
          {/* Item 1 */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
              <FiActivity className="text-neutral-500" /> Database
            </span>
            <span className="font-mono text-[var(--text-primary)] bg-[var(--bg-input)] px-1.5 py-0.5 rounded text-[9px] border border-[var(--border-color)]">ONLINE</span>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
              <FiShield className="text-neutral-500" /> Connection
            </span>
            <span className="font-mono text-[var(--text-primary)] bg-[var(--bg-input)] px-1.5 py-0.5 rounded text-[9px] border border-[var(--border-color)]">SECURE</span>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[var(--text-secondary)] flex items-center gap-1.5">
              <FiFileText className="text-neutral-500" /> S3 Storage
            </span>
            <span className="font-mono text-[var(--text-primary)] bg-[var(--bg-input)] px-1.5 py-0.5 rounded text-[9px] border border-[var(--border-color)]">ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Footer Version Details */}
      <div className="mt-12 px-3 text-left">
        <p className="text-[9px] text-neutral-500 font-mono">Build v2.1.0</p>
        <p className="text-[8px] text-neutral-600 font-mono">Platform Infrastructure</p>
      </div>
    </aside>
  );
};
export default Sidebar;
