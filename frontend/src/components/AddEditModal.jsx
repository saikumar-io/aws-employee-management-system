import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCamera, FiUploadCloud } from 'react-icons/fi';

export const AddEditModal = ({ isOpen, onClose, employee, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    department_id: '1',
    role: '',
    salary: '',
    status: 'active',
    joined_date: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (employee) {
      setFormData({
        first_name: employee.first_name || '',
        last_name: employee.last_name || '',
        email: employee.email || '',
        phone: employee.phone || '',
        department_id: employee.department_id || '1',
        role: employee.role || '',
        salary: employee.salary || '',
        status: employee.status || 'active',
        joined_date: employee.joined_date ? employee.joined_date.split('T')[0] : '',
      });
      setAvatarPreview(employee.avatar_url || null);
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        department_id: '1',
        role: '',
        salary: '',
        status: 'active',
        joined_date: new Date().toISOString().split('T')[0],
      });
      setAvatarPreview(null);
    }
    setAvatarFile(null);
  }, [employee, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (avatarFile) {
      data.append('avatar', avatarFile);
    }
    onSave(data);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="glass-card rounded-xl w-full max-w-xl max-h-[90vh] overflow-y-auto z-10 relative flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-color)]">
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                {employee ? 'Edit Employee Details' : 'Add New Employee'}
              </h2>
              <button
                onClick={onClose}
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                <FiX className="text-sm" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-5 flex-grow text-xs">
              {/* Image upload preview */}
              <div className="flex flex-col items-center justify-center gap-2 mb-2">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-center overflow-hidden hover:border-neutral-500/40 transition-colors">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                    ) : (
                      <FiUploadCloud className="text-lg text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors" />
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 p-1 rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)]">
                    <FiCamera className="text-[10px]" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <span className="text-[9px] text-[var(--text-secondary)] font-mono">JPG, PNG OR WEBP — UP TO 5MB</span>
              </div>

              {/* Input grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First name */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                    placeholder="John"
                  />
                </div>

                {/* Last name */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                    placeholder="Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                    placeholder="john.doe@company.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Division */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Division</label>
                  <select
                    name="department_id"
                    value={formData.department_id}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs appearance-none"
                  >
                    <option value="1">Engineering</option>
                    <option value="2">Product Design</option>
                    <option value="3">Operations & Sec</option>
                    <option value="4">Quantum Research</option>
                    <option value="5">Human Resources</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Operational Role</label>
                  <input
                    type="text"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                    placeholder="e.g. Frontend Engineer"
                  />
                </div>

                {/* Compensation */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Salary (USD)</label>
                  <input
                    type="number"
                    name="salary"
                    required
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                    placeholder="e.g. 95000"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-1 uppercase tracking-wider">Start Date</label>
                  <input
                    type="date"
                    name="joined_date"
                    required
                    value={formData.joined_date}
                    onChange={handleChange}
                    className="w-full glass-input py-1.5 px-3 text-xs"
                  />
                </div>

                {/* Status selector */}
                <div className="sm:col-span-2 mt-2">
                  <label className="block text-[10px] font-semibold text-[var(--text-secondary)] mb-2 uppercase tracking-wider">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 cursor-pointer text-[var(--text-primary)] select-none">
                      <input
                        type="radio"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleChange}
                        className="accent-white"
                      />
                      <span>Active</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[var(--text-primary)] select-none">
                      <input
                        type="radio"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleChange}
                        className="accent-white"
                      />
                      <span>Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions footer */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border-color)]">
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="glass-button-secondary py-1.5 px-3.5"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="glass-button-primary py-1.5 px-4 font-semibold"
                >
                  {employee ? 'Save Changes' : 'Add Employee'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default AddEditModal;
