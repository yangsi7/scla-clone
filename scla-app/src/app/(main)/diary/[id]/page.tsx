'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Clock } from 'lucide-react';
import { mockAPI } from '@/mock/api';
import { Symptom, BloodPressureReading } from '@/types';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/components/ui/toast';

export default function DiaryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [symptom, setSymptom] = useState<Symptom | null>(null);
  const [bpReading, setBpReading] = useState<BloodPressureReading | null>(null);

  useEffect(() => {
    loadEntry();
  }, [params.id]);

  const loadEntry = async () => {
    setLoading(true);
    try {
      // Try to find as symptom first
      const symptoms = await mockAPI.getSymptoms();
      const foundSymptom = symptoms.find(s => s.id === params.id);
      
      if (foundSymptom) {
        setSymptom(foundSymptom);
      } else {
        // Try as BP reading
        const bpReadings = await mockAPI.getBloodPressureReadings();
        const foundBP = bpReadings.find(bp => bp.id === params.id);
        
        if (foundBP) {
          setBpReading(foundBP);
        } else {
          showToast('error', 'Entry not found');
          router.back();
        }
      }
    } catch (error) {
      console.error('Failed to load entry:', error);
      showToast('error', 'Failed to load entry');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (confirm('Are you sure you want to remove this entry?')) {
      try {
        if (symptom) {
          await mockAPI.deleteSymptom(symptom.id);
          showToast('success', 'Symptom removed');
        } else if (bpReading) {
          await mockAPI.deleteBloodPressureReading(bpReading.id);
          showToast('success', 'Blood pressure reading removed');
        }
        router.back();
      } catch (error) {
        console.error('Failed to remove entry:', error);
        showToast('error', 'Failed to remove entry');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (symptom) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mx-auto pr-10">
            Today
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-4">
              Symptom
            </h2>
            
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Clock size={16} />
              <span>Symptom experienced at {symptom.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <h3 className="text-2xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-2">
              {symptom.name}
            </h3>

            <div className="flex items-center gap-6 mb-8">
              <div className="w-2 h-2 bg-orange-500 rounded-full" />
              <span className="text-xl text-orange-500 font-medium">
                {symptom.intensity} / 10
              </span>
            </div>

            {symptom.triggers.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-3">
                  Possible Triggers
                </h4>
                <p className="text-gray-600">
                  {symptom.triggers.join(', ')}
                </p>
              </div>
            )}

            <div className="mb-8">
              <h4 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-3">
                Duration
              </h4>
              <p className="text-gray-600">
                {symptom.duration === 0 ? 'Ongoing' : `${symptom.duration} minutes`}
              </p>
            </div>

            {symptom.notes && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-3">
                  Notes
                </h4>
                <p className="text-gray-600">
                  {symptom.notes}
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 mb-8 flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-gray-600">Your symptom is pending review</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-3">
          <button
            onClick={() => router.push(`/symptom/edit/${symptom.id}`)}
            className="flex-1 py-3 px-6 rounded-full border-2 border-[rgb(var(--scla-primary-blue))] text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Edit Symptom
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 py-3 px-6 rounded-full border-2 border-[rgb(var(--scla-primary-blue))] text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Remove Symptom
          </button>
        </div>
      </div>
    );
  }

  if (bpReading) {
    return (
      <div className="flex flex-col h-full bg-white">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mx-auto pr-10">
            Today
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))] mb-4">
              Blood Pressure
            </h2>
            
            <div className="flex items-center gap-2 text-gray-600 mb-6">
              <Clock size={16} />
              <span>Recorded at {bpReading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>

            <h3 className="text-3xl font-bold text-[rgb(var(--scla-dark-navy))] mb-8">
              {bpReading.systolic}/{bpReading.diastolic} mmHg
            </h3>

            <div className="mb-8">
              <h4 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-3">
                Heart Rate
              </h4>
              <p className="text-gray-600">
                {bpReading.heartRate} bpm
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-3">
                Arm
              </h4>
              <p className="text-gray-600 capitalize">
                {bpReading.arm}
              </p>
            </div>

            {bpReading.notes && (
              <div className="mb-8">
                <h4 className="text-lg font-medium text-[rgb(var(--scla-dark-navy))] mb-3">
                  Notes
                </h4>
                <p className="text-gray-600">
                  {bpReading.notes}
                </p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 mb-8 flex items-center gap-2">
              <Clock size={16} className="text-gray-500" />
              <span className="text-gray-600">Your blood pressure reading is pending review</span>
            </div>
          </div>
        </div>

        <div className="p-4 border-t flex gap-3">
          <button
            onClick={() => router.push(`/blood-pressure/edit/${bpReading.id}`)}
            className="flex-1 py-3 px-6 rounded-full border-2 border-[rgb(var(--scla-primary-blue))] text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Edit Reading
          </button>
          <button
            onClick={handleRemove}
            className="flex-1 py-3 px-6 rounded-full border-2 border-[rgb(var(--scla-primary-blue))] text-[rgb(var(--scla-primary-blue))] font-medium"
          >
            Remove Reading
          </button>
        </div>
      </div>
    );
  }

  return null;
}