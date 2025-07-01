'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Info } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function PrivacySecurityPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    shareData: true,
    analytics: true,
    crashReports: true,
    locationServices: false,
    biometricAuth: true,
    autoLock: '5min',
  });

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
      showToast('success', 'Setting updated');
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
          Privacy & Security
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Data Sharing */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Data Sharing
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Share with Healthcare Provider
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Allow your clinic to access your health data
                </p>
              </div>
              <button
                onClick={() => handleToggle('shareData')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.shareData ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.shareData ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Analytics
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Help improve the app by sharing usage data
                </p>
              </div>
              <button
                onClick={() => handleToggle('analytics')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.analytics ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.analytics ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Crash Reports
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Automatically send crash reports
                </p>
              </div>
              <button
                onClick={() => handleToggle('crashReports')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.crashReports ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.crashReports ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Security
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Biometric Authentication
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Use Face ID or Touch ID to unlock the app
                </p>
              </div>
              <button
                onClick={() => handleToggle('biometricAuth')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.biometricAuth ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.biometricAuth ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium mb-2">
                Auto-Lock
              </p>
              <select
                value={settings.autoLock}
                onChange={(e) => setSettings({ ...settings, autoLock: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--scla-primary-blue))] focus:border-transparent"
              >
                <option value="immediate">Immediately</option>
                <option value="1min">After 1 minute</option>
                <option value="5min">After 5 minutes</option>
                <option value="15min">After 15 minutes</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex gap-3">
            <Info size={20} className="text-[rgb(var(--scla-primary-blue))] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[rgb(var(--scla-dark-navy))] text-sm">
                Your health data is encrypted and stored securely. We comply with HIPAA 
                and other healthcare privacy regulations. 
                <Link href="/privacy-policy" className="text-[rgb(var(--scla-primary-blue))] font-medium ml-1">
                  Learn more
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Location Services */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Location Services
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                Allow Location Access
              </p>
              <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                Used to find nearby clinics and emergency services
              </p>
            </div>
            <button
              onClick={() => handleToggle('locationServices')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.locationServices ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.locationServices ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}