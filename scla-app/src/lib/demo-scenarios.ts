import { mockAPI } from '@/mock/api';
import type { Symptom, BloodPressureReading } from '@/types';

export type DemoScenario = 'new-user' | 'active-user' | 'critical-alert' | 'study-complete';

export class DemoManager {
  private static instance: DemoManager;
  private currentScenario: DemoScenario = 'active-user';

  private constructor() {}

  static getInstance(): DemoManager {
    if (!DemoManager.instance) {
      DemoManager.instance = new DemoManager();
    }
    return DemoManager.instance;
  }

  async activateScenario(scenario: DemoScenario) {
    this.currentScenario = scenario;
    
    // Clear existing data
    localStorage.clear();
    
    // Set up scenario-specific data
    switch (scenario) {
      case 'new-user':
        await this.setupNewUserScenario();
        break;
      case 'active-user':
        await this.setupActiveUserScenario();
        break;
      case 'critical-alert':
        await this.setupCriticalAlertScenario();
        break;
      case 'study-complete':
        await this.setupStudyCompleteScenario();
        break;
    }
  }

  private async setupNewUserScenario() {
    // Fresh user with no data
    console.log('Demo: New user scenario activated');
  }

  private async setupActiveUserScenario() {
    // User with 30 days of varied data
    const user = await mockAPI.getCurrentUser();
    if (!user) return;

    // Add variety of symptoms over past 30 days
    const symptoms = [
      { name: 'Chest Pain', intensity: 3, daysAgo: 1 },
      { name: 'Fatigue', intensity: 5, daysAgo: 2 },
      { name: 'Palpitations', intensity: 7, daysAgo: 3 },
      { name: 'Shortness of Breath', intensity: 4, daysAgo: 5 },
      { name: 'Dizziness', intensity: 6, daysAgo: 7 },
      { name: 'Chest Pain', intensity: 8, daysAgo: 10 },
      { name: 'Anxiety', intensity: 5, daysAgo: 12 },
      { name: 'Headache', intensity: 4, daysAgo: 15 },
      { name: 'Palpitations', intensity: 6, daysAgo: 20 },
      { name: 'Fatigue', intensity: 7, daysAgo: 25 },
    ];

    for (const symptom of symptoms) {
      const date = new Date();
      date.setDate(date.getDate() - symptom.daysAgo);
      
      await mockAPI.addSymptom(
        symptom.name,
        symptom.intensity,
        ['Stress', 'Physical Activity'],
        30,
        'Demo symptom entry'
      );
    }

    // Add blood pressure readings
    const bpReadings = [
      { systolic: 118, diastolic: 78, daysAgo: 0 },
      { systolic: 122, diastolic: 80, daysAgo: 1 },
      { systolic: 125, diastolic: 82, daysAgo: 3 },
      { systolic: 130, diastolic: 85, daysAgo: 5 },
      { systolic: 128, diastolic: 83, daysAgo: 7 },
      { systolic: 135, diastolic: 88, daysAgo: 10 },
      { systolic: 132, diastolic: 86, daysAgo: 14 },
      { systolic: 120, diastolic: 79, daysAgo: 20 },
    ];

    for (const bp of bpReadings) {
      await mockAPI.addBloodPressureReading(
        bp.systolic,
        bp.diastolic,
        72,
        'left'
      );
    }

    console.log('Demo: Active user scenario activated');
  }

  private async setupCriticalAlertScenario() {
    // Set up data that triggers alerts
    await this.setupActiveUserScenario();
    
    // Add critical symptom
    await mockAPI.addSymptom(
      'Chest Pain',
      9,
      ['Physical Activity', 'Stress'],
      60,
      'Severe chest pain with shortness of breath'
    );

    // Add high BP reading
    await mockAPI.addBloodPressureReading(
      180,
      110,
      95,
      'right'
    );

    console.log('Demo: Critical alert scenario activated');
  }

  private async setupStudyCompleteScenario() {
    // Simulate completed 14-day Holter study
    await this.setupActiveUserScenario();
    
    // Update device to show high usage
    const devices = await mockAPI.discoverDevices();
    if (devices.length > 0) {
      // Simulate 14 days of ECG data collection
      console.log('Demo: Study complete scenario activated');
    }
  }

  getCurrentScenario(): DemoScenario {
    return this.currentScenario;
  }

  // Helper to add realistic time-based data
  async addTimeBasedSymptom() {
    const hour = new Date().getHours();
    let symptom = 'Fatigue';
    let intensity = 3;
    
    if (hour >= 6 && hour < 9) {
      // Morning - lower intensity
      symptom = 'Fatigue';
      intensity = 4;
    } else if (hour >= 12 && hour < 14) {
      // After lunch
      symptom = 'Drowsiness';
      intensity = 5;
    } else if (hour >= 18 && hour < 20) {
      // Evening - stress from day
      symptom = 'Headache';
      intensity = 6;
    } else if (hour >= 22) {
      // Late night
      symptom = 'Fatigue';
      intensity = 7;
    }

    await mockAPI.addSymptom(symptom, intensity, [], 0, 'Auto-generated demo symptom');
  }
}

export const demoManager = DemoManager.getInstance();