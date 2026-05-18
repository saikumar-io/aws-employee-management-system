import React, { useState, useEffect } from 'react';
import { useEmployees } from '../hooks/useEmployees';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { StatCard } from '../components/StatCard';
import { SearchFilter } from '../components/SearchFilter';
import { EmployeeTable } from '../components/EmployeeTable';
import { AddEditModal } from '../components/AddEditModal';
import { DeleteModal } from '../components/DeleteModal';
import { Charts } from '../components/Charts';
import { FloatingBg } from '../components/FloatingBg';
import { FiUsers, FiUserCheck, FiDollarSign, FiClock } from 'react-icons/fi';
import { Toaster } from 'react-hot-toast';

export const Dashboard = () => {
  const { user, theme } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({ search: '', department: '', status: '' });
  
  // Modals state
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const {
    employees,
    stats,
    loading,
    fetchEmployees,
    fetchStats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useEmployees();

  // Load stats and employee registers on startup / filter change
  useEffect(() => {
    fetchEmployees(filters);
  }, [filters, fetchEmployees]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Operations CRUD (Only allowed if admin)
  const handleSave = async (formData) => {
    if (user?.role !== 'admin') return;
    let result;
    if (selectedEmp) {
      result = await updateEmployee(selectedEmp.id, formData);
    } else {
      result = await addEmployee(formData);
    }

    if (result.success) {
      setIsAddEditOpen(false);
      setSelectedEmp(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (user?.role !== 'admin') return;
    if (selectedEmp) {
      const result = await deleteEmployee(selectedEmp.id);
      if (result.success) {
        setIsDeleteOpen(false);
        setSelectedEmp(null);
      }
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-main)] text-[var(--text-primary)] transition-colors duration-300">
      <Toaster 
        position="top-right" 
        toastOptions={{ 
          style: { 
            background: theme === 'dark' ? '#0f131a' : '#ffffff', 
            color: theme === 'dark' ? '#ffffff' : '#111827', 
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            borderRadius: '8px'
          } 
        }} 
      />
      <FloatingBg />
      <Navbar />

      {/* Main Container */}
      <div className="flex-grow flex flex-col md:flex-row mx-auto w-full max-w-7xl px-4 sm:px-6 py-6 gap-6 z-10">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Workspace Viewport */}
        <main className="flex-grow overflow-hidden">
          
          {/* Viewer Mode Banner */}
          {!isAdmin && (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3.5 text-xs text-[var(--text-secondary)] mb-6 flex items-center justify-between shadow-sm">
              <span>
                You are currently in <strong className="text-[var(--text-primary)] font-medium">Viewer Mode</strong> (read-only). Switch to <strong className="text-[var(--text-primary)] font-medium">Admin Mode</strong> in the top header to add or remove employee records.
              </span>
            </div>
          )}

          {/* Active Tab 1: Summary Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Workforce"
                  value={stats?.total || '0'}
                  icon={FiUsers}
                  description="Total registered team profiles"
                  delay={0.05}
                />
                <StatCard
                  title="Active Status"
                  value={stats?.active || '0'}
                  icon={FiUserCheck}
                  trend={`${stats?.total ? Math.round((stats.active / stats.total) * 100) : 0}% Active`}
                  description="Staff currently set to active duty"
                  delay={0.1}
                />
                <StatCard
                  title="Average Salary"
                  value={`$${stats?.avg_salary ? parseFloat(stats.avg_salary).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '0'}`}
                  icon={FiDollarSign}
                  description="Mean annual employee salary package"
                  delay={0.15}
                />
                <StatCard
                  title="Recent Starts"
                  value={stats?.new_this_month || '0'}
                  icon={FiClock}
                  description="Hired within this calendar month"
                  delay={0.2}
                />
              </div>

              {/* Statistical Graphs */}
              <Charts stats={stats} />

              {/* Recent Employees Header */}
              <div className="flex items-center justify-between mb-4 mt-8">
                <h2 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">Recent Employees</h2>
                <button
                  onClick={() => setActiveTab('employees')}
                  className="text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  View All Employees
                </button>
              </div>

              <EmployeeTable
                employees={employees.slice(0, 5)}
                loading={loading}
                onEdit={(emp) => {
                  if (!isAdmin) return;
                  setSelectedEmp(emp);
                  setIsAddEditOpen(true);
                }}
                onDelete={(emp) => {
                  if (!isAdmin) return;
                  setSelectedEmp(emp);
                  setIsDeleteOpen(true);
                }}
              />
            </div>
          )}

          {/* Active Tab 2: Workforce Table View */}
          {activeTab === 'employees' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Employees Directory</h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Search, filter, and review records across all operational divisions.</p>
              </div>

              <SearchFilter
                filters={filters}
                setFilters={setFilters}
                onAddClick={() => {
                  if (!isAdmin) return;
                  setSelectedEmp(null);
                  setIsAddEditOpen(true);
                }}
              />

              <EmployeeTable
                employees={employees}
                loading={loading}
                onEdit={(emp) => {
                  if (!isAdmin) return;
                  setSelectedEmp(emp);
                  setIsAddEditOpen(true);
                }}
                onDelete={(emp) => {
                  if (!isAdmin) return;
                  setSelectedEmp(emp);
                  setIsDeleteOpen(true);
                }}
              />
            </div>
          )}

          {/* Active Tab 3: Detailed Analytics View */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">Analytics Overview</h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Operational records broken down by active divisions and statuses.</p>
              </div>
              <Charts stats={stats} />
            </div>
          )}
        </main>
      </div>

      {/* Add / Edit Modal dialog */}
      {isAdmin && (
        <AddEditModal
          isOpen={isAddEditOpen}
          onClose={() => {
            setIsAddEditOpen(false);
            setSelectedEmp(null);
          }}
          employee={selectedEmp}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal confirmation dialog */}
      {isAdmin && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => {
            setIsDeleteOpen(false);
            setSelectedEmp(null);
          }}
          employee={selectedEmp}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};
export default Dashboard;
