'use client';

import React, { useState } from 'react';
import { Plus, ChevronRight, Activity, Heart, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LogPage() {
  const [activeTab, setActiveTab] = useState<'symptoms' | 'blood-pressure'>('symptoms');

  // Mock recent entries
  const recentSymptoms = [
    {
      id: '1',
      name: 'Chest Pain',
      intensity: 7,
      time: '2 hours ago',
      triggers: ['Physical Activity'],
    },
    {
      id: '2',
      name: 'Shortness of Breath',
      intensity: 5,
      time: '5 hours ago',
      triggers: ['Stress'],
    },
    {
      id: '3',
      name: 'Fatigue',
      intensity: 6,
      time: 'Yesterday',
      triggers: ['Poor Sleep'],
    },
  ];

  const recentBP = [
    {
      id: '1',
      systolic: 120,
      diastolic: 80,
      heartRate: 72,
      time: 'This morning',
      arm: 'left',
    },
    {
      id: '2',
      systolic: 118,
      diastolic: 78,
      heartRate: 68,
      time: 'Yesterday evening',
      arm: 'right',
    },
  ];

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-4 pt-4 pb-2">
          <h1 className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))]">
            Health Log
          </h1>
        </div>

        {/* Tab Selector */}
        <div className="bg-white px-4 pb-4">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setActiveTab('symptoms')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'symptoms'
                  ? 'bg-white text-[rgb(var(--scla-primary-blue))] shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Symptoms
            </button>
            <button
              onClick={() => setActiveTab('blood-pressure')}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                activeTab === 'blood-pressure'
                  ? 'bg-white text-[rgb(var(--scla-primary-blue))] shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Blood Pressure
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === 'symptoms' ? (
            <>
              {/* Add Symptom Button */}
              <Link href="/symptom/select" className="block mb-6">
                <button className="w-full bg-[rgb(var(--scla-primary-blue))] text-white rounded-lg p-4 flex items-center justify-between group hover:bg-[rgb(var(--scla-dark-navy))] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Plus size={24} />
                    </div>
                    <span className="font-medium">Log New Symptom</span>
                  </div>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Recent Symptoms */}
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-gray-500 uppercase">
                  Recent Symptoms
                </h2>
                {recentSymptoms.map((symptom) => (
                  <div key={symptom.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-[rgb(var(--scla-dark-navy))]">
                          {symptom.name}
                        </h3>
                        <p className="text-sm text-gray-500">{symptom.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-[rgb(var(--scla-primary-blue))]">
                          {symptom.intensity}/10
                        </div>
                        <div className={`w-2 h-8 rounded-full ${
                          symptom.intensity >= 7 ? 'bg-red-500' : 
                          symptom.intensity >= 4 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`} />
                      </div>
                    </div>
                    {symptom.triggers.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {symptom.triggers.map((trigger, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                          >
                            {trigger}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Add BP Button */}
              <Link href="/bp/entry" className="block mb-6">
                <button className="w-full bg-[rgb(var(--scla-primary-blue))] text-white rounded-lg p-4 flex items-center justify-between group hover:bg-[rgb(var(--scla-dark-navy))] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart size={24} />
                    </div>
                    <span className="font-medium">Log Blood Pressure</span>
                  </div>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              {/* Recent BP Readings */}
              <div className="space-y-3">
                <h2 className="text-sm font-medium text-gray-500 uppercase">
                  Recent Readings
                </h2>
                {recentBP.map((reading) => (
                  <div key={reading.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-baseline gap-1 mb-1">
                          <span className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))]">
                            {reading.systolic}
                          </span>
                          <span className="text-lg text-gray-500">/</span>
                          <span className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))]">
                            {reading.diastolic}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">mmHg</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Heart size={14} />
                            {reading.heartRate} bpm
                          </span>
                          <span className="capitalize">
                            {reading.arm} arm
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{reading.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}