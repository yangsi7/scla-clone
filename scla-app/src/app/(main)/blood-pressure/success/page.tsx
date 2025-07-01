'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function BloodPressureSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-full bg-white p-8">
      {/* Success Illustration */}
      <div className="mb-8">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Person illustration similar to screenshot */}
          <rect x="50" y="140" width="100" height="10" fill="#E3F2FD" rx="5" />
          
          {/* Plant pot */}
          <path d="M30 140 L40 120 L50 140 Z" fill="#81C784" />
          <rect x="35" y="140" width="10" height="5" fill="#A1887F" />
          
          {/* Person body */}
          <rect x="70" y="80" width="60" height="60" fill="#81C784" rx="10" />
          
          {/* Person arms */}
          <rect x="50" y="90" width="20" height="40" fill="#64B5F6" rx="10" />
          <rect x="130" y="70" width="20" height="40" fill="#64B5F6" rx="10" transform="rotate(45 140 80)" />
          
          {/* Person head */}
          <circle cx="100" cy="50" r="25" fill="#FFCCBC" />
          
          {/* Hair */}
          <path d="M75 40 Q100 30 125 40 Q130 50 125 60 L115 55 Q100 50 85 55 L75 60 Q70 50 75 40 Z" fill="#424242" />
          
          {/* Blue scarf */}
          <rect x="85" y="65" width="30" height="20" fill="#1565C0" rx="5" />
          
          {/* OK hand gesture */}
          <circle cx="150" cy="50" r="15" fill="#FFCCBC" />
          <circle cx="150" cy="50" r="8" fill="none" stroke="#FF6B6B" strokeWidth="3" />
          
          {/* Sparkles around hand */}
          <path d="M165 35 L170 40 L165 45 L160 40 Z" fill="#FFC107" />
          <path d="M135 35 L140 40 L135 45 L130 40 Z" fill="#FFC107" />
          <path d="M150 20 L155 25 L150 30 L145 25 Z" fill="#FFC107" />
        </svg>
      </div>

      {/* Success Message */}
      <h1 className="text-2xl font-semibold text-[#003366] mb-12">
        Your blood pressure has been added.
      </h1>

      {/* Close Button */}
      <Button
        onClick={() => router.push('/dashboard')}
        className="w-full max-w-xs h-12 bg-[#0E4DA4] hover:bg-[#0E4DA4]/90 text-white text-lg font-medium rounded-full"
      >
        Close
      </Button>
    </div>
  );
}