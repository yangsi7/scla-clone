// User and Authentication Types
export interface User {
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

export interface UserPreferences {
  id: string;
  userId: string;
  dataUploadPreference: 'wifi_only' | 'wifi_cellular';
  notificationEnabled: boolean;
  ecgScaleSetting: number; // mm/mV
  timezone: string;
  language: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

// Device Types
export interface Device {
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

export interface UserDevice {
  id: string;
  userId: string;
  deviceId: string;
  deviceName: string;
  pairedAt: Date;
  isPrimary: boolean;
}

// Health Data Types
export interface ECGData {
  id: string;
  userId: string;
  deviceId: string;
  recordedAt: Date;
  durationSeconds: number;
  sampleRate: number; // 250 Hz
  channel1Data: number[];
  channel3Data: number[];
  signalQuality: {
    channel1: SignalQuality;
    channel3: SignalQuality;
  };
  heartRate: number;
  analysisStatus: AnalysisStatus;
}

export type SignalQuality = 'good' | 'poor' | 'no_signal';
export type AnalysisStatus = 'pending' | 'analyzing' | 'completed' | 'failed';
export type ReviewStatus = 'pending' | 'reviewed' | 'approved';

export interface Symptom {
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
  analysisStatus: AnalysisStatus;
  reviewStatus: ReviewStatus;
  ecgCorrelationId?: string;
}

export interface BloodPressureReading {
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

// Clinical Data Types
export interface HolterStudy {
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

export interface ECGAnalysis {
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
  status: ReviewStatus;
}

// Custom Data Types
export interface CustomSymptom {
  id: string;
  name: string;
  createdAt: Date;
}

export interface CustomTrigger {
  id: string;
  name: string;
  createdAt: Date;
}

// UI Types
export interface DiaryEntry {
  id: string;
  type: 'symptom' | 'blood_pressure';
  timestamp: Date;
  data: Symptom | BloodPressureReading;
}

export interface ECGRealtimeData {
  timestamp: Date;
  channel1: number[];
  channel3: number[];
  heartRate: number;
  signalQuality: {
    channel1: SignalQuality;
    channel3: SignalQuality;
  };
}

// Navigation Types
export type TabName = 'home' | 'log' | 'diary';

export interface NavigationState {
  currentTab: TabName;
  previousScreen?: string;
}

// Form Types
export interface SymptomFormData {
  symptomName: string;
  intensity: number;
  experiencedAt: Date;
  triggers: string[];
  durationType: 'ongoing' | 'intermittent';
  durationHours?: number;
  durationMinutes?: number;
  notes: string;
}

export interface BloodPressureFormData {
  measuredAt: Date;
  systolic1: number;
  diastolic1: number;
  systolic2?: number;
  diastolic2?: number;
  notes?: string;
}