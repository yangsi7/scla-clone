'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, Plus, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { mockAPI } from '@/mock/api';
import { PREDEFINED_SYMPTOMS, PREDEFINED_TRIGGERS } from '@/mock/constants';
import { useToast } from '@/components/ui/toast';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { TimePicker } from '@/components/ui/time-picker';
import { useHeader } from '@/contexts/HeaderContext';

interface SymptomDetail {
  name: string;
  intensity: number;
  triggers: string[];
  duration: 'ongoing' | 'on_and_off';
  durationHours: string;
  durationMinutes: string;
  notes: string;
}

export default function SymptomEntryPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { setConfig } = useHeader();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isPM, setIsPM] = useState(new Date().getHours() >= 12);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomSearch, setSymptomSearch] = useState('');
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedSymptom, setExpandedSymptom] = useState<string | null>(null);
  const [symptomDetails, setSymptomDetails] = useState<Record<string, SymptomDetail>>({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [triggerSearch, setTriggerSearch] = useState('');
  const [symptoms, setSymptoms] = useState(PREDEFINED_SYMPTOMS);
  const [showCustomSymptomInput, setShowCustomSymptomInput] = useState(false);
  const [customSymptomName, setCustomSymptomName] = useState('');

  // Configure header
  useEffect(() => {
    setConfig({
      showMenuButton: false,
      customHeader: showDetails ? null : (
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft className="w-6 h-6 text-[#003366]" />
          </button>
          <h1 className="text-xl font-semibold text-[#003366]">Symptom</h1>
          <div className="w-10" />
        </div>
      ),
    });
  }, [setConfig, router, showDetails]);

  const filteredSymptoms = symptoms.filter(s => 
    s.toLowerCase().includes(symptomSearch.toLowerCase())
  );
  const visibleSymptoms = showAllSymptoms ? filteredSymptoms : filteredSymptoms.slice(0, 8);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
      const newDetails = { ...symptomDetails };
      delete newDetails[symptom];
      setSymptomDetails(newDetails);
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setSymptomDetails({
        ...symptomDetails,
        [symptom]: {
          name: symptom,
          intensity: 5,
          triggers: [],
          duration: 'ongoing',
          durationHours: '',
          durationMinutes: '',
          notes: ''
        }
      });
    }
  };

  const updateSymptomDetail = (symptom: string, updates: Partial<SymptomDetail>) => {
    setSymptomDetails({
      ...symptomDetails,
      [symptom]: {
        ...symptomDetails[symptom],
        ...updates
      }
    });
  };

  const toggleTrigger = (symptom: string, trigger: string) => {
    const detail = symptomDetails[symptom];
    const newTriggers = detail.triggers.includes(trigger)
      ? detail.triggers.filter(t => t !== trigger)
      : [...detail.triggers, trigger];
    updateSymptomDetail(symptom, { triggers: newTriggers });
  };

  const addCustomTrigger = (symptom: string) => {
    if (triggerSearch.trim()) {
      const detail = symptomDetails[symptom];
      if (!detail.triggers.includes(triggerSearch.trim())) {
        updateSymptomDetail(symptom, { 
          triggers: [...detail.triggers, triggerSearch.trim()] 
        });
      }
      setTriggerSearch('');
    }
  };

  const addCustomSymptom = () => {
    if (customSymptomName.trim() && !symptoms.includes(customSymptomName.trim())) {
      const newSymptom = customSymptomName.trim();
      setSymptoms([...symptoms, newSymptom]);
      toggleSymptom(newSymptom);
      setCustomSymptomName('');
      setShowCustomSymptomInput(false);
      showToast('Custom symptom added', 'success');
    }
  };

  const handleSave = async () => {
    if (selectedSymptoms.length === 0) {
      showToast('error', 'Please select at least one symptom');
      return;
    }

    setLoading(true);
    try {
      for (const symptom of selectedSymptoms) {
        const detail = symptomDetails[symptom];
        await mockAPI.addSymptom(
          symptom,
          detail?.intensity || 5,
          detail?.triggers || [],
          detail?.duration === 'ongoing' ? 0 : 
            (parseInt(detail?.durationHours || '0') * 60 + parseInt(detail?.durationMinutes || '0')),
          detail?.notes || ''
        );
      }
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to save symptoms:', error);
      showToast('error', 'Failed to save symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center p-4 border-b">
          <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mx-auto">
            Symptom
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-64 h-64 mb-8">
            <Image
              src="/images/success-illustration.svg"
              alt="Success"
              width={256}
              height={256}
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="text-2xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-4">
            Your symptom has been logged!
          </h2>

          <p className="text-center text-[rgb(var(--scla-text-gray))] mb-8 px-4">
            If ECG data is available from your Skiin garment, we'll analyze it to better understand 
            this symptom. This may take a few minutes.
          </p>

          <p className="text-center text-[rgb(var(--scla-text-gray))] mb-8">
            We'll notify you when the analysis is ready.
          </p>

          <button
            onClick={() => router.push('/dashboard')}
            className="scla-button-primary w-64"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (showDetails) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => setShowDetails(false)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mx-auto pr-10">
            Add More Details
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
              Add additional details to symptoms
            </h2>
            <p className="text-[rgb(var(--scla-text-gray))] mb-6">
              Tap on each symptom to add details such as severity, possible triggers, duration and notes. 
              Once you are finished, tap the Save button below.
            </p>

            {selectedSymptoms.map((symptom) => {
              const detail = symptomDetails[symptom];
              const isExpanded = expandedSymptom === symptom;

              return (
                <div key={symptom} className="mb-4">
                  <button
                    onClick={() => setExpandedSymptom(isExpanded ? null : symptom)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-[rgb(var(--scla-dark-navy))]">
                      {symptom}
                    </span>
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 space-y-6">
                          {/* Intensity Slider */}
                          <div>
                            <h3 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-4">
                              Symptom Intensity
                            </h3>
                            <div className="relative">
                              <input
                                type="range"
                                min="0"
                                max="10"
                                value={detail.intensity}
                                onChange={(e) => updateSymptomDetail(symptom, { 
                                  intensity: parseInt(e.target.value) 
                                })}
                                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                                style={{
                                  background: `linear-gradient(to right, #FFC107 0%, #FF9800 50%, #F44336 100%)`
                                }}
                              />
                              <div className="flex justify-between mt-2">
                                {[0,1,2,3,4,5,6,7,8,9,10].map(num => (
                                  <span key={num} className="text-xs text-gray-500">{num}</span>
                                ))}
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-sm text-gray-500">None</span>
                                <span className="text-sm text-gray-500">Worst</span>
                              </div>
                            </div>
                          </div>

                          {/* Triggers */}
                          <div>
                            <h3 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-4">
                              Possible Triggers
                            </h3>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                  type="text"
                                  value={triggerSearch}
                                  onChange={(e) => setTriggerSearch(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      addCustomTrigger(symptom);
                                    }
                                  }}
                                  placeholder="Search or add trigger"
                                  className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary"
                                />
                              </div>
                              <button
                                onClick={() => addCustomTrigger(symptom)}
                                className="px-6 py-3 bg-gray-300 text-gray-600 rounded-full font-medium flex items-center gap-2"
                              >
                                <Plus size={16} />
                                ADD
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {detail.triggers.map((trigger) => (
                                <button
                                  key={trigger}
                                  onClick={() => toggleTrigger(symptom, trigger)}
                                  className="px-4 py-2 bg-[rgb(var(--scla-primary-blue))] text-white rounded-full"
                                >
                                  {trigger}
                                </button>
                              ))}
                              {PREDEFINED_TRIGGERS.filter(t => !detail.triggers.includes(t)).map((trigger) => (
                                <button
                                  key={trigger}
                                  onClick={() => toggleTrigger(symptom, trigger)}
                                  className="px-4 py-2 bg-gray-100 text-[rgb(var(--scla-dark-navy))] rounded-full"
                                >
                                  {trigger}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Duration */}
                          <div>
                            <h3 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-4">
                              Symptom Duration
                            </h3>
                            <div className="space-y-3 mb-4">
                              <label className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name={`duration-${symptom}`}
                                  checked={detail.duration === 'ongoing'}
                                  onChange={() => updateSymptomDetail(symptom, { duration: 'ongoing' })}
                                  className="w-5 h-5 text-[rgb(var(--scla-primary-blue))]"
                                />
                                <span className="text-[rgb(var(--scla-dark-navy))]">Ongoing</span>
                              </label>
                              <label className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name={`duration-${symptom}`}
                                  checked={detail.duration === 'on_and_off'}
                                  onChange={() => updateSymptomDetail(symptom, { duration: 'on_and_off' })}
                                  className="w-5 h-5 text-[rgb(var(--scla-primary-blue))]"
                                />
                                <span className="text-[rgb(var(--scla-dark-navy))]">On and off</span>
                              </label>
                            </div>

                            {detail.duration === 'on_and_off' && (
                              <div className="flex items-center gap-3">
                                <input
                                  type="number"
                                  value={detail.durationHours}
                                  onChange={(e) => updateSymptomDetail(symptom, { 
                                    durationHours: e.target.value 
                                  })}
                                  placeholder="0"
                                  className="w-20 p-3 rounded-lg border border-gray-300 text-center"
                                />
                                <span className="text-[rgb(var(--scla-text-gray))]">hr</span>
                                <input
                                  type="number"
                                  value={detail.durationMinutes}
                                  onChange={(e) => updateSymptomDetail(symptom, { 
                                    durationMinutes: e.target.value 
                                  })}
                                  placeholder="0"
                                  className="w-20 p-3 rounded-lg border border-gray-300 text-center"
                                />
                                <span className="text-[rgb(var(--scla-text-gray))]">min</span>
                              </div>
                            )}
                          </div>

                          {/* Notes */}
                          <div>
                            <h3 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
                              Notes
                            </h3>
                            <p className="text-sm text-[rgb(var(--scla-text-gray))] mb-4">
                              Add any details you were unable to include above, such as what you were doing when 
                              you experienced the symptom, medications you may have taken, etc.
                            </p>
                            <textarea
                              value={detail.notes}
                              onChange={(e) => updateSymptomDetail(symptom, { notes: e.target.value })}
                              placeholder="Add a note"
                              className="w-full p-4 rounded-lg border border-gray-300 min-h-[100px]"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleSave}
            disabled={loading}
            className="scla-button-primary"
          >
            {loading ? <LoadingSpinner /> : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {/* Date/Time Selection */}
          <h2 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-4">
            When did you experience these symptoms?
          </h2>
          
          <div className="space-y-3 mb-6">
            <button className="w-full p-4 bg-gray-50 rounded-lg flex items-center gap-3">
              <Calendar size={20} />
              <span className="flex-1 text-left">Today</span>
            </button>
            
            <TimePicker 
              value={selectedTime}
              onChange={setSelectedTime}
              isPM={isPM}
              onPMChange={setIsPM}
            />
          </div>

          {/* Symptom Selection */}
          <h2 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-4">
            What symptoms are you experiencing?
          </h2>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={symptomSearch}
                onChange={(e) => setSymptomSearch(e.target.value)}
                placeholder="Search symptoms"
                className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
            <button 
              onClick={() => setShowCustomSymptomInput(true)}
              className="px-8 py-2 bg-gray-300 text-gray-600 rounded-full font-medium flex items-center gap-1 whitespace-nowrap"
            >
              <Plus size={16} />
              <span className="text-sm">ADD</span>
            </button>
          </div>

          {/* Custom Symptom Input */}
          {showCustomSymptomInput && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-[rgb(var(--scla-dark-navy))] mb-2">
                Add Custom Symptom
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSymptomName}
                  onChange={(e) => setCustomSymptomName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomSymptom()}
                  placeholder="Enter symptom name"
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button
                  onClick={addCustomSymptom}
                  className="px-4 py-2 bg-[rgb(var(--scla-primary-blue))] text-white rounded-lg font-medium"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowCustomSymptomInput(false);
                    setCustomSymptomName('');
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Selected Symptoms */}
          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className="px-4 py-2 bg-[rgb(var(--scla-primary-blue))] text-white rounded-full"
                >
                  {symptom}
                </button>
              ))}
            </div>
          )}

          {/* Symptom Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {visibleSymptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`p-3 rounded-lg text-left ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-blue-50 text-[rgb(var(--scla-primary-blue))]'
                    : 'text-[rgb(var(--scla-primary-blue))]'
                }`}
              >
                {symptom}
              </button>
            ))}
          </div>

          {!showAllSymptoms && PREDEFINED_SYMPTOMS.length > 8 && (
            <button
              onClick={() => setShowAllSymptoms(true)}
              className="text-[rgb(var(--scla-primary-blue))] font-medium flex items-center gap-1"
            >
              See More
              <ChevronDown size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 border-t flex gap-3">
        <button
          onClick={handleSave}
          disabled={loading || selectedSymptoms.length === 0}
          className="flex-1 py-4 px-6 rounded-full border-2 border-gray-300 text-gray-600 font-medium"
        >
          {loading ? <LoadingSpinner /> : 'Save'}
        </button>
        <button
          onClick={() => setShowDetails(true)}
          disabled={selectedSymptoms.length === 0}
          className="flex-1 scla-button-primary"
        >
          Add More Details
        </button>
      </div>
    </div>
  );
}