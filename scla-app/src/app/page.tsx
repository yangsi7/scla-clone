'use client';

import { useEffect, useState } from 'react';
import { mockAPI } from '@/mock/api';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check for existing session
    mockAPI.checkSession().then((session) => {
      if (session) {
        setSession(session);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Status Bar */}
      <div className="status-bar bg-gray-50">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span>●●●</span>
          <span>⚡</span>
          <span>📶</span>
          <span>100</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="text-center py-16">
          <h1 className="text-4xl font-bold mb-2">SKIIN</h1>
          <p className="text-gray-600 mb-8">
            Track your heart rate, location,<br />
            activity and body temperature.
          </p>
          
          <div className="w-48 h-48 mx-auto mb-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-6xl">❤️</span>
          </div>
          
          <div className="flex justify-center gap-2 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
          
          <h2 className="text-2xl font-semibold mb-2">Welcome</h2>
          <p className="text-gray-600 mb-8">Get started using Skiin today!</p>
          
          <button 
            className="w-full max-w-xs mx-auto bg-primary text-white py-3 rounded-lg font-medium mb-4"
            onClick={() => window.location.href = '/auth/register'}
          >
            Get Started
          </button>
          
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/auth/signin" className="text-primary font-medium">
              Sign In
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}