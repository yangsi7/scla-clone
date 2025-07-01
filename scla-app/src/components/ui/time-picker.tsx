'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  isPM: boolean;
  onPMChange: (isPM: boolean) => void;
}

export function TimePicker({ value, onChange, isPM, onPMChange }: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempHour, setTempHour] = useState(value.getHours() % 12 || 12);
  const [tempMinute, setTempMinute] = useState(value.getMinutes());
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleConfirm = () => {
    const hour24 = isPM ? (tempHour === 12 ? 12 : tempHour + 12) : (tempHour === 12 ? 0 : tempHour);
    const newDate = new Date(value);
    newDate.setHours(hour24, tempMinute);
    onChange(newDate);
    setIsOpen(false);
  };

  const formatTime = () => {
    const hours = value.getHours();
    const minutes = value.getMinutes();
    const displayHour = hours % 12 || 12;
    const displayMinute = minutes.toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${displayHour}:${displayMinute} ${period}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 p-4 bg-gray-50 rounded-lg flex items-center gap-3 w-full"
      >
        <Clock size={20} />
        <span className="flex-1 text-left">{formatTime()}</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Time Picker Modal */}
          <div
            ref={modalRef}
            className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg z-50 p-4"
          >
            <div className="flex gap-4 mb-4">
              {/* Hour Picker */}
              <div className="flex-1">
                <label className="text-sm text-gray-600 mb-2 block">Hour</label>
                <div className="h-40 overflow-y-auto border rounded-lg">
                  {[...Array(12)].map((_, i) => {
                    const hour = i + 1;
                    return (
                      <button
                        key={hour}
                        onClick={() => setTempHour(hour)}
                        className={`w-full py-2 px-3 text-left hover:bg-gray-50 ${
                          tempHour === hour ? 'bg-[rgb(var(--scla-primary-blue))] text-white' : ''
                        }`}
                      >
                        {hour}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minute Picker */}
              <div className="flex-1">
                <label className="text-sm text-gray-600 mb-2 block">Minute</label>
                <div className="h-40 overflow-y-auto border rounded-lg">
                  {[...Array(60)].map((_, i) => {
                    if (i % 5 !== 0) return null; // Show only 5-minute intervals
                    return (
                      <button
                        key={i}
                        onClick={() => setTempMinute(i)}
                        className={`w-full py-2 px-3 text-left hover:bg-gray-50 ${
                          tempMinute === i ? 'bg-[rgb(var(--scla-primary-blue))] text-white' : ''
                        }`}
                      >
                        {i.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* AM/PM Toggle */}
            <div className="flex rounded-lg overflow-hidden border border-gray-300 mb-4">
              <button
                onClick={() => onPMChange(false)}
                className={`flex-1 px-4 py-2 ${!isPM ? 'bg-[rgb(var(--scla-primary-blue))] text-white' : 'bg-white'}`}
              >
                AM
              </button>
              <button
                onClick={() => onPMChange(true)}
                className={`flex-1 px-4 py-2 ${isPM ? 'bg-[rgb(var(--scla-primary-blue))] text-white' : 'bg-white'}`}
              >
                PM
              </button>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full py-2 bg-[rgb(var(--scla-primary-blue))] text-white rounded-lg font-medium"
            >
              Set Time
            </button>
          </div>
        </>
      )}
    </div>
  );
}