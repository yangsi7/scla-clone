'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Settings, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { mockAPI } from '@/mock/api';
import { Symptom, BloodPressureReading } from '@/types';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { MonthYearPicker } from '@/components/ui/month-year-picker';
import { useHeader } from '@/contexts/HeaderContext';

type DiaryEntry = {
  id: string;
  time: Date;
  type: 'symptom' | 'blood_pressure';
  data: Symptom | BloodPressureReading;
};

const SYMPTOM_ICONS: Record<string, string> = {
  'Routine ECG': '📊',
  'Fainting': '😵‍💫',
  'Chest Pain / Discomfort': '🫀',
  'Chest Discomfort During Exercise': '🏃‍♂️',
  'Palpitations': '💓',
  'Shortness of Breath': '🫁',
  'Dizziness': '😵',
  'Heart Pounding': '💗',
  'Fatigue (Physical)': '😴',
  'Fatigue (Mental)': '🧠',
  'Insomnia': '🌙',
  'Sweating': '💧',
  'Wheezing Cough': '🤧',
  'Brain Fog': '🌫️'
};

export default function DiaryPage() {
  const router = useRouter();
  const { setConfig } = useHeader();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [bpReadings, setBpReadings] = useState<BloodPressureReading[]>([]);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);
  const [isMonthYearPickerOpen, setIsMonthYearPickerOpen] = useState(false);

  // Configure header
  useEffect(() => {
    setConfig({
      title: 'Diary',
      showMenuButton: true,
      rightActions: (
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/help')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HelpCircle size={20} className="text-gray-500" />
          </button>
          <button
            onClick={() => router.push('/diary/settings')}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings size={20} className="text-gray-500" />
          </button>
        </div>
      ),
    });
  }, [setConfig, router]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [symptomsData, bpData] = await Promise.all([
        mockAPI.getSymptoms(),
        mockAPI.getBloodPressureReadings()
      ]);
      setSymptoms(symptomsData);
      setBpReadings(bpData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get entries for selected date
  const getEntriesForDate = (date: Date): DiaryEntry[] => {
    const dateStr = date.toISOString().split('T')[0];
    const dayEntries: DiaryEntry[] = [];

    // Add symptoms
    symptoms
      .filter(s => s.timestamp.toISOString().split('T')[0] === dateStr)
      .forEach(symptom => {
        dayEntries.push({
          id: symptom.id,
          time: symptom.timestamp,
          type: 'symptom',
          data: symptom
        });
      });

    // Add BP readings
    bpReadings
      .filter(bp => bp.timestamp.toISOString().split('T')[0] === dateStr)
      .forEach(bp => {
        dayEntries.push({
          id: bp.id,
          time: bp.timestamp,
          type: 'blood_pressure',
          data: bp
        });
      });

    return dayEntries.sort((a, b) => a.time.getTime() - b.time.getTime());
  };

  const selectedDateEntries = getEntriesForDate(selectedDate);

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days: (number | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const hasEntry = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    return symptoms.some(s => s.timestamp.toISOString().split('T')[0] === dateStr) ||
           bpReadings.some(bp => bp.timestamp.toISOString().split('T')[0] === dateStr);
  };

  const weekDays = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const hasAnyEntries = symptoms.length > 0 || bpReadings.length > 0;

  return (
    <div className="flex flex-col h-full bg-gray-50">

      {/* Month selector and calendar */}
      <div className="bg-white px-4 pt-4 pb-2">
        <button
          onClick={() => setShowMonthYearPicker(true)}
          className="flex items-center gap-2 mb-4 hover:opacity-70 transition-opacity"
        >
          <h2 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))]">
            {formatMonth(currentMonth)}
          </h2>
          <ChevronDown size={20} className="text-gray-500" />
        </button>

        {/* Week days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm text-gray-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentMonth).map((day, index) => (
            <div key={index} className="relative">
              {day && (
                <button
                  onClick={() => setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                  className={`w-full aspect-square flex flex-col items-center justify-center rounded-lg relative ${
                    isToday(day) && isSelected(day)
                      ? 'text-[rgb(var(--scla-primary-blue))]'
                      : isToday(day)
                      ? 'text-[rgb(var(--scla-primary-blue))]'
                      : isSelected(day)
                      ? 'text-black font-medium'
                      : hasEntry(day)
                      ? 'text-black'
                      : 'text-gray-500'
                  }`}
                >
                  <span className="text-base">{day}</span>
                  {isSelected(day) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--scla-primary-blue))]" />
                  )}
                  {hasEntry(day) && !isSelected(day) && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full" />
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        {!hasAnyEntries ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full px-8 text-center">
            <h2 className="text-2xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-8">
              Welcome to your Diary
            </h2>
            
            <div className="w-64 h-64 mb-8">
              <Image
                src="/images/diary-empty-illustration.svg"
                alt="Diary empty state"
                width={256}
                height={256}
                className="w-full h-full"
              />
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              The Diary page keeps a record of your symptoms and health metrics collected through 
              your Skiin Garment and other Bluetooth devices.
            </p>
          </div>
        ) : selectedDateEntries.length === 0 ? (
          // No entries for selected date
          <div className="flex flex-col items-center justify-center h-full p-8">
            <p className="text-gray-500 mb-4">No entries for this date</p>
            {(symptoms.length === 0 && bpReadings.length === 0) && (
              <div className="p-4 bg-blue-50 rounded-lg max-w-sm text-center">
                <p className="text-sm text-blue-800 mb-2">
                  💡 <strong>Tip:</strong> No test data found.
                </p>
                <p className="text-sm text-blue-700">
                  Visit <a href="/regenerate-data" className="underline font-medium">regenerate data</a> to create sample entries including June 2024 data.
                </p>
              </div>
            )}
          </div>
        ) : (
          // Entries list
          <div className="p-4 space-y-3">
            {/* Current time indicator */}
            <div className="flex items-center gap-2 text-sm text-[rgb(var(--scla-primary-blue))]">
              <div className="w-2 h-2 bg-[rgb(var(--scla-primary-blue))] rounded-full" />
              <span>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
              </span>
              <div className="flex-1 h-px bg-[rgb(var(--scla-primary-blue))]" />
            </div>

            {/* Entry cards */}
            {selectedDateEntries.map((entry) => {
              if (entry.type === 'symptom') {
                const symptom = entry.data as Symptom;
                return (
                  <button 
                    key={entry.id} 
                    onClick={() => router.push(`/diary/${entry.id}`)}
                    className="bg-white rounded-lg p-4 shadow-sm w-full text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-sm text-gray-500 min-w-[60px]">
                        {entry.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                      </div>
                      
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">{SYMPTOM_ICONS[symptom.name] || '❓'}</span>
                      </div>

                      <div className="flex-1">
                        <div className="text-xs text-gray-500 uppercase mb-1">SYMPTOM</div>
                        <h3 className="font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
                          {symptom.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-orange-500 font-medium">
                            {symptom.intensity} / 10
                          </span>
                        </div>

                        {symptom.triggers.length > 0 && (
                          <div className="mt-2 text-sm text-gray-600">
                            {symptom.triggers.join('   ')}
                          </div>
                        )}

                        {symptom.analysisStatus === 'pending' && (
                          <div className="mt-3 bg-blue-50 text-[rgb(var(--scla-primary-blue))] text-sm px-3 py-2 rounded-lg flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Pending Analysis
                          </div>
                        )}

                        <div className="mt-3 text-right">
                          <span className="text-sm text-gray-500">
                            Pending Review
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              } else {
                const bp = entry.data as BloodPressureReading;
                return (
                  <button 
                    key={entry.id} 
                    onClick={() => router.push(`/diary/${entry.id}`)}
                    className="bg-white rounded-lg p-4 shadow-sm w-full text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-sm text-gray-500 min-w-[60px]">
                        {entry.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()}
                      </div>
                      
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">🩺</span>
                      </div>

                      <div className="flex-1">
                        <div className="text-xs text-gray-500 uppercase mb-1">BLOOD PRESSURE</div>
                        <h3 className="font-medium text-[rgb(var(--scla-dark-navy))]">
                          {bp.systolic}/{bp.diastolic} mmHg
                        </h3>
                        
                        <div className="mt-3 text-right">
                          <span className="text-sm text-gray-500">
                            Pending Review
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              }
            })}
          </div>
        )}
      </div>

      {/* Month/Year Picker Modal */}
      <MonthYearPicker
        value={currentMonth}
        onChange={setCurrentMonth}
        isOpen={showMonthYearPicker}
        onClose={() => setShowMonthYearPicker(false)}
      />
    </div>
  );
}