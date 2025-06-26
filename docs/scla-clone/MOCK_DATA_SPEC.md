# SCLA Clone Mock Data Specification

## Overview

This document defines the comprehensive mock data architecture for the SCLA clone app. The mock data system is designed to simulate a complete backend, enabling full app functionality without external dependencies.

## Mock Data Architecture

### Core Principles
1. **Realistic Data**: Generate believable health data with proper variations and patterns
2. **Time-Series Continuity**: Historical data spanning 6 months with realistic progression
3. **Real-time Simulation**: Live ECG and device status updates
4. **Stateful Persistence**: All data persists across sessions using localStorage
5. **Expandability**: Easy to add new data types and patterns

### Data Generation Strategy

#### Static Data
- User profiles
- Predefined symptoms catalog
- Standard triggers list
- Device specifications

#### Dynamic Data
- Real-time ECG waveforms (250Hz sample rate)
- Device battery level changes
- Connection status fluctuations
- Sync progress updates

#### Historical Data
- 6 months of past symptoms
- Blood pressure readings with realistic daily variations
- ECG analysis results
- Holter study progress

## Data Models

### User Data
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  phoneNumber?: string;
  createdAt: Date;
  lastLogin: Date;
  isActive: boolean;
  emailVerified: boolean;
}

interface UserPreferences {
  id: string;
  userId: string;
  dataUploadPreference: 'wifi_only' | 'wifi_cellular';
  notificationEnabled: boolean;
  ecgScaleSetting: number; // mm/mV
  timezone: string;
  language: string;
}

