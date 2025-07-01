'use client';

import { useEffect, useState } from 'react';
import { mockAPI } from '@/mock/api';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { CheckCircle } from 'lucide-react';

export default function RegenerateDataPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Initializing...');
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const regenerate = async () => {
      try {
        setStatus('Clearing old data...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStatus('Generating 6 months of symptom history...');
        await mockAPI.regenerateData();
        
        setStatus('Creating blood pressure readings...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setStatus('Finalizing June 2024 entries...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setComplete(true);
        setStatus('Mock data regenerated successfully!');
        console.log('Mock data regenerated with June entries!');
        
        // Redirect to dashboard after showing success
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (error) {
        console.error('Error regenerating data:', error);
        setStatus('Error regenerating data. Please refresh the page.');
      }
    };
    
    regenerate();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
        <div className="mb-6">
          {complete ? (
            <CheckCircle size={64} className="mx-auto text-green-500" />
          ) : (
            <LoadingSpinner size={64} className="mx-auto" />
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4">
          {complete ? 'Success!' : 'Regenerating Mock Data'}
        </h1>
        <p className="text-gray-600 mb-2">{status}</p>
        <p className="text-sm text-gray-500">
          This ensures you have realistic test data including entries from June 2024.
        </p>
      </div>
    </div>
  );
}