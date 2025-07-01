'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Wifi, WifiOff, Info } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function DataUploadSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    autoUpload: true,
    wifiOnly: true,
    uploadFrequency: 'realtime',
    backgroundUpload: true,
    cellularUpload: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
      showToast('success', 'Upload setting updated');
    }
  };

  const handleFrequencyChange = (value: string) => {
    setSettings(prev => ({ ...prev, uploadFrequency: value }));
    showToast('success', 'Upload frequency updated');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Data Upload Settings
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Auto Upload */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 pr-4">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium text-lg">
                Automatic Upload
              </p>
              <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                Automatically sync health data to your clinic
              </p>
            </div>
            <button
              onClick={() => handleToggle('autoUpload')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.autoUpload ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.autoUpload ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.autoUpload && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium mb-3">
                Upload Frequency
              </p>
              <div className="space-y-2">
                {[
                  { value: 'realtime', label: 'Real-time', description: 'Upload as data is collected' },
                  { value: 'hourly', label: 'Every hour', description: 'Batch upload hourly' },
                  { value: 'daily', label: 'Once daily', description: 'Upload at 2:00 AM' },
                  { value: 'manual', label: 'Manual only', description: 'Upload when requested' },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="uploadFrequency"
                      value={option.value}
                      checked={settings.uploadFrequency === option.value}
                      onChange={(e) => handleFrequencyChange(e.target.value)}
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
          )}
        </div>

        {/* Connection Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Connection Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wifi size={20} className="text-[rgb(var(--scla-primary-blue))]" />
                <div className="flex-1">
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Wi-Fi Only
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                    Only upload when connected to Wi-Fi
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('wifiOnly')}
                disabled={!settings.autoUpload}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.wifiOnly && settings.autoUpload ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.wifiOnly && settings.autoUpload ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <WifiOff size={20} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Cellular Upload
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                    Allow uploads over cellular data
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleToggle('cellularUpload')}
                disabled={!settings.autoUpload || settings.wifiOnly}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.cellularUpload && settings.autoUpload && !settings.wifiOnly ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.cellularUpload && settings.autoUpload && !settings.wifiOnly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Background Upload
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Continue uploads when app is in background
                </p>
              </div>
              <button
                onClick={() => handleToggle('backgroundUpload')}
                disabled={!settings.autoUpload}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.backgroundUpload && settings.autoUpload ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.backgroundUpload && settings.autoUpload ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Upload Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Upload Status
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Last Upload</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">2 minutes ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Pending Data</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">0 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Total Uploaded</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">124.5 MB</span>
            </div>
          </div>

          <button className="w-full mt-4 text-[rgb(var(--scla-primary-blue))] font-medium py-2">
            Upload Now
          </button>
        </div>

        {/* Data Usage Warning */}
        {settings.cellularUpload && !settings.wifiOnly && (
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex gap-3">
              <Info size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-orange-900 text-sm font-medium mb-1">
                  Cellular Data Usage
                </p>
                <p className="text-orange-700 text-sm">
                  Uploading over cellular may consume significant data. Monitor your data plan 
                  to avoid overage charges.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}