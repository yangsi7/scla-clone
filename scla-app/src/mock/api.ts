import { 
  AuthSession, 
  Device, 
  UserDevice, 
  Symptom, 
  BloodPressureReading,
  DiaryEntry,
  UserPreferences,
  HolterStudy,
  ECGRealtimeData
} from '@/types';
import { MockDataStorage } from './storage';
import { ECGWaveformGenerator } from './ecgGenerator';
import { DeviceStatusSimulator } from './deviceSimulator';
import { MOCK_AVAILABLE_DEVICES } from './constants';
import { uuidv4, delay } from './utils';

/**
 * Complete mock API service simulating SCLA backend
 * 
 * @class MockAPIService
 * @description This is the main entry point for all mock data operations in the SCLA app.
 * It simulates a complete backend API with realistic delays, error handling, and data persistence.
 * The service manages authentication, device pairing, health data, real-time streaming, and more.
 * 
 * Key features:
 * - Multiple authentication methods (email/password, QR code, 6-digit code)
 * - Bluetooth device discovery and pairing simulation
 * - Real-time ECG data streaming at 250Hz
 * - Automatic symptom analysis simulation
 * - Device status monitoring with battery drain
 * - Session management with expiration
 * 
 * @example
 * import { mockAPI } from '@/mock/api';
 * 
 * // Login
 * const session = await mockAPI.login('john.doe@example.com', 'password123');
 * 
 * // Discover devices
 * const devices = await mockAPI.discoverDevices();
 * 
 * // Subscribe to ECG data
 * const unsubscribe = mockAPI.subscribeToECG((data) => {
 *   console.log('ECG data:', data);
 * });
 */
class MockAPIService {
  private storage = new MockDataStorage();
  private ecgGenerator = new ECGWaveformGenerator();
  private deviceSimulators = new Map<string, DeviceStatusSimulator>();
  
  // Authentication
  
