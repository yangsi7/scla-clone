'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthYearPickerProps {
  value: Date;
  onChange: (date: Date) => void;
  isOpen: boolean;
  onClose: () => void;
}

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

export function MonthYearPicker({ value, onChange, isOpen, onClose }: MonthYearPickerProps) {
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());

  // Update internal state when value prop changes
  React.useEffect(() => {
    setSelectedYear(value.getFullYear());
    setSelectedMonth(value.getMonth());
  }, [value]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    const newDate = new Date(selectedYear, selectedMonth, 1);
    onChange(newDate);
    onClose();
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
  };

  const changeYear = (increment: number) => {
    setSelectedYear(selectedYear + increment);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-50"
        onClick={onClose}
      />

      {/* Picker Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-6 w-[320px]">
        {/* Year selector */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => changeYear(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          
          <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
            {selectedYear}
          </h2>
          
          <button
            onClick={() => changeYear(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Month grid */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors ${
                selectedMonth === index
                  ? 'bg-[rgb(var(--scla-primary-blue))] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
              type="button"
            >
              {month.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Today button */}
        <button
          onClick={handleToday}
          className="w-full mb-4 py-2 text-[rgb(var(--scla-primary-blue))] font-medium hover:bg-blue-50 rounded-lg transition-colors"
          type="button"
        >
          Today
        </button>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2 bg-[rgb(var(--scla-primary-blue))] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            type="button"
          >
            Select
          </button>
        </div>
      </div>
    </>
  );
}