// Mock data generator
function generateMockUser(): User {
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
```

### Device Data
```typescript
interface Device {
  id: string;
  serialNumber: string;
  deviceType: 'skiin_pod' | 'chestband';
  firmwareVersion: string;
  hardwareVersion: string;
  batteryLevel: number;
  connectionStatus: 'connected' | 'disconnected' | 'syncing' | 'pairing';
  lastSyncAt: Date;
  signalStrength: number; // -100 to 0 dBm
}

interface UserDevice {
  id: string;
  userId: string;
  deviceId: string;
  deviceName: string;
  pairedAt: Date;
  isPrimary: boolean;
}

// Available devices for pairing
const MOCK_AVAILABLE_DEVICES: Partial<Device>[] = [
  {
    serialNumber: '31067601890',
    deviceType: 'skiin_pod',
    signalStrength: -45,
    firmwareVersion: '18.0.9.1',
    hardwareVersion: '20'
  },
  {
    serialNumber: '31046900579',
    deviceType: 'skiin_pod',
    signalStrength: -62,
    firmwareVersion: '18.0.9.1',
    hardwareVersion: '20'
  },
  {
    serialNumber: '31048501123',
    deviceType: 'skiin_pod',
    signalStrength: -78,
    firmwareVersion: '18.0.8.5',
    hardwareVersion: '19'
  }
];
```

### Health Data Models
```typescript
interface ECGData {
  id: string;
  userId: string;
  deviceId: string;
  recordedAt: Date;
  durationSeconds: number;
  sampleRate: number; // 250 Hz
  channel1Data: number[];
  channel3Data: number[];
  signalQuality: {
    channel1: 'good' | 'poor' | 'no_signal';
    channel3: 'good' | 'poor' | 'no_signal';
  };
  heartRate: number;
  analysisStatus: 'pending' | 'analyzing' | 'completed' | 'failed';
}

interface Symptom {
  id: string;
  userId: string;
  symptomName: string;
  intensity: number; // 0-10
  experiencedAt: Date;
  durationType: 'ongoing' | 'intermittent';
  durationHours?: number;
  durationMinutes?: number;
  triggers: string[];
  notes?: string;
  analysisStatus: 'pending' | 'analyzing' | 'completed';
  reviewStatus: 'pending' | 'reviewed' | 'approved';
  ecgCorrelationId?: string;
}

interface BloodPressureReading {
  id: string;
  userId: string;
  measuredAt: Date;
  systolic1: number;
  diastolic1: number;
  systolic2?: number;
  diastolic2?: number;
  arm: 'left' | 'right';
  notes?: string;
}
```

### Clinical Data
```typescript
interface HolterStudy {
  id: string;
  userId: string;
  studyName: string;
  startDate: Date;
  endDate: Date;
  durationDays: number;
  status: 'active' | 'completed' | 'cancelled';
  progressPercentage: number;
  daysCompleted: number;
  lastUpdated: Date;
}

interface ECGAnalysis {
  id: string;
  ecgDataId: string;
  symptomId?: string;
  analysisType: 'automatic' | 'manual' | 'ai_assisted';
  findings: {
    rhythmType: string;
    averageHeartRate: number;
    minHeartRate: number;
    maxHeartRate: number;
    arrhythmias: string[];
    abnormalities: string[];
  };
  abnormalitiesDetected: boolean;
  confidenceScore: number; // 0.0 to 1.0
  analyzedAt: Date;
  status: 'pending_review' | 'reviewed' | 'approved';
}
```

## Mock Data Generators

### ECG Waveform Generator
```typescript
class ECGWaveformGenerator {
  private baselineVoltage = 0.0;
  private sampleRate = 250; // Hz
  private heartRate = 72; // BPM
  private signalQuality: 'good' | 'poor' | 'no_signal' = 'good';
  
  generateRealtimeData(): ECGRealtimeData {
    const samples = this.generateSamples(50); // 200ms of data
    
    return {
      timestamp: new Date(),
      channel1: this.addNoise(samples.channel1, this.signalQuality),
      channel3: this.addNoise(samples.channel3, this.signalQuality),
      heartRate: this.heartRate + (Math.random() - 0.5) * 4,
      signalQuality: {
        channel1: this.signalQuality,
        channel3: this.signalQuality
      }
    };
  }
  
  private generateSamples(count: number): { channel1: number[], channel3: number[] } {
    const channel1: number[] = [];
    const channel3: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const t = i / this.sampleRate;
      
      // Generate realistic ECG waveform (simplified PQRST complex)
      const ecgValue = this.generatePQRST(t);
      
      channel1.push(ecgValue);
      channel3.push(ecgValue * 0.8 + (Math.random() - 0.5) * 0.05);
    }
    
    return { channel1, channel3 };
  }
  
  private generatePQRST(t: number): number {
    const beatPeriod = 60 / this.heartRate;
    const phase = (t % beatPeriod) / beatPeriod;
    
    // Simplified ECG waveform generation
    if (phase < 0.1) {
      // P wave
      return 0.2 * Math.sin(phase * 10 * Math.PI);
    } else if (phase < 0.15) {
      // PR segment
      return 0;
    } else if (phase < 0.17) {
      // Q wave
      return -0.1;
    } else if (phase < 0.2) {
      // R wave
      return 1.2 * Math.sin((phase - 0.17) * 33.33 * Math.PI);
    } else if (phase < 0.22) {
      // S wave
      return -0.2;
    } else if (phase < 0.35) {
      // T wave
      return 0.3 * Math.sin((phase - 0.22) * 7.69 * Math.PI);
    } else {
      // Baseline
      return 0;
    }
  }
  
  private addNoise(data: number[], quality: string): number[] {
    if (quality === 'no_signal') {
      return data.map(() => Math.random() * 0.1 - 0.05);
    }
    
    const noiseLevel = quality === 'poor' ? 0.2 : 0.05;
    return data.map(v => v + (Math.random() - 0.5) * noiseLevel);
  }
  
  updateHeartRate(bpm: number) {
    this.heartRate = Math.max(40, Math.min(200, bpm));
  }
  
  updateSignalQuality(quality: 'good' | 'poor' | 'no_signal') {
    this.signalQuality = quality;
  }
}
```

### Symptom Data Generator
```typescript
const PREDEFINED_SYMPTOMS = [
  'Routine ECG', 'Fainting', 'Chest Pain / Discomfort',
  'Chest Discomfort During Exercise', 'Palpitations',
  'Shortness of Breath', 'Dizziness', 'Heart Pounding',
  'Fatigue (Physical)', 'Fatigue (Mental)', 'Insomnia',
  'Sweating', 'Wheezing Cough', 'Brain Fog'
];

