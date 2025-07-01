'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download, Mail, Calendar, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function DataExportPage() {
  const { showToast } = useToast();
  const [exportRange, setExportRange] = useState('30days');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeOptions, setIncludeOptions] = useState({
    ecgData: true,
    symptoms: true,
    bloodPressure: true,
    deviceMetrics: false,
    notes: true,
  });

  const handleExport = () => {
    showToast('success', 'Preparing your data export...');
    
    // Simulate export preparation
    setTimeout(() => {
      showToast('success', 'Data export ready! Check your email.');
    }, 3000);
  };

  const handleToggle = (key: keyof typeof includeOptions) => {
    setIncludeOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Data Export
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Export Range */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Export Range
          </h3>
          
          <div className="space-y-2">
            {[
              { value: '7days', label: 'Last 7 days' },
              { value: '30days', label: 'Last 30 days' },
              { value: '90days', label: 'Last 90 days' },
              { value: '6months', label: 'Last 6 months' },
              { value: 'all', label: 'All data' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="radio"
                  name="exportRange"
                  value={option.value}
                  checked={exportRange === option.value}
                  onChange={(e) => setExportRange(e.target.value)}
                  className="w-5 h-5 text-[rgb(var(--scla-primary-blue))] focus:ring-[rgb(var(--scla-primary-blue))]"
                />
                <span className="text-[rgb(var(--scla-dark-navy))]">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Data to Include */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Data to Include
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-[rgb(var(--scla-primary-blue))]" />
                <div>
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    ECG Recordings
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                    All ECG data and analysis
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('ecgData')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  includeOptions.ecgData ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    includeOptions.ecgData ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-orange-500" />
                <div>
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Symptoms
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                    Logged symptoms and triggers
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('symptoms')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  includeOptions.symptoms ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    includeOptions.symptoms ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-red-500" />
                <div>
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Blood Pressure
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                    BP readings and trends
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('bloodPressure')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  includeOptions.bloodPressure ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    includeOptions.bloodPressure ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-gray-500" />
                <div>
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Device Metrics
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">
                    Battery, signal quality data
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('deviceMetrics')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  includeOptions.deviceMetrics ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    includeOptions.deviceMetrics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Export Format */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Export Format
          </h3>
          
          <div className="space-y-2">
            {[
              { value: 'pdf', label: 'PDF Report', description: 'Formatted report for healthcare providers' },
              { value: 'csv', label: 'CSV Files', description: 'Raw data for analysis' },
              { value: 'json', label: 'JSON', description: 'Machine-readable format' },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <input
                  type="radio"
                  name="exportFormat"
                  value={option.value}
                  checked={exportFormat === option.value}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-5 h-5 text-[rgb(var(--scla-primary-blue))] focus:ring-[rgb(var(--scla-primary-blue))] mt-0.5"
                />
                <div>
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">{option.label}</p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="w-full bg-[rgb(var(--scla-primary-blue))] text-white rounded-full py-3 px-6 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Download size={20} />
          Export Data
        </button>

        {/* Info Note */}
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-[rgb(var(--scla-dark-navy))] text-sm">
            <strong>Note:</strong> Your exported data will be sent to your registered email address. 
            Large exports may take several minutes to process.
          </p>
        </div>
      </div>
    </div>
  );
}