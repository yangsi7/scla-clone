'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BloodPressurePage() {
  const router = useRouter();
  
  // Redirect to the entry page immediately
  useEffect(() => {
    router.push('/blood-pressure/entry');
  }, [router]);

  return null;
}