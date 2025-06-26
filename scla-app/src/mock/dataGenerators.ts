import { Symptom, BloodPressureReading, HolterStudy, User, UserPreferences } from '@/types';
import { uuidv4, randomChoice, randomSample, weightedRandom } from './utils';
import { PREDEFINED_SYMPTOMS, PREDEFINED_TRIGGERS, SYMPTOM_NOTES } from './constants';

/**
 * Generates realistic symptom data with medical patterns
 * Creates symptoms with appropriate frequency distributions and time patterns
 * 
 * @class SymptomGenerator
 * @description This class creates realistic symptom patterns for the mock data system.
 * It follows medical data patterns where most days have no symptoms, some have one,
 * and multiple symptoms per day are rare. Symptoms include intensity, triggers, and notes.
 * 
 * @example
 * const symptomGen = new SymptomGenerator();
 * const sixMonthsOfSymptoms = symptomGen.generateHistoricalSymptoms('user-123', 6);
 */
export class SymptomGenerator {
  /**
   * Generates historical symptom data for a user
   * @param userId - User ID to associate symptoms with
   * @param months - Number of months of historical data to generate
   * @returns Array of symptoms sorted by date (newest first)
   * 
   * Distribution: 60% of days have no symptoms, 30% have 1, 8% have 2, 2% have 3
   * This creates a realistic pattern matching typical patient symptom logs
   */
  generateHistoricalSymptoms(userId: string, months: number): Symptom[] {
    const symptoms: Symptom[] = [];
    const now = new Date();
    
    for (let i = 0; i < months * 30; i++) {
      const daysAgo = Math.floor(Math.random() * months * 30);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      
      // Generate 0-3 symptoms per day with weighted probability
      const symptomCount = weightedRandom([0, 1, 2, 3], [0.6, 0.3, 0.08, 0.02]);
      
      for (let j = 0; j < symptomCount; j++) {
        symptoms.push(this.generateSymptom(userId, date));
      }
    }
    
    return symptoms.sort((a, b) => b.experiencedAt.getTime() - a.experiencedAt.getTime());
  }
  
  /**
   * Generates a single symptom entry with realistic attributes
   * @private
   * @param userId - User ID for the symptom
   * @param date - Date when symptom occurred
   * @returns Complete symptom object with intensity, triggers, and optional notes
   * 
   * Features:
   * - Random symptom from predefined list
   * - 1-3 triggers per symptom
   * - Intensity between 2-9 (mild to severe)
   * - 40% ongoing, 60% intermittent
   * - 30% include notes
   * - Analysis complete after 24 hours
   */
  private generateSymptom(userId: string, date: Date): Symptom {
    const symptomName = randomChoice(PREDEFINED_SYMPTOMS);
    const triggerCount = Math.floor(Math.random() * 3) + 1;
    const triggers = randomSample(PREDEFINED_TRIGGERS, triggerCount);
    
    // Add time variation within the day
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    date.setHours(hours, minutes);
    
    const isOngoing = Math.random() > 0.6;
    const analysisComplete = date < new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return {
      id: `symptom-${uuidv4()}`,
      userId,
      symptomName,
      intensity: Math.floor(Math.random() * 8) + 2, // 2-9
      experiencedAt: new Date(date),
      durationType: isOngoing ? 'ongoing' : 'intermittent',
      durationHours: isOngoing ? undefined : Math.floor(Math.random() * 4),
      durationMinutes: isOngoing ? undefined : Math.floor(Math.random() * 60),
      triggers,
      notes: Math.random() > 0.7 ? randomChoice(SYMPTOM_NOTES) : undefined,
      analysisStatus: analysisComplete ? 'completed' : 'pending',
      reviewStatus: analysisComplete && Math.random() > 0.3 ? 'reviewed' : 'pending'
    };
  }
}

/**
 * Generates realistic blood pressure readings with circadian patterns
 * 
 * @class BloodPressureGenerator
 * @description This class creates blood pressure data following medical patterns.
 * Morning readings are typically lower than evening readings. Most users take
 * readings once or twice daily, with morning readings more common.
 * 
 * @example
 * const bpGen = new BloodPressureGenerator();
 * const threeMonthsOfReadings = bpGen.generateHistoricalReadings('user-123', 3);
 */
