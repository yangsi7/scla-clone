import { Device } from '@/types';

/**
 * Predefined symptoms available in the SCLA app
 * These appear as buttons in the symptom selection screen
 * Based on screenshots and documentation analysis
 */
export const PREDEFINED_SYMPTOMS = [
  'Routine ECG', 
  'Fainting', 
  'Chest Pain / Discomfort',
  'Chest Discomfort During Exercise', 
  'Palpitations',
  'Shortness of Breath', 
  'Dizziness', 
  'Heart Pounding',
  'Fatigue (Physical)', 
  'Fatigue (Mental)', 
  'Insomnia',
  'Sweating', 
  'Wheezing Cough', 
  'Brain Fog'
];

/**
 * Predefined triggers that can be associated with symptoms
 * Users can select multiple triggers for each symptom
 * "Not Sure" is a common option when triggers are unknown
 */
export const PREDEFINED_TRIGGERS = [
  'Alcohol', 
  'Caffeine', 
  'Nicotine', 
  'Not Sure',
  'Poor sleep', 
  'Strenuous exercise', 
  'Stress',
  'Large meal', 
  'Dehydration', 
  'Weather changes'
];

/**
 * Mock SKIIN devices available for Bluetooth pairing
 * These simulate real devices that would be discovered during BLE scanning
 * Signal strength in dBm (-100 to 0, where -45 is excellent, -78 is poor)
 */
export const MOCK_AVAILABLE_DEVICES: Partial<Device>[] = [
  {
    serialNumber: '31067601890',
    deviceType: 'skiin_pod',
    signalStrength: -45, // Excellent signal
    firmwareVersion: '18.0.9.1',
    hardwareVersion: '20'
  },
  {
    serialNumber: '31046900579',
    deviceType: 'skiin_pod',
    signalStrength: -62, // Good signal
    firmwareVersion: '18.0.9.1',
    hardwareVersion: '20'
  },
  {
    serialNumber: '31048501123',
    deviceType: 'skiin_pod',
    signalStrength: -78, // Poor signal
    firmwareVersion: '18.0.8.5',
    hardwareVersion: '19'
  }
];

/**
 * Common notes that users might add to their symptom entries
 * Used to generate realistic historical data
 * Randomly selected when creating mock symptom entries
 */
export const SYMPTOM_NOTES = [
  'Felt symptoms after morning coffee',
  'Symptoms started during exercise',
  'Woke up with this feeling',
  'Symptoms improved after resting',
  'Taking medication helped',
  'Symptoms worse than usual today'
];