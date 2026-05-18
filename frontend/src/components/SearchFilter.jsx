import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export const SearchFilter = ({ filters, setFilters, onAddClick }) => {
  const { user } = useAuth();
  
  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleDeptChange = (e) => {
    setFilters((prev) => ({ ...prev, department: e.target.value }));
  };

  const handleStatusChange = (e) => {
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="glass-card rounded-xl p-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left side: Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-grow max-w-4xl">
        {/* Search bar */}
        <div className="relative flex-grow sm:max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm" />
          <input
            type="text"
            placeholder="Search name, email, or role..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-9 glass-input py-1.5 text-xs"
          />
        </div>

        {/* Department select */}
        <div className="relative">
          <select
            value={filters.department}
            onChange={handleDeptChange}
            className="w-full sm:w-44 glass-input px-3 py-1.5 text-xs appearance-none"
          >
            <option value="">All Divisions</option>
            <option value="1">Engineering</option>
            <option value="2">Product Design</option>
            <option value="3">Operations & Sec</option>
            <option value="4">Quantum Research</option>
            <option value="5">Human Resources</option>
          </select>
        </div>

        {/* Status select */}
        <div className="relative">
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="w-full sm:w-36 glass-input px-3 py-1.5 text-xs appearance-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Right side: Action Button (Visible only to Admin) */}
      {isAdmin && (
        <button
          onClick={onAddClick}
          className="glass-button-primary px-4 py-1.5 font-semibold text-xs flex items-center justify-center gap-1.5 self-start md:self-auto w-full md:w-auto"
        >
          <FiPlus className="text-sm" />
          <span>Add Employee</span>
        </button>
      )}
    </div>
  );
};
export default SearchFilter;