export class BloodPressureGenerator {
  /**
   * Generates historical blood pressure readings
   * @param userId - User ID to associate readings with
   * @param months - Number of months of historical data
   * @returns Array of BP readings sorted by date (newest first)
   * 
   * Pattern:
   * - 60% chance of morning reading (7-10 AM)
   * - 40% chance of evening reading (6-10 PM)
   * - Follows circadian rhythm (lower in morning)
   */
  generateHistoricalReadings(userId: string, months: number): BloodPressureReading[] {
    const readings: BloodPressureReading[] = [];
    const now = new Date();
    
    // Generate morning and evening readings
    for (let i = 0; i < months * 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Morning reading (60% chance)
      if (Math.random() < 0.6) {
        const morningDate = new Date(date);
        morningDate.setHours(7 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60));
        readings.push(this.generateReading(userId, morningDate, 'morning'));
      }
      
      // Evening reading (40% chance)
      if (Math.random() < 0.4) {
        const eveningDate = new Date(date);
        eveningDate.setHours(18 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60));
        readings.push(this.generateReading(userId, eveningDate, 'evening'));
      }
    }
    
    return readings.sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime());
  }
  
  /**
   * Generates a single blood pressure reading
   * @private
   * @param userId - User ID for the reading
   * @param date - Date and time of measurement
   * @param timeOfDay - Morning or evening (affects base values)
   * @returns Complete BP reading with possible second measurement
   * 
   * Medical patterns:
   * - Morning: ~125/82 mmHg base
   * - Evening: ~130/85 mmHg base
   * - ±10 systolic, ±7 diastolic variation
   * - 70% include second measurement
   */
  private generateReading(userId: string, date: Date, timeOfDay: 'morning' | 'evening'): BloodPressureReading {
    // Base values with circadian variation
    const baseSystolic = timeOfDay === 'morning' ? 125 : 130;
    const baseDiastolic = timeOfDay === 'morning' ? 82 : 85;
    
    // Add realistic variation
    const systolic1 = baseSystolic + Math.floor((Math.random() - 0.5) * 20);
    const diastolic1 = baseDiastolic + Math.floor((Math.random() - 0.5) * 15);
    
    // Second measurement is usually close to first
    const hasTwoMeasurements = Math.random() > 0.3;
    const systolic2 = hasTwoMeasurements ? systolic1 + Math.floor((Math.random() - 0.5) * 5) : undefined;
    const diastolic2 = hasTwoMeasurements ? diastolic1 + Math.floor((Math.random() - 0.5) * 3) : undefined;
    
    return {
      id: `bp-${uuidv4()}`,
      userId,
      measuredAt: date,
      systolic1,
      diastolic1,
      systolic2,
      diastolic2,
      arm: 'left',
      notes: Math.random() > 0.9 ? 'After exercise' : undefined
    };
  }
}

/**
 * Creates a default user profile for the mock system
 * @returns Complete user object with realistic profile data
 * 
 * @example
 * const user = generateInitialUser();
 * // Returns John Doe, male, born 1985, verified email
 */
export function generateInitialUser(): User {
  return {
    id: 'user-001',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1985-03-15'),
    gender: 'male',
    phoneNumber: '+1-555-0123',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    isActive: true,
    emailVerified: true
  };
}

/**
 * Creates default user preferences for the app
 * @param userId - User ID to associate preferences with
 * @returns UserPreferences with sensible defaults
 * 
 * Defaults:
 * - Data upload: WiFi and cellular
 * - Notifications: Enabled
 * - ECG scale: 10.0 mm/mV (standard)
 * - Timezone: America/New_York
 * - Language: English
 * 
 * @example
 * const prefs = generateDefaultPreferences('user-123');
 */
export function generateDefaultPreferences(userId: string): UserPreferences {
  return {
    id: 'pref-001',
    userId,
    dataUploadPreference: 'wifi_cellular',
    notificationEnabled: true,
    ecgScaleSetting: 10.0,
    timezone: 'America/New_York',
    language: 'en'
  };
}

/**
 * Creates an active Holter study for demonstration
 * @param userId - User ID conducting the study
 * @returns Active 14-day Holter study at 64% completion (9 days)
 * 
 * Simulates a typical 14-day continuous monitoring study
 * Started 9 days ago, showing progress tracking capability
 * 
 * @example
 * const study = generateHolterStudy('user-123');
 * // Returns study 9 days into 14-day monitoring period
 */
export function generateHolterStudy(userId: string): HolterStudy {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 9); // Started 9 days ago
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 14); // 14-day study
  
  return {
    id: 'study-001',
    userId,
    studyName: '14-Day Holter Study',
    startDate,
    endDate,
    durationDays: 14,
    status: 'active',
    progressPercentage: 64,
    daysCompleted: 9,
    lastUpdated: new Date()
  };
}