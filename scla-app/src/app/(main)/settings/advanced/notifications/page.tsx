'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Info } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

export default function NotificationsSettingsPage() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState({
    pushNotifications: true,
    deviceAlerts: true,
    symptomReminders: true,
    medicationReminders: false,
    appointmentReminders: true,
    lowBattery: true,
    signalLoss: true,
    dailySummary: false,
    emergencyAlerts: true,
    soundEnabled: true,
    vibrationEnabled: true,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showToast('success', 'Notification setting updated');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center shadow-sm">
        <Link href="/settings/advanced" className="p-2 -ml-2">
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </Link>
        <h1 className="flex-1 text-center text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mr-8">
          Notifications
        </h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Master Toggle */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 pr-4">
              <p className="text-[rgb(var(--scla-dark-navy))] font-medium text-lg">
                Push Notifications
              </p>
              <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                Receive notifications from SCLA
              </p>
            </div>
            <button
              onClick={() => handleToggle('pushNotifications')}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Device Alerts */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Device Alerts
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Connection Status
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Alert when device connects or disconnects
                </p>
              </div>
              <button
                onClick={() => handleToggle('deviceAlerts')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.deviceAlerts && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.deviceAlerts && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Low Battery
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Alert when battery is below 20%
                </p>
              </div>
              <button
                onClick={() => handleToggle('lowBattery')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.lowBattery && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.lowBattery && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Signal Loss
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Alert when ECG signal is lost
                </p>
              </div>
              <button
                onClick={() => handleToggle('signalLoss')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.signalLoss && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.signalLoss && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Health Reminders */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Health Reminders
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Symptom Check-ins
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Daily reminder to log symptoms
                </p>
              </div>
              <button
                onClick={() => handleToggle('symptomReminders')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.symptomReminders && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.symptomReminders && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Medication
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Reminders to take medications
                </p>
              </div>
              <button
                onClick={() => handleToggle('medicationReminders')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.medicationReminders && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.medicationReminders && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Appointments
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Upcoming appointment reminders
                </p>
              </div>
              <button
                onClick={() => handleToggle('appointmentReminders')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.appointmentReminders && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.appointmentReminders && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Alert Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-[rgb(var(--scla-dark-navy))] font-bold text-lg mb-4">
            Alert Settings
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Sound
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Play sound for notifications
                </p>
              </div>
              <button
                onClick={() => handleToggle('soundEnabled')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.soundEnabled && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.soundEnabled && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 pr-4">
                <p className="text-[rgb(var(--scla-dark-navy))] font-medium">
                  Vibration
                </p>
                <p className="text-[rgb(var(--scla-text-gray))] text-sm mt-1">
                  Vibrate for notifications
                </p>
              </div>
              <button
                onClick={() => handleToggle('vibrationEnabled')}
                disabled={!settings.pushNotifications}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  settings.vibrationEnabled && settings.pushNotifications ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                    settings.vibrationEnabled && settings.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex gap-3">
            <Info size={20} className="text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-900 text-sm font-medium mb-1">
                Emergency Alerts
              </p>
              <p className="text-red-700 text-sm">
                Critical health alerts cannot be disabled for your safety. These include 
                abnormal heart rhythms and other serious conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}