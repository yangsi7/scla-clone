'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddModal({ isOpen, onClose }: AddModalProps) {
  const router = useRouter();

  const handleSymptom = () => {
    router.push('/symptom/entry');
    onClose();
  };

  const handleBloodPressure = () => {
    router.push('/blood-pressure/entry');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 pb-8"
          >
            <div className="p-6">
              {/* Handle bar */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

              <h2 className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))] text-center mb-8">
                What would you like to add?
              </h2>

              {/* Options */}
              <div className="space-y-4">
                <button
                  onClick={handleSymptom}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-8h2v6h-2V9z" fill="#FF6B00"/>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-[rgb(var(--scla-dark-navy))]">Symptom</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={handleBloodPressure}
                  className="w-full bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-2.21 0-4-1.79-4-4 0-1.1.45-2.1 1.17-2.83l1.24-1.24c.37-.37.97-.37 1.34 0l1.24 1.24A3.97 3.97 0 0116 14c0 2.21-1.79 4-4 4z" fill="#DC3545"/>
                      </svg>
                    </div>
                    <span className="text-lg font-medium text-[rgb(var(--scla-dark-navy))]">Blood Pressure</span>
                  </div>
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}