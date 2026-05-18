import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export const DeleteModal = ({ isOpen, onClose, employee, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && employee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="glass-card rounded-xl max-w-sm w-full p-6 relative z-10 text-left shadow-2xl"
          >
            {/* Title */}
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
              <FiAlertTriangle className="text-red-500 text-base" />
              <span>Confirm Deletion</span>
            </h3>
            
            {/* Warning Message */}
            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Are you sure you want to remove the employee record for{' '}
              <strong className="text-[var(--text-primary)] font-medium">
                {employee.first_name} {employee.last_name}
              </strong>
              ? This action is permanent and cannot be undone.
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={onClose}
                className="glass-button-secondary py-1.5 px-3"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-500 text-white rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all duration-150 active:scale-[0.98]"
              >
                Delete Record
              </button>
            </div>

            {/* Close cross */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FiX className="text-sm" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default DeleteModal;
