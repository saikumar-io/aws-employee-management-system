import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiCalendar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const EmployeeTable = ({ employees, loading, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center gap-3">
        <div className="w-6 h-6 border-2 border-[var(--border-color)] border-t-[var(--text-primary)] rounded-full animate-spin" />
        <span className="text-[var(--text-secondary)] font-mono text-[9px] tracking-wider uppercase">Querying Workspace Records...</span>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="glass-card rounded-xl p-12 text-center">
        <p className="text-[var(--text-primary)] text-sm font-medium">No results found.</p>
        <p className="text-[var(--text-secondary)] text-xs mt-1">Try broadening your search query or department selections.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[var(--bg-input)] border-b border-[var(--border-color)] text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              <th className="px-5 py-3.5">Employee</th>
              <th className="px-5 py-3.5">Division & Role</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Salary</th>
              <th className="px-5 py-3.5">Joined</th>
              {isAdmin && <th className="px-5 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)] text-xs text-[var(--text-secondary)]">
            {employees.map((emp, index) => {
              return (
                <motion.tr
                  key={emp.id}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15, delay: index * 0.02 }}
                  className="hover:bg-[var(--bg-input)] transition-colors duration-100"
                >
                  {/* Name and avatar card */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {emp.avatar_url ? (
                        <img
                          src={emp.avatar_url}
                          alt={`${emp.first_name} avatar`}
                          className="w-8 h-8 rounded-full object-cover border border-[var(--border-color)]"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] flex items-center justify-center font-bold text-[10px] uppercase">
                          {emp.first_name[0]}{emp.last_name[0]}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-[var(--text-primary)] text-[13px]">
                          {emp.first_name} {emp.last_name}
                        </div>
                        <div className="text-[11px] text-[var(--text-secondary)] flex items-center gap-1 mt-0.5">
                          {emp.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Department & Role */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <div className="font-medium text-[var(--text-primary)]">{emp.role || 'Contractor'}</div>
                    <span className="inline-block mt-1 text-[9px] font-mono text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-color)] rounded px-1.5 py-0.5">
                      {emp.department_name || 'Unassigned'}
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] border bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-primary)]`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${emp.status === 'active' ? 'bg-green-500' : 'bg-neutral-500'}`} />
                      <span className="capitalize">{emp.status}</span>
                    </span>
                  </td>

                  {/* Compensation */}
                  <td className="px-5 py-3.5 whitespace-nowrap font-mono text-[var(--text-primary)] font-medium">
                    ${parseFloat(emp.salary || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>

                  {/* Joined Date */}
                  <td className="px-5 py-3.5 whitespace-nowrap text-[var(--text-secondary)]">
                    <span className="flex items-center gap-1 text-[11px] font-mono text-[var(--text-secondary)]">
                      <FiCalendar />
                      {emp.joined_date ? new Date(emp.joined_date).toLocaleDateString() : 'N/A'}
                    </span>
                  </td>

                  {/* Quick Action buttons */}
                  {isAdmin && (
                    <td className="px-5 py-3.5 whitespace-nowrap text-right text-[var(--text-secondary)] font-medium">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEdit(emp)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] hover:border-neutral-500/40 transition-all"
                          title="Edit employee"
                        >
                          <FiEdit2 className="text-xs" />
                        </button>
                        <button
                          onClick={() => onDelete(emp)}
                          className="p-1.5 rounded-lg hover:bg-[var(--bg-card)] text-[var(--text-secondary)] hover:text-red-500 border border-[var(--border-color)] hover:border-red-500/20 transition-all"
                          title="Delete employee"
                        >
                          <FiTrash2 className="text-xs" />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default EmployeeTable;
