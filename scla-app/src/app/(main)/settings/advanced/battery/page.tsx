'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Battery, BatteryLow, Info } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function BatteryOptimizationPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    optimizationEnabled: true,
    lowPowerMode: false,
    reducedSampling: false,
    backgroundRestriction: true,
    autoSleep: true,
    sleepDelay: '30min',
  });

  const handleToggle = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings(prev => ({ ...prev, [key]: !prev[key] }));
      showToast('success', 'Battery setting updated');
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
          Battery Optimization
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Current Battery Status */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg">
              Device Battery Status
            </h3>
            <Battery size={24} className="text-green-600" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Current Level</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Estimated Time Remaining</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">18 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(var(--scla-text-gray))]">Last Charged</span>
              <span className="text-[rgb(var(--scla-dark-navy))] font-medium">6 hours ago</span>
            </div>
          </div>

          {/* Battery Level Bar */}
          <div className="mt-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>

        {/* Optimization Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 pr-4">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium text-lg">
                Battery Optimization
              </p>
              <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                Extend battery life by optimizing app performance
              </p>
            </div>
            <button
              onClick={() => handleToggle('optimizationEnabled')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.optimizationEnabled ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.optimizationEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {settings.optimizationEnabled && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BatteryLow size={20} className="text-orange-500" />
                  <div className="flex-1">
                    <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                      Low Power Mode
                    </p>
                    <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                      Reduce ECG sampling rate when battery is low
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle('lowPowerMode')}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    settings.lowPowerMode ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      settings.lowPowerMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Reduced Sampling
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                    Lower ECG sampling frequency to save power
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('reducedSampling')}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    settings.reducedSampling ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      settings.reducedSampling ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                    Background Restriction
                  </p>
                  <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                    Limit background activity to save battery
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('backgroundRestriction')}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    settings.backgroundRestriction ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      settings.backgroundRestriction ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Auto Sleep Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Auto Sleep
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Enable Auto Sleep
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Device sleeps when not worn
                </p>
              </div>
              <button
                onClick={() => handleToggle('autoSleep')}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.autoSleep ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.autoSleep ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.autoSleep && (
              <div>
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium mb-2">
                  Sleep After
                </p>
                <select
                  value={settings.sleepDelay}
                  onChange={(e) => setSettings({ ...settings, sleepDelay: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--scla-primary-blue))] focus:border-transparent"
                >
                  <option value="15min">15 minutes</option>
                  <option value="30min">30 minutes</option>
                  <option value="1hour">1 hour</option>
                  <option value="2hours">2 hours</option>
                  <option value="never">Never</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Battery Tips */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex gap-3">
            <Info size={20} className="text-[rgb(var(--scla-primary-blue))] mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium text-sm mb-2">
                Battery Saving Tips
              </p>
              <ul className="text-[rgb(var(--scla-dark-navy))] text-sm space-y-1">
                <li>• Charge your device daily for optimal performance</li>
                <li>• Ensure good skin contact to prevent signal loss</li>
                <li>• Disconnect when not wearing the device</li>
                <li>• Enable battery optimization features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}