'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, Plus } from 'lucide-react';
import { mockAPI } from '@/mock/api';
import { PREDEFINED_SYMPTOMS, PREDEFINED_TRIGGERS } from '@/mock/constants';
import { useToast } from '@/components/ui/toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function SymptomPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([]);
  const [duration, setDuration] = useState<'ongoing' | 'intermittent'>('ongoing');
  const [durationTime, setDurationTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);


  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      await mockAPI.addSymptom(
        selectedSymptom,
        intensity,
        selectedTriggers,
        duration === 'ongoing' ? 0 : parseInt(durationTime) || 0,
        notes
      );
      
      showToast('success', 'Symptom logged successfully');
      setStep(6); // Success screen
      setTimeout(() => {
        router.push('/log');
      }, 2000);
    } catch (error) {
      console.error('Failed to save symptom:', error);
      showToast('error', 'Failed to save symptom. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-6">
              What symptom are you experiencing?
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              {PREDEFINED_SYMPTOMS.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => {
                    setSelectedSymptom(symptom);
                    handleNext();
                  }}
                  className="p-4 rounded-xl border-2 border-border hover:border-primary hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-2xl mb-1">{SYMPTOM_ICONS[symptom] || '❓'}</div>
                  <div className="text-sm font-medium text-[rgb(var(--scla-dark-navy))]">
                    {symptom}
                  </div>
                </button>
              ))}
              
              <button
                onClick={() => router.push('/custom-symptom')}
                className="p-4 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-blue-50 transition-all flex flex-col items-center justify-center"
              >
                <Plus size={24} className="text-[rgb(var(--scla-primary-blue))] mb-1" />
                <div className="text-sm font-medium text-[rgb(var(--scla-primary-blue))]">
                  Add Custom
                </div>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
              Rate your {selectedSymptom.toLowerCase()}
            </h2>
            <p className="text-[rgb(var(--scla-text-gray))] mb-8">
              On a scale of 1-10, how intense is it?
            </p>
            
            <div className="mb-8">
              <div className="text-center mb-4">
                <span className="text-5xl font-bold text-[rgb(var(--scla-primary-blue))]">
                  {intensity}
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              
              <div className="flex justify-between text-sm text-[rgb(var(--scla-text-gray))] mt-2">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>
            
            <button onClick={handleNext} className="scla-button-primary">
              Next
            </button>
          </div>
        );

      case 3:
        return (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
              What triggered your {selectedSymptom.toLowerCase()}?
            </h2>
            <p className="text-[rgb(var(--scla-text-gray))] mb-6">
              Select all that apply
            </p>
            
            <div className="space-y-3 mb-8">
              {PREDEFINED_TRIGGERS.map((trigger) => (
                <button
                  key={trigger}
                  onClick={() => {
                    if (selectedTriggers.includes(trigger)) {
                      setSelectedTriggers(selectedTriggers.filter(t => t !== trigger));
                    } else {
                      setSelectedTriggers([...selectedTriggers, trigger]);
                    }
                  }}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedTriggers.includes(trigger)
                      ? 'border-[rgb(var(--scla-primary-blue))] bg-blue-50'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[rgb(var(--scla-dark-navy))]">
                      {trigger}
                    </span>
                    {selectedTriggers.includes(trigger) && (
                      <div className="w-6 h-6 bg-[rgb(var(--scla-primary-blue))] rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <button onClick={handleNext} className="scla-button-primary">
              Next
            </button>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-6">
              How long have you been experiencing this?
            </h2>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setDuration('ongoing')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  duration === 'ongoing'
                    ? 'border-[rgb(var(--scla-primary-blue))] bg-blue-50'
                    : 'border-border'
                }`}
              >
                <div className="font-medium text-[rgb(var(--scla-dark-navy))]">
                  Ongoing
                </div>
                <div className="text-sm text-[rgb(var(--scla-text-gray))]">
                  Currently experiencing
                </div>
              </button>
              
              <button
                onClick={() => setDuration('intermittent')}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  duration === 'intermittent'
                    ? 'border-[rgb(var(--scla-primary-blue))] bg-blue-50'
                    : 'border-border'
                }`}
              >
                <div className="font-medium text-[rgb(var(--scla-dark-navy))]">
                  Intermittent
                </div>
                <div className="text-sm text-[rgb(var(--scla-text-gray))]">
                  Comes and goes
                </div>
              </button>
            </div>
            
            {duration === 'intermittent' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={durationTime}
                  onChange={(e) => setDurationTime(e.target.value)}
                  placeholder="Enter duration"
                  className="w-full p-3 border border-border rounded-lg outline-none focus:border-primary"
                />
              </div>
            )}
            
            <button onClick={handleNext} className="scla-button-primary">
              Next
            </button>
          </div>
        );

      case 5:
        return (
          <div className="flex-1 p-4">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
              Any additional notes?
            </h2>
            <p className="text-[rgb(var(--scla-text-gray))] mb-6">
              Add any details that might be helpful
            </p>
            
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Describe your symptoms, what you were doing, etc..."
              className="w-full p-4 border border-border rounded-lg outline-none focus:border-primary resize-none h-40"
            />
            
            <div className="mt-8">
              <button 
                onClick={handleSubmit} 
                disabled={loading}
                className="scla-button-primary disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Symptom'}
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-24 h-24 bg-[rgb(var(--scla-success-green))] rounded-full flex items-center justify-center mb-6">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
              Symptom Logged!
            </h2>
            <p className="text-[rgb(var(--scla-text-gray))] text-center">
              Your symptom has been recorded and will be analyzed.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={handleBack} className="p-2">
            <ArrowLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
          </button>
          
          <h1 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))]">
            Log Symptom
          </h1>
          
          <div className="w-10" />
        </div>

        {/* Progress indicator */}
        {step < 6 && (
          <div className="px-4 py-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-1 rounded-full ${
                    s <= step ? 'bg-[rgb(var(--scla-primary-blue))]' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}