  /**
   * Authenticates user with email and password
   * @param email - User email address
   * @param password - User password (demo accepts 'password123')
   * @returns Authentication session with tokens and user data
   * @throws Error if credentials are invalid
   * 
   * Demo credentials: john.doe@example.com / password123
   * Session expires after 15 minutes
   */
  async login(email: string, password: string): Promise<AuthSession> {
    // Simulate network delay
    await delay(800);
    
    const user = this.storage.getUser();
    if (email === user.email && password === 'password123') {
      const session: AuthSession = {
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
  
  /**
   * Authenticates user with QR code scan
   * @param qrData - QR code data string
   * @returns Authentication session
   * @throws Error if QR code is invalid
   * 
   * For demo: QR data must contain 'valid' to succeed
   * Simulates clinic/provider QR code authentication
   */
  async loginWithQR(qrData: string): Promise<AuthSession> {
    await delay(1000);
    // Simulate QR validation
    if (qrData.includes('valid')) {
      return this.login('john.doe@example.com', 'password123');
    }
    throw new Error('Invalid QR code');
  }
  
  /**
   * Authenticates user with 6-digit code
   * @param code - Six digit authentication code
   * @returns Authentication session
   * @throws Error if code format is invalid
   * 
   * Accepts any 6-digit code for demo purposes
   * Simulates SMS or email verification code login
   */
  async loginWithSixDigit(code: string): Promise<AuthSession> {
    await delay(600);
    // Accept any 6-digit code for demo
    if (/^\d{6}$/.test(code)) {
      return this.login('john.doe@example.com', 'password123');
    }
    throw new Error('Invalid code');
  }
  
  /**
   * Logs out current user and clears session
   * Removes authentication tokens from storage
   */
  async logout(): Promise<void> {
    await delay(200);
    this.storage.clearSession();
  }
  
  // Device Management
  
  /**
   * Discovers available SKIIN devices via Bluetooth
   * @returns Array of discovered devices with signal strength
   * 
   * Simulates BLE scanning with 2-second delay
   * Returns 3 mock devices with varying signal strengths
   * Each device has randomized battery level (75-100%)
   */
  async discoverDevices(): Promise<Device[]> {
    await delay(2000); // Simulate BLE scanning
    return MOCK_AVAILABLE_DEVICES.map(d => ({
      ...d,
      id: `device-${d.serialNumber}`,
      batteryLevel: 75 + Math.floor(Math.random() * 25),
      connectionStatus: 'disconnected' as const,
      lastSyncAt: new Date()
    } as Device));
  }
  
  /**
   * Pairs a discovered device with user account
   * @param serialNumber - Device serial number
   * @param deviceName - User-assigned nickname for device
   * @returns User device association record
   * @throws Error if device not found
   * 
   * Simulates 3-second Bluetooth pairing process
   * Starts device status monitoring after pairing
   * Device begins at 75% battery when paired
   */
  async pairDevice(serialNumber: string, deviceName: string): Promise<UserDevice> {
    await delay(3000); // Simulate pairing process
    
    const device = MOCK_AVAILABLE_DEVICES.find(d => d.serialNumber === serialNumber);
    if (!device) throw new Error('Device not found');
    
    const fullDevice: Device = {
      id: `device-${serialNumber}`,
      serialNumber: device.serialNumber!,
      deviceType: device.deviceType!,
      firmwareVersion: device.firmwareVersion!,
      hardwareVersion: device.hardwareVersion!,
      batteryLevel: 75,
      connectionStatus: 'connected',
      lastSyncAt: new Date(),
      signalStrength: device.signalStrength!
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
  
  /**
   * Unpairs device from user account
   * @param deviceId - ID of device to unpair
   * 
   * Removes device association and stops status monitoring
   */
  async unpairDevice(deviceId: string): Promise<void> {
    await delay(500);
    this.storage.unpairDevice(deviceId);
    this.deviceSimulators.delete(deviceId);
  }
  
  /**
   * Gets all devices paired to current user
   * @returns Array of devices with user settings merged
   * 
   * Combines device hardware info with user preferences
   * Includes nickname, pairing date, and primary status
   */
  async getPairedDevices(): Promise<Array<Device & UserDevice>> {
    await delay(300);
    return this.storage.getPairedDevices();
  }
  
  // Health Data
  
  /**
   * Records a new symptom entry
   * @param symptom - Symptom data without system-generated fields
   * @returns Complete symptom record with ID and status
   * 
   * Automatically triggers analysis simulation:
   * - Pending for 5 seconds
   * - Analyzing for 10 seconds
   * - Then marked as completed
   * 
   * @example
   * const symptom = await mockAPI.addSymptom({
   *   userId: 'user-123',
   *   symptomName: 'Chest Pain',
   *   intensity: 6,
   *   experiencedAt: new Date(),
   *   durationType: 'intermittent',
   *   durationMinutes: 30,
   *   triggers: ['Stress', 'Caffeine']
   * });
   */
  async addSymptom(symptom: Omit<Symptom, 'id' | 'analysisStatus' | 'reviewStatus'>): Promise<Symptom> {
    await delay(500);
    
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
  
  /**
   * Updates existing symptom entry
   * @param symptom - Updated symptom data
   * @returns Updated symptom record
   * 
   * Used for editing symptom details or updating analysis status
   */
  async updateSymptom(symptom: Symptom): Promise<Symptom> {
    await delay(400);
    this.storage.updateSymptom(symptom);
    return symptom;
  }
  
  /**
   * Deletes a symptom entry
   * @param id - Symptom ID to delete
   * 
   * Permanently removes from user's health log
   */
  async deleteSymptom(id: string): Promise<void> {
    await delay(300);
    this.storage.deleteSymptom(id);
  }
  
  /**
   * Records a blood pressure measurement
   * @param reading - BP data without ID
   * @returns Complete BP record with generated ID
   * 
   * @example
   * const bp = await mockAPI.addBloodPressure({
   *   userId: 'user-123',
   *   measuredAt: new Date(),
   *   systolic1: 120,
   *   diastolic1: 80,
   *   arm: 'left'
   * });
   */
  async addBloodPressure(reading: Omit<BloodPressureReading, 'id'>): Promise<BloodPressureReading> {
    await delay(400);
    
    const newReading: BloodPressureReading = {
      ...reading,
      id: `bp-${uuidv4()}`
    };
    
    this.storage.addBloodPressure(newReading);
    return newReading;
  }
  
  // Real-time Data
  
  /**
   * Subscribes to real-time ECG data stream
   * @param callback - Function called with ECG data updates
   * @returns Unsubscribe function to stop streaming
   * 
   * Streams at 5Hz (200ms intervals)
   * Each update contains 50 samples at 250Hz
   * Simulates dual-channel ECG with PQRST complexes
   * 
   * @example
   * const unsubscribe = mockAPI.subscribeToECG((data) => {
   *   console.log('Channel 1:', data.channel1);
   *   console.log('Heart rate:', data.heartRate);
   * });
   * 
   * // Later: unsubscribe();
   */
  subscribeToECG(callback: (data: ECGRealtimeData) => void): () => void {
    const interval = setInterval(() => {
      const data = this.ecgGenerator.generateRealtimeData();
      callback(data);
    }, 200); // 5Hz updates (each containing 50 samples at 250Hz)
    
    return () => clearInterval(interval);
  }
  
  /**
   * Subscribes to device status updates
   * @param deviceId - Device to monitor
   * @param callback - Function called with device updates
   * @returns Unsubscribe function
   * @throws Error if device not found
   * 
   * Updates every 5 seconds with:
   * - Battery level changes
   * - Connection status
   * - Signal strength variations
   * - Sync cycle progress
   */
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
  
  /**
   * Gets all health entries for a specific date
   * @param date - Date to query (time ignored)
   * @returns Array of diary entries sorted by time (newest first)
   * 
   * Combines symptoms and blood pressure readings
   * Used by calendar/diary views to show daily health data
   */
  async getDiaryEntries(date: Date): Promise<DiaryEntry[]> {
    await delay(300);
    
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
  
  /**
   * Gets current user preferences
   * @returns User preferences for app settings
   */
  async getPreferences(): Promise<UserPreferences> {
    await delay(200);
    return this.storage.getPreferences();
  }
  
  /**
   * Updates user preferences
   * @param preferences - Partial preferences to update
   * @returns Complete updated preferences
   */
  async updatePreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    await delay(200);
    return this.storage.updatePreferences(preferences);
  }
  
  /**
   * Adds user-defined custom symptom
   * @param name - Name of custom symptom
   * 
   * Allows tracking symptoms not in predefined list
   */
  async addCustomSymptom(name: string): Promise<void> {
    await delay(200);
    this.storage.addCustomSymptom(name);
  }
  
  /**
   * Adds user-defined custom trigger
   * @param name - Name of custom trigger
   * 
   * Allows tracking personal symptom triggers
   */
  async addCustomTrigger(name: string): Promise<void> {
    await delay(200);
    this.storage.addCustomTrigger(name);
  }
  
  /**
   * Deletes custom trigger
   * @param id - Trigger ID to delete
   */
  async deleteCustomTrigger(id: string): Promise<void> {
    await delay(200);
    this.storage.deleteCustomTrigger(id);
  }
  
  /**
   * Gets all user-created custom symptoms
   * @returns Array of custom symptoms
   */
  async getCustomSymptoms() {
    await delay(100);
    return this.storage.getCustomSymptoms();
  }
  
  /**
   * Gets all user-created custom triggers
   * @returns Array of custom triggers
   */
  async getCustomTriggers() {
    await delay(100);
    return this.storage.getCustomTriggers();
  }
  
  // Holter Study
  
  /**
   * Gets current Holter study progress
   * @returns Holter study with real-time progress calculation
   * 
   * Automatically calculates:
   * - Progress percentage
   * - Days completed
   * - Study status
   */
  async getHolterStudyProgress(): Promise<HolterStudy> {
    await delay(200);
    return this.storage.getHolterStudy();
  }
  
  // Session management
  
  /**
   * Validates current session and checks expiration
   * @returns Valid session or null if expired/missing
   * 
   * Sessions expire after 15 minutes (900 seconds)
   * Automatically clears expired sessions
   */
  async checkSession(): Promise<AuthSession | null> {
    const session = this.storage.getSession();
    if (!session) return null;
    
    // Check if session is expired
    const now = Date.now();
    const sessionCreated = new Date(session.user.lastLogin).getTime();
    const expiresAt = sessionCreated + (session.expiresIn * 1000);
    
    if (now > expiresAt) {
      this.storage.clearSession();
      return null;
    }
    
    return session;
  }
  
  // Utilities
  
  /**
   * Generates a secure-looking token for authentication
   * @private
   * @returns Base64 encoded random token
   */
  private generateToken(): string {
    return btoa(Math.random().toString(36).substring(2) + Date.now().toString(36));
  }
}

/**
 * Singleton instance of mock API service
 * @constant mockAPI
 * @description Import this to access all mock API functionality
 * 
 * @example
 * import { mockAPI } from '@/mock/api';
 * 
 * // Use anywhere in the app
 * const devices = await mockAPI.discoverDevices();
 */
export const mockAPI = new MockAPIService();