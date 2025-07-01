'use client';

import React, { useEffect, useState } from 'react';

interface IPhoneFrameProps {
  children: React.ReactNode;
}

export default function IPhoneFrame({ children }: IPhoneFrameProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="relative bg-black rounded-[2.5rem] p-3 shadow-2xl">
        {/* iPhone Screen */}
        <div className="relative bg-white rounded-[2.2rem] w-[390px] h-[844px] overflow-hidden">
          {/* Status Bar */}
          <div className="absolute top-0 left-0 right-0 z-50 px-6 pt-3 pb-1 text-black text-sm font-medium bg-white">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <span>{formatTime(currentTime)}</span>
              </div>
              <div className="flex-1 flex justify-center">
                {/* Dynamic Island is handled by the app */}
              </div>
              <div className="flex-1 flex justify-end items-center gap-1">
                {/* Signal Bars */}
                <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
                  <rect x="0" y="7" width="3" height="5" rx="0.5" />
                  <rect x="4" y="5" width="3" height="7" rx="0.5" />
                  <rect x="8" y="3" width="3" height="9" rx="0.5" />
                  <rect x="12" y="0" width="3" height="12" rx="0.5" />
                  <circle cx="16" cy="10" r="1" />
                </svg>
                {/* WiFi */}
                <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
                  <path d="M1 3.5c3.5-3 9.5-3 13 0" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.3" />
                  <path d="M3 5.5c2.5-2 6.5-2 9 0" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
                  <path d="M5 7.5c1.5-1 3.5-1 5 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="7.5" cy="9.5" r="1" />
                </svg>
                {/* Battery */}
                <div className="flex items-center">
                  <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                    <rect x="0.5" y="2.5" width="21" height="7" rx="2" stroke="currentColor" strokeWidth="1" />
                    <path d="M22 5v2c0.5 0 1-0.5 1-1s-0.5-1-1-1z" fill="currentColor" />
                    <rect x="2" y="4" width="13" height="4" rx="0.5" fill="currentColor" />
                  </svg>
                  <span className="ml-1 text-xs">84</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Content */}
          <div className="h-full w-full overflow-y-auto overflow-x-hidden" style={{ paddingTop: '44px' }}>
            {children}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full z-50" />
        </div>
      </div>
    </div>
  );
}