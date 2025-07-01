'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { mockAPI } from '@/mock/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TimePicker } from '@/components/ui/time-picker';
import { useToast } from '@/components/ui/toast';
import { useAuth } from '@/contexts/AuthContext';
import { useHeader } from '@/contexts/HeaderContext';

export default function BloodPressureEntryPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const { user } = useAuth();
  const { setConfig } = useHeader();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPM, setIsPM] = useState(new Date().getHours() >= 12);
  
  // First measurement
  const [systolic1, setSystolic1] = useState('');
  const [diastolic1, setDiastolic1] = useState('');
  
  // Second measurement
  const [systolic2, setSystolic2] = useState('');
  const [diastolic2, setDiastolic2] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Configure header
  useEffect(() => {
    setConfig({
      title: 'Blood Pressure',
      showBackButton: true,
      showMenuButton: false,
      onBackClick: () => router.back(),
    });
  }, [setConfig, router]);

  const handleTimeChange = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = async () => {
    // Validation
    if (!systolic1 || !diastolic1) {
      showToast({
        title: 'Missing Data',
        description: 'Please enter at least the first measurement.',
        variant: 'destructive',
      });
      return;
    }

    // Validate ranges
    const sys1 = parseInt(systolic1);
    const dia1 = parseInt(diastolic1);
    
    if (sys1 < 70 || sys1 > 250 || dia1 < 40 || dia1 > 150) {
      showToast({
        title: 'Invalid Values',
        description: 'Please check your blood pressure values.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate average if both measurements provided
      let avgSystolic = sys1;
      let avgDiastolic = dia1;
      
      if (systolic2 && diastolic2) {
        const sys2 = parseInt(systolic2);
        const dia2 = parseInt(diastolic2);
        avgSystolic = Math.round((sys1 + sys2) / 2);
        avgDiastolic = Math.round((dia1 + dia2) / 2);
      }

      // Use the selected date directly

      if (!user) {
        showToast({
          title: 'Error',
          description: 'User not logged in.',
          variant: 'destructive',
        });
        return;
      }

      await mockAPI.addBloodPressure({
        userId: user.id,
        measuredAt: selectedDate,
        systolic1: sys1,
        diastolic1: dia1,
        systolic2: systolic2 ? parseInt(systolic2) : undefined,
        diastolic2: diastolic2 ? parseInt(diastolic2) : undefined,
        arm: 'left', // Default to left arm as shown in screenshots
        notes: systolic2 && diastolic2 ? `Average: ${avgSystolic}/${avgDiastolic}` : '',
      });

      // Show success screen
      router.push('/blood-pressure/success');
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'Failed to save blood pressure reading.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          {/* Date/Time Selection */}
          <div>
            <h2 className="text-lg font-medium text-[#003366] mb-4">
              When did you measure your blood pressure?
            </h2>
            
            {/* Date */}
            <div className="mb-3">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-base">Today</span>
              </div>
            </div>

            {/* Time */}
            <TimePicker
              value={selectedDate}
              onChange={handleTimeChange}
              isPM={isPM}
              onPMChange={setIsPM}
            />
          </div>

          {/* Instructions */}
          <div className="flex gap-4 p-4 bg-blue-50 rounded-lg">
            <img
              src="/images/bp-instructions.svg"
              alt="Blood pressure measurement instructions"
              className="w-32 h-32 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <ul className="flex-1 space-y-2 text-sm text-gray-700">
              <li>• Rest for 5 minutes before measuring</li>
              <li>• Empty your bladder</li>
              <li>• Sit with your back and arm supported</li>
              <li>• Place feet flat on the floor</li>
              <li>• Ensure cuff is at the level of your heart</li>
              <li>• Do not talk while taking a measurement</li>
            </ul>
          </div>

          {/* First Measurement */}
          <div>
            <h3 className="text-lg font-medium text-[#003366] mb-3">First measurement</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="systolic1" className="text-gray-600 text-sm">Systolic</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="systolic1"
                    type="number"
                    placeholder="Systolic"
                    value={systolic1}
                    onChange={(e) => setSystolic1(e.target.value)}
                    className="flex-1 h-12 text-lg"
                    min="70"
                    max="250"
                  />
                  <span className="text-gray-600">mmHg</span>
                </div>
              </div>
              <div>
                <Label htmlFor="diastolic1" className="text-gray-600 text-sm">Diastolic</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="diastolic1"
                    type="number"
                    placeholder="Diastolic"
                    value={diastolic1}
                    onChange={(e) => setDiastolic1(e.target.value)}
                    className="flex-1 h-12 text-lg"
                    min="40"
                    max="150"
                  />
                  <span className="text-gray-600">mmHg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Second Measurement */}
          <div>
            <h3 className="text-lg font-medium text-[#003366] mb-3">Second measurement</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="systolic2" className="text-gray-600 text-sm">Systolic</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="systolic2"
                    type="number"
                    placeholder="Systolic"
                    value={systolic2}
                    onChange={(e) => setSystolic2(e.target.value)}
                    className="flex-1 h-12 text-lg"
                    min="70"
                    max="250"
                  />
                  <span className="text-gray-600">mmHg</span>
                </div>
              </div>
              <div>
                <Label htmlFor="diastolic2" className="text-gray-600 text-sm">Diastolic</Label>
                <div className="flex items-center gap-3">
                  <Input
                    id="diastolic2"
                    type="number"
                    placeholder="Diastolic"
                    value={diastolic2}
                    onChange={(e) => setDiastolic2(e.target.value)}
                    className="flex-1 h-12 text-lg"
                    min="40"
                    max="150"
                  />
                  <span className="text-gray-600">mmHg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="p-4 border-t bg-white">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !systolic1 || !diastolic1}
          className="w-full h-12 bg-[#0E4DA4] hover:bg-[#0E4DA4]/90 text-white text-lg font-medium rounded-full"
        >
          {isSubmitting ? 'Adding...' : 'Add'}
        </Button>
      </div>

    </div>
  );
}