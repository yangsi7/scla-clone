'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bluetooth, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { mockAPI } from '@/mock/api';
import type { Device } from '@/types';

export default function DeviceConnectPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);

  const startScanning = async () => {
    setScanning(true);
    try {
      const foundDevices = await mockAPI.discoverDevices();
      setDevices(foundDevices);
    } catch (error) {
      console.error('Failed to scan devices:', error);
    } finally {
      setScanning(false);
    }
  };

  const connectDevice = async (deviceId: string) => {
    setConnecting(deviceId);
    try {
      await mockAPI.pairDevice(deviceId);
      setConnected(true);
      
      // Redirect after showing success modal
      setTimeout(() => {
        router.push('/device');
      }, 2500);
    } catch (error) {
      console.error('Failed to connect device:', error);
      setConnecting(null);
    }
  };

  useEffect(() => {
    startScanning();
  }, []);

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-4 py-4 flex items-center gap-4 border-b">
          <Link href="/dashboard">
            <ArrowLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
          </Link>
          <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
            Connect Device
          </h1>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Instructions */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="font-medium text-[rgb(var(--scla-primary-blue))] mb-2">
              How to connect:
            </h2>
            <ol className="space-y-1 text-sm text-[rgb(var(--scla-text-gray))]">
              <li>1. Make sure your SKIIN garment is powered on</li>
              <li>2. Enable Bluetooth on your phone</li>
              <li>3. Select your device from the list below</li>
            </ol>
          </div>

          {/* Scanning Status */}
          {scanning && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-[rgb(var(--scla-primary-blue))] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[rgb(var(--scla-text-gray))]">Scanning for devices...</p>
              </div>
            </div>
          )}

          {/* Device List */}
          {!scanning && devices.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-500 uppercase">
                Available Devices
              </h3>
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => connectDevice(device.id)}
                  disabled={connecting !== null}
                  className="w-full bg-white rounded-lg p-4 shadow-sm flex items-center justify-between group hover:shadow-md transition-all disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bluetooth size={20} className="text-[rgb(var(--scla-primary-blue))]" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-medium text-[rgb(var(--scla-dark-navy))]">
                        SKIIN Pod {device.serialNumber.slice(-4)}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Battery: {device.batteryLevel}%
                      </p>
                    </div>
                  </div>
                  {connecting === device.id ? (
                    <div className="w-5 h-5 border-2 border-[rgb(var(--scla-primary-blue))] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <div className="text-sm text-[rgb(var(--scla-primary-blue))] font-medium">
                      Connect
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Success Message */}
          {connected && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
                  Device Connected!
                </h2>
                <p className="text-[rgb(var(--scla-text-gray))]">
                  Your SKIIN device is now connected and ready to use.
                </p>
              </div>
            </div>
          )}

          {/* Retry Button */}
          {!scanning && devices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[rgb(var(--scla-text-gray))] mb-4">
                No devices found. Make sure your device is powered on and nearby.
              </p>
              <button
                onClick={startScanning}
                className="scla-button-primary"
              >
                Scan Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}