const PREDEFINED_TRIGGERS = [
  'Alcohol', 'Caffeine', 'Nicotine', 'Not Sure',
  'Poor sleep', 'Strenuous exercise', 'Stress',
  'Large meal', 'Dehydration', 'Weather changes'
];

class SymptomGenerator {
  generateHistoricalSymptoms(userId: string, months: number): Symptom[] {
    const symptoms: Symptom[] = [];
    const now = new Date();
    
    for (let i = 0; i < months * 30; i++) {
      const daysAgo = Math.floor(Math.random() * months * 30);
      const date = new Date(now);
      date.setDate(date.getDate() - daysAgo);
      
      // Generate 0-3 symptoms per day with weighted probability
      const symptomCount = this.weightedRandom([0, 1, 2, 3], [0.6, 0.3, 0.08, 0.02]);
      
      for (let j = 0; j < symptomCount; j++) {
        symptoms.push(this.generateSymptom(userId, date));
      }
    }
    
    return symptoms.sort((a, b) => b.experiencedAt.getTime() - a.experiencedAt.getTime());
  }
  
  private generateSymptom(userId: string, date: Date): Symptom {
    const symptomName = this.randomChoice(PREDEFINED_SYMPTOMS);
    const triggerCount = Math.floor(Math.random() * 3) + 1;
    const triggers = this.randomSample(PREDEFINED_TRIGGERS, triggerCount);
    
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
      notes: Math.random() > 0.7 ? this.generateNote() : undefined,
      analysisStatus: analysisComplete ? 'completed' : 'pending',
      reviewStatus: analysisComplete && Math.random() > 0.3 ? 'reviewed' : 'pending'
    };
  }
  
  private generateNote(): string {
    const notes = [
      'Felt symptoms after morning coffee',
      'Symptoms started during exercise',
      'Woke up with this feeling',
      'Symptoms improved after resting',
      'Taking medication helped',
      'Symptoms worse than usual today'
    ];
    return this.randomChoice(notes);
  }
  
  private weightedRandom(values: number[], weights: number[]): number {
    const total = weights.reduce((a, b) => a + b, 0);
    const random = Math.random() * total;
    let cumulative = 0;
    
    for (let i = 0; i < values.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) return values[i];
    }
    
    return values[values.length - 1];
  }
  
  private randomChoice<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  private randomSample<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}
```

### Blood Pressure Generator
```typescript
class BloodPressureGenerator {
  generateHistoricalReadings(userId: string, months: number): BloodPressureReading[] {
    const readings: BloodPressureReading[] = [];
    const now = new Date();
    
    // Generate morning and evening readings
    for (let i = 0; i < months * 30; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Morning reading (60% chance)
      if (Math.random() < 0.6) {
        date.setHours(7 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60));
        readings.push(this.generateReading(userId, new Date(date), 'morning'));
      }
      
      // Evening reading (40% chance)
      if (Math.random() < 0.4) {
        date.setHours(18 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60));
        readings.push(this.generateReading(userId, new Date(date), 'evening'));
      }
    }
    
    return readings.sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime());
  }
  
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
```

### Device Status Simulator
```typescript
class DeviceStatusSimulator {
  private device: Device;
  private batteryDrainRate = 0.001; // % per minute
  private syncInterval = 15 * 60 * 1000; // 15 minutes
  private lastSync: Date;
  
  constructor(device: Device) {
    this.device = { ...device };
    this.lastSync = new Date();
  }
  
  update(): Device {
    const now = new Date();
    const timeSinceLastUpdate = now.getTime() - this.device.lastSyncAt.getTime();
    
    // Update battery level
    if (this.device.connectionStatus === 'connected') {
      const batteryDrain = (timeSinceLastUpdate / 60000) * this.batteryDrainRate;
      this.device.batteryLevel = Math.max(0, this.device.batteryLevel - batteryDrain);
    }
    
    // Simulate connection fluctuations
    if (Math.random() < 0.01) { // 1% chance per update
      this.device.connectionStatus = this.device.connectionStatus === 'connected' 
        ? 'disconnected' 
        : 'connected';
    }
    
    // Simulate sync cycles
    if (now.getTime() - this.lastSync.getTime() > this.syncInterval) {
      this.device.connectionStatus = 'syncing';
      setTimeout(() => {
        this.device.connectionStatus = 'connected';
        this.device.lastSyncAt = new Date();
      }, 5000); // 5 second sync
      this.lastSync = now;
    }
    
    // Simulate signal strength variations
    this.device.signalStrength = Math.max(-100, Math.min(0, 
      this.device.signalStrength + (Math.random() - 0.5) * 10
    ));
    
    return { ...this.device };
  }
  
  simulateCharging() {
    this.device.batteryLevel = 100;
    this.device.connectionStatus = 'disconnected';
  }
}
```

## Mock API Service

```typescript
class MockAPIService {
  private storage = new MockDataStorage();
  private ecgGenerator = new ECGWaveformGenerator();
  private symptomGenerator = new SymptomGenerator();
  private bpGenerator = new BloodPressureGenerator();
  private deviceSimulators = new Map<string, DeviceStatusSimulator>();
  
  // Authentication
  async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate network delay
    await this.delay(800);
    
    const user = this.storage.getUser();
    if (email === user.email && password === 'password123') {
      const session = {
        accessToken: this.generateToken(),
        refreshToken: this.generateToken(),
        expiresIn: 900, // 15 minutes
        user
      };
      this.storage.saveSession(session);
      return session;
    }
    
    throw new Error('Invalid credentials');
  }
  
  async loginWithQR(qrData: string): Promise<AuthResponse> {
    await this.delay(1000);
    // Simulate QR validation
    if (qrData.includes('valid')) {
      return this.login('john.doe@example.com', 'password123');
    }
    throw new Error('Invalid QR code');
  }
  
  async loginWithSixDigit(code: string): Promise<AuthResponse> {
    await this.delay(600);
    // Accept any 6-digit code for demo
    if (/^\d{6}$/.test(code)) {
      return this.login('john.doe@example.com', 'password123');
    }
    throw new Error('Invalid code');
  }
  
  // Device Management
  async discoverDevices(): Promise<Device[]> {
    await this.delay(2000); // Simulate BLE scanning
    return MOCK_AVAILABLE_DEVICES.map(d => ({
      ...d,
      id: `device-${d.serialNumber}`,
      batteryLevel: 75 + Math.floor(Math.random() * 25),
      connectionStatus: 'disconnected' as const,
      lastSyncAt: new Date()
    }));
  }
  
  async pairDevice(serialNumber: string, deviceName: string): Promise<UserDevice> {
    await this.delay(3000); // Simulate pairing process
    
    const device = MOCK_AVAILABLE_DEVICES.find(d => d.serialNumber === serialNumber);
    if (!device) throw new Error('Device not found');
    
    const fullDevice: Device = {
      id: `device-${serialNumber}`,
      ...device as Device,
      batteryLevel: 75,
      connectionStatus: 'connected',
      lastSyncAt: new Date()
    };
    
    const userDevice: UserDevice = {
      id: `user-device-${serialNumber}`,
      userId: this.storage.getUser().id,
      deviceId: fullDevice.id,
      deviceName,
      pairedAt: new Date(),
      isPrimary: true
    };
    
    this.storage.savePairedDevice(fullDevice, userDevice);
    
    // Start device simulation
    this.deviceSimulators.set(fullDevice.id, new DeviceStatusSimulator(fullDevice));
    
    return userDevice;
  }
  
  // Health Data
  async addSymptom(symptom: Omit<Symptom, 'id' | 'analysisStatus' | 'reviewStatus'>): Promise<Symptom> {
    await this.delay(500);
    
    const newSymptom: Symptom = {
      ...symptom,
      id: `symptom-${uuidv4()}`,
      analysisStatus: 'pending',
      reviewStatus: 'pending'
    };
    
    this.storage.addSymptom(newSymptom);
    
    // Simulate analysis after 5 seconds
    setTimeout(() => {
      newSymptom.analysisStatus = 'analyzing';
      this.storage.updateSymptom(newSymptom);
      
      setTimeout(() => {
        newSymptom.analysisStatus = 'completed';
        this.storage.updateSymptom(newSymptom);
      }, 10000);
    }, 5000);
    
    return newSymptom;
  }
  
  async addBloodPressure(reading: Omit<BloodPressureReading, 'id'>): Promise<BloodPressureReading> {
    await this.delay(400);
    
    const newReading: BloodPressureReading = {
      ...reading,
      id: `bp-${uuidv4()}`
    };
    
    this.storage.addBloodPressure(newReading);
    return newReading;
  }
  
  // Real-time Data
  subscribeToECG(callback: (data: ECGRealtimeData) => void): () => void {
    const interval = setInterval(() => {
      const data = this.ecgGenerator.generateRealtimeData();
      callback(data);
    }, 200); // 5Hz updates (each containing 50 samples at 250Hz)
    
    return () => clearInterval(interval);
  }
  
  subscribeToDeviceStatus(deviceId: string, callback: (device: Device) => void): () => void {
    const simulator = this.deviceSimulators.get(deviceId);
    if (!simulator) throw new Error('Device not found');
    
    const interval = setInterval(() => {
      const device = simulator.update();
      this.storage.updateDevice(device);
      callback(device);
    }, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }
  
  // Diary
  async getDiaryEntries(date: Date): Promise<DiaryEntry[]> {
    await this.delay(300);
    
    const symptoms = this.storage.getSymptomsByDate(date);
    const bpReadings = this.storage.getBloodPressureByDate(date);
    
    const entries: DiaryEntry[] = [
      ...symptoms.map(s => ({
        id: s.id,
        type: 'symptom' as const,
        timestamp: s.experiencedAt,
        data: s
      })),
      ...bpReadings.map(bp => ({
        id: bp.id,
        type: 'blood_pressure' as const,
        timestamp: bp.measuredAt,
        data: bp
      }))
    ];
    
    return entries.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }
  
  // Settings
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    await this.delay(200);
    return this.storage.updatePreferences(preferences);
  }
  
  async addCustomSymptom(name: string): Promise<void> {
    await this.delay(200);
    this.storage.addCustomSymptom(name);
  }
  
  async addCustomTrigger(name: string): Promise<void> {
    await this.delay(200);
    this.storage.addCustomTrigger(name);
  }
  
  async deleteCustomTrigger(id: string): Promise<void> {
    await this.delay(200);
    this.storage.deleteCustomTrigger(id);
  }
  
  // Holter Study
  getHolterStudyProgress(): HolterStudy {
    const study = this.storage.getHolterStudy();
    const now = new Date();
    const elapsed = now.getTime() - study.startDate.getTime();
    const totalDuration = study.endDate.getTime() - study.startDate.getTime();
    
    study.progressPercentage = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
    study.daysCompleted = Math.floor(elapsed / (24 * 60 * 60 * 1000));
    study.lastUpdated = now;
    
    return study;
  }
  
  // Utilities
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  private generateToken(): string {
    return btoa(Math.random().toString(36).substring(2) + Date.now().toString(36));
  }
}

// Helper function for UUID generation
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
```

## Data Persistence Layer

```typescript
class MockDataStorage {
  private readonly STORAGE_KEY = 'scla_mock_data';
  
  constructor() {
    this.initializeData();
  }
  
  private initializeData() {
    if (!this.getData()) {
      const user = this.generateInitialUser();
      const symptoms = new SymptomGenerator().generateHistoricalSymptoms(user.id, 6);
      const bpReadings = new BloodPressureGenerator().generateHistoricalReadings(user.id, 6);
      const holterStudy = this.generateHolterStudy(user.id);
      
      const initialData = {
        user,
        preferences: this.generateDefaultPreferences(user.id),
        symptoms,
        bloodPressureReadings: bpReadings,
        devices: [],
        userDevices: [],
        customSymptoms: [],
        customTriggers: [],
        holterStudy,
        session: null
      };
      
      this.saveData(initialData);
    }
  }
  
  private getData(): MockDataStore | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return null;
    
    try {
      const parsed = JSON.parse(data);
      // Convert date strings back to Date objects
      return this.reviveDates(parsed);
    } catch {
      return null;
    }
  }
  
  private saveData(data: MockDataStore) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
  
  private reviveDates(obj: any): any {
    if (obj === null || obj === undefined) return obj;
    if (obj instanceof Date) return obj;
    if (typeof obj === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
      return new Date(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.reviveDates(item));
    }
    if (typeof obj === 'object') {
      const revived: any = {};
      for (const key in obj) {
        revived[key] = this.reviveDates(obj[key]);
      }
      return revived;
    }
    return obj;
  }
  
  private generateInitialUser(): User {
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
  
  private generateDefaultPreferences(userId: string): UserPreferences {
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
  
  private generateHolterStudy(userId: string): HolterStudy {
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
  
  // Public methods for data access
  getUser(): User {
    return this.getData()!.user;
  }
  
  getPreferences(): UserPreferences {
    return this.getData()!.preferences;
  }
  
  updatePreferences(updates: Partial<UserPreferences>): UserPreferences {
    const data = this.getData()!;
    data.preferences = { ...data.preferences, ...updates };
    this.saveData(data);
    return data.preferences;
  }
  
  saveSession(session: AuthSession) {
    const data = this.getData()!;
    data.session = session;
    this.saveData(data);
  }
  
  getSession(): AuthSession | null {
    return this.getData()!.session;
  }
  
  clearSession() {
    const data = this.getData()!;
    data.session = null;
    this.saveData(data);
  }
  
  savePairedDevice(device: Device, userDevice: UserDevice) {
    const data = this.getData()!;
    data.devices.push(device);
    data.userDevices.push(userDevice);
    this.saveData(data);
  }
  
  updateDevice(device: Device) {
    const data = this.getData()!;
    const index = data.devices.findIndex(d => d.id === device.id);
    if (index >= 0) {
      data.devices[index] = device;
      this.saveData(data);
    }
  }
  
  getPairedDevices(): Array<Device & UserDevice> {
    const data = this.getData()!;
    return data.userDevices.map(ud => {
      const device = data.devices.find(d => d.id === ud.deviceId)!;
      return { ...device, ...ud };
    });
  }
  
  addSymptom(symptom: Symptom) {
    const data = this.getData()!;
    data.symptoms.push(symptom);
    this.saveData(data);
  }
  
  updateSymptom(symptom: Symptom) {
    const data = this.getData()!;
    const index = data.symptoms.findIndex(s => s.id === symptom.id);
    if (index >= 0) {
      data.symptoms[index] = symptom;
      this.saveData(data);
    }
  }
  
  deleteSymptom(id: string) {
    const data = this.getData()!;
    data.symptoms = data.symptoms.filter(s => s.id !== id);
    this.saveData(data);
  }
  
  getSymptomsByDate(date: Date): Symptom[] {
    const data = this.getData()!;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return data.symptoms.filter(s => 
      s.experiencedAt >= startOfDay && s.experiencedAt <= endOfDay
    );
  }
  
  addBloodPressure(reading: BloodPressureReading) {
    const data = this.getData()!;
    data.bloodPressureReadings.push(reading);
    this.saveData(data);
  }
  
  getBloodPressureByDate(date: Date): BloodPressureReading[] {
    const data = this.getData()!;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return data.bloodPressureReadings.filter(bp => 
      bp.measuredAt >= startOfDay && bp.measuredAt <= endOfDay
    );
  }
  
  addCustomSymptom(name: string) {
    const data = this.getData()!;
    data.customSymptoms.push({
      id: `custom-symptom-${uuidv4()}`,
      name,
      createdAt: new Date()
    });
    this.saveData(data);
  }
  
  getCustomSymptoms(): CustomSymptom[] {
    return this.getData()!.customSymptoms;
  }
  
  addCustomTrigger(name: string) {
    const data = this.getData()!;
    data.customTriggers.push({
      id: `custom-trigger-${uuidv4()}`,
      name,
      createdAt: new Date()
    });
    this.saveData(data);
  }
  
  getCustomTriggers(): CustomTrigger[] {
    return this.getData()!.customTriggers;
  }
  
  deleteCustomTrigger(id: string) {
    const data = this.getData()!;
    data.customTriggers = data.customTriggers.filter(t => t.id !== id);
    this.saveData(data);
  }
  
  getHolterStudy(): HolterStudy {
    return this.getData()!.holterStudy;
  }
}

interface MockDataStore {
  user: User;
  preferences: UserPreferences;
  symptoms: Symptom[];
  bloodPressureReadings: BloodPressureReading[];
  devices: Device[];
  userDevices: UserDevice[];
  customSymptoms: CustomSymptom[];
  customTriggers: CustomTrigger[];
  holterStudy: HolterStudy;
  session: AuthSession | null;
}

interface CustomSymptom {
  id: string;
  name: string;
  createdAt: Date;
}

interface CustomTrigger {
  id: string;
  name: string;
  createdAt: Date;
}

interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

interface DiaryEntry {
  id: string;
  type: 'symptom' | 'blood_pressure';
  timestamp: Date;
  data: Symptom | BloodPressureReading;
}

interface ECGRealtimeData {
  timestamp: Date;
  channel1: number[];
  channel3: number[];
  heartRate: number;
  signalQuality: {
    channel1: 'good' | 'poor' | 'no_signal';
    channel3: 'good' | 'poor' | 'no_signal';
  };
}
```

## Usage Example

```typescript
// Initialize the mock API service
const mockAPI = new MockAPIService();

// Authentication
const authResponse = await mockAPI.login('john.doe@example.com', 'password123');
console.log('Logged in:', authResponse.user);

// Device pairing
const availableDevices = await mockAPI.discoverDevices();
const pairedDevice = await mockAPI.pairDevice(availableDevices[0].serialNumber, 'My Skiin Pod');

// Subscribe to real-time ECG data
const unsubscribeECG = mockAPI.subscribeToECG((data) => {
  console.log('ECG Update:', data);
  // Update ECG visualization
});

// Subscribe to device status
const unsubscribeDevice = mockAPI.subscribeToDeviceStatus(pairedDevice.deviceId, (device) => {
  console.log('Device Status:', device);
  // Update UI with battery level, connection status
});

// Add a symptom
const symptom = await mockAPI.addSymptom({
  userId: authResponse.user.id,
  symptomName: 'Brain Fog',
  intensity: 5,
  experiencedAt: new Date(),
  durationType: 'ongoing',
  triggers: ['Caffeine', 'Not Sure'],
  notes: 'Felt foggy after morning coffee'
});

// Get diary entries
const diaryEntries = await mockAPI.getDiaryEntries(new Date());
console.log('Today\'s entries:', diaryEntries);

// Clean up subscriptions
unsubscribeECG();
unsubscribeDevice();
```

## Testing Scenarios

### Normal Operation
1. User logs in successfully
2. Device pairs and connects
3. Good ECG signal quality
4. Regular symptom and BP logging
5. Holter study progressing normally

### Edge Cases
1. Poor signal quality simulation
2. Device disconnection and reconnection
3. Low battery warnings
4. Failed analysis scenarios
5. Network timeout simulation

### Data Variations
1. Different times of day for BP readings
2. Varying symptom intensities and triggers
3. Custom symptoms and triggers
4. Different ECG patterns (normal, arrhythmia)
5. Progressive Holter study completion

This comprehensive mock data system provides a fully functional backend simulation that enables complete app development and testing without external dependencies.