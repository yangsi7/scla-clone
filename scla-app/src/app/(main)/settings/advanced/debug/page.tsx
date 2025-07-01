'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Download, Trash2, FileText, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error';
  message: string;
  details?: string;
}

export default function DebugLogsPage() {
  const { showToast } = useToast();
  const [enableLogging, setEnableLogging] = useState(true);
  const [logLevel, setLogLevel] = useState('info');
  
  // Mock log entries
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: new Date(Date.now() - 5000),
      level: 'info',
      message: 'App launched successfully',
      details: 'Version 2.1.0, Build 1234',
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 10000),
      level: 'info',
      message: 'Device connected',
      details: 'SKN-A1B2C3D4, Battery: 78%',
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 15000),
      level: 'warning',
      message: 'Weak signal detected',
      details: 'Signal strength: -85 dBm',
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 30000),
      level: 'info',
      message: 'ECG recording started',
      details: 'Sampling rate: 250Hz',
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 60000),
      level: 'error',
      message: 'Data sync failed',
      details: 'Network timeout after 30s',
    },
  ]);

  const handleExportLogs = () => {
    showToast('success', 'Debug logs exported successfully');
  };

  const handleClearLogs = () => {
    showToast('success', 'Debug logs cleared');
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warning':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Debug Logs
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Logging Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 pr-4">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium text-lg">
                Enable Debug Logging
              </p>
              <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                Record app events for troubleshooting
              </p>
            </div>
            <button
              onClick={() => setEnableLogging(!enableLogging)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                enableLogging ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  enableLogging ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {enableLogging && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium mb-2">
                Log Level
              </p>
              <select
                value={logLevel}
                onChange={(e) => setLogLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--scla-primary-blue))] focus:border-transparent"
              >
                <option value="info">Info & Above</option>
                <option value="warning">Warning & Above</option>
                <option value="error">Error Only</option>
                <option value="debug">Debug (Verbose)</option>
              </select>
            </div>
          )}
        </div>

        {/* Log Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleExportLogs}
            className="flex-1 bg-[rgb(var(--scla-primary-blue))] text-white rounded-full py-3 px-4 font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Export Logs
          </button>
          <button
            onClick={handleClearLogs}
            className="flex-1 bg-red-600 text-white rounded-full py-3 px-4 font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={20} />
            Clear Logs
          </button>
        </div>

        {/* Log Entries */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg">
              Recent Logs
            </h3>
            <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
              Showing last 50 entries
            </p>
          </div>

          <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getLogColor(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                      {log.message}
                    </p>
                    {log.details && (
                      <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                        {log.details}
                      </p>
                    )}
                    <p className="text-gray-400 text-xs mt-1">
                      {formatTimestamp(log.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Note */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-orange-900 text-sm font-medium mb-1">
                Privacy Notice
              </p>
              <p className="text-orange-700 text-sm">
                Debug logs may contain sensitive information. Only share logs with 
                authorized support personnel. Logs are automatically deleted after 7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Log Storage Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-sm uppercase tracking-wide mb-3">
            LOG STORAGE
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Current Size</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">2.4 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Max Size</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">10 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Retention</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}