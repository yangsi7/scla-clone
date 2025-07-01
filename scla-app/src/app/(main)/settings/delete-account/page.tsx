'use client';

import React, { useState } from 'react';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';
import { Input } from '@/components/ui/input';

export default function DeleteAccountPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      showToast('Please type DELETE to confirm', 'error');
      return;
    }

    setIsDeleting(true);
    
    // Simulate account deletion
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear all data
    localStorage.clear();
    
    showToast('Account deleted successfully', 'success');
    
    // Logout and redirect
    await logout();
    router.push('/welcome');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b bg-white">
        <button 
          onClick={() => router.back()}
          className="p-1 -ml-1 mr-3 hover:bg-gray-100 rounded-lg transition-colors"
          disabled={isDeleting}
        >
          <ChevronLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
        </button>
        <h1 className="text-xl font-semibold text-[rgb(var(--scla-dark-navy))]">
          Delete Account
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start gap-3">
          <AlertTriangle className="text-red-600 mt-0.5" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">
              This action cannot be undone
            </h3>
            <p className="text-sm text-red-700">
              Deleting your account will permanently remove all your data including:
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-gray-700">All health records and measurements</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-gray-700">Symptom logs and diary entries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-gray-700">Device pairings and settings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-gray-700">Analysis reports and insights</span>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-gray-700 mb-4">
            To confirm account deletion, please type <strong>DELETE</strong> in the box below:
          </p>
          
          <Input
            type="text"
            placeholder="Type DELETE to confirm"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mb-6"
            disabled={isDeleting}
          />

          <button
            onClick={handleDelete}
            disabled={confirmText !== 'DELETE' || isDeleting}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              confirmText === 'DELETE' && !isDeleting
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isDeleting ? 'Deleting Account...' : 'Delete My Account'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Need help? Contact support at support@skiinconnected.com
          </p>
        </div>
      </div>
    </div>
  );
}