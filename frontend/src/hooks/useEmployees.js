import { useState, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.department) params.append('department', filters.department);
      if (filters.status) params.append('status', filters.status);

      const response = await api.get(`/employees?${params.toString()}`);
      setEmployees(response.data);
    } catch (err) {
      console.error('Fetch employees failed:', err);
      setError('Failed to fetch workforce database.');
      toast.error('Failed to load employee list');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/employees/stats');
      setStats(response.data);
    } catch (err) {
      console.error('Fetch stats failed:', err);
      toast.error('Failed to update analytical statistics');
    }
  }, []);

  const addEmployee = async (formData) => {
    setLoading(true);
    try {
      // Must use multipart/form-data for image upload support
      const response = await api.post('/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Employee onboarded successfully!');
      // Refresh local lists
      fetchEmployees();
      fetchStats();
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Add employee failed:', err);
      const msg = err.response?.data?.error || 'Failed to onboard employee.';
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const updateEmployee = async (id, formData) => {
    setLoading(true);
    try {
      const response = await api.put(`/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Employee files updated.');
      fetchEmployees();
      fetchStats();
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Update employee failed:', err);
      const msg = err.response?.data?.error || 'Failed to update employee files.';
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/employees/${id}`);
      toast.success('Employee successfully decommissioned.');
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      fetchStats();
      return { success: true };
    } catch (err) {
      console.error('Delete employee failed:', err);
      toast.error('Failed to delete employee profile');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    stats,
    loading,
    error,
    fetchEmployees,
    fetchStats,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  };
};
