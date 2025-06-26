import { 
  User, 
  UserPreferences, 
  Symptom, 
  BloodPressureReading, 
  Device, 
  UserDevice, 
  HolterStudy, 
  AuthSession,
  CustomSymptom,
  CustomTrigger
} from '@/types';
import { 
  SymptomGenerator, 
  BloodPressureGenerator,
  generateInitialUser,
  generateDefaultPreferences,
  generateHolterStudy
} from './dataGenerators';
import { uuidv4 } from './utils';

/**
 * Complete data structure for mock backend storage
 * @interface MockDataStore
 * @description Contains all data entities for the SCLA app mock system
 */
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

/**
 * Manages persistent storage for all mock data using localStorage
 * 
 * @class MockDataStorage
 * @description This class provides a complete data persistence layer for the mock system.
 * It handles initialization with realistic data, date serialization/deserialization,
 * and provides methods for all CRUD operations. Data persists across browser sessions.
 * 
 * @example
 * const storage = new MockDataStorage();
 * 
 * // Get user data
 * const user = storage.getUser();
 * 
 * // Add a symptom
 * storage.addSymptom(newSymptom);
 * 
 * // Update device status
 * storage.updateDevice(updatedDevice);
 */
export class MockDataStorage {
  private readonly STORAGE_KEY = 'scla_mock_data';
  
  /**
   * Creates storage instance and initializes with default data if empty
   * Automatically populates 6 months of historical health data on first run
   */
  constructor() {
    this.initializeData();
  }
  
  /**
   * Initializes storage with realistic default data on first use
   * @private
   * Creates:
   * - Default user profile (John Doe)
   * - 6 months of symptom history
   * - 6 months of blood pressure readings
   * - Active Holter study
   * - Default preferences
   */
  private initializeData() {
    if (!this.getData()) {
      const user = generateInitialUser();
      const symptoms = new SymptomGenerator().generateHistoricalSymptoms(user.id, 6);
      const bpReadings = new BloodPressureGenerator().generateHistoricalReadings(user.id, 6);
      const holterStudy = generateHolterStudy(user.id);
      
      const initialData: MockDataStore = {
        user,
        preferences: generateDefaultPreferences(user.id),
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
  
  /**
   * Retrieves all data from localStorage with date revival
   * @private
   * @returns Complete data store or null if not initialized
   * Handles JSON date string conversion back to Date objects
   */
  private getData(): MockDataStore | null {
    if (typeof window === 'undefined') return null;
    
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
  
  /**
   * Persists data to localStorage
   * @private
   * @param data - Complete data store to save
   * Serializes to JSON for browser storage
   */
  private saveData(data: MockDataStore) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }
  
  /**
   * Recursively converts date strings to Date objects after JSON parsing
   * @private
   * @param obj - Object potentially containing date strings
   * @returns Object with date strings converted to Date objects
   * 
   * Handles ISO 8601 date strings (e.g., "2024-12-26T10:30:00.000Z")
   * Essential for proper date handling after localStorage retrieval
   */
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
  
  // Public methods for data access
  
  /**
   * Gets the current user profile
   * @returns User object with profile information
   */
  getUser(): User {
    return this.getData()!.user;
  }
  
  /**
   * Gets user preferences for app settings
   * @returns UserPreferences including notification, data upload, and display settings
   */
  getPreferences(): UserPreferences {
    return this.getData()!.preferences;
  }
  
  /**
   * Updates user preferences with partial updates
   * @param updates - Partial preferences to merge with existing
   * @returns Updated preferences after save
   * @example
   * storage.updatePreferences({ notificationEnabled: false });
   */
  updatePreferences(updates: Partial<UserPreferences>): UserPreferences {
    const data = this.getData()!;
    data.preferences = { ...data.preferences, ...updates };
    this.saveData(data);
    return data.preferences;
  }
  
  /**
   * Saves authentication session after login
   * @param session - Auth session with token and expiry
   * Used by login methods to persist authentication state
   */
  saveSession(session: AuthSession) {
    const data = this.getData()!;
    data.session = session;
    this.saveData(data);
  }
  
  /**
   * Gets current authentication session
   * @returns Active session or null if not logged in
   * Used to check authentication status on app startup
   */
  getSession(): AuthSession | null {
    return this.getData()?.session || null;
  }
  
  /**
   * Logs out user by clearing session
   * Called on logout or session expiry
   */
  clearSession() {
    const data = this.getData()!;
    data.session = null;
    this.saveData(data);
  }
  
  /**
   * Saves newly paired device and user association
   * @param device - Device hardware information
   * @param userDevice - User's device settings and nickname
   * Called after successful Bluetooth pairing
   */
  savePairedDevice(device: Device, userDevice: UserDevice) {
    const data = this.getData()!;
    data.devices.push(device);
    data.userDevices.push(userDevice);
    this.saveData(data);
  }
  
  /**
   * Updates device status (battery, connection, etc.)
   * @param device - Updated device state
   * Used by device simulator to persist status changes
   */
  updateDevice(device: Device) {
    const data = this.getData()!;
    const index = data.devices.findIndex(d => d.id === device.id);
    if (index >= 0) {
      data.devices[index] = device;
      this.saveData(data);
    }
  }
  
  /**
   * Gets all paired devices with user settings
   * @returns Array of devices merged with user device settings
   * Combines Device and UserDevice data for complete device info
   */
  getPairedDevices(): Array<Device & UserDevice> {
    const data = this.getData()!;
    return data.userDevices.map(ud => {
      const device = data.devices.find(d => d.id === ud.deviceId)!;
      return { ...device, ...ud };
    });
  }
  
  /**
   * Removes device pairing
   * @param deviceId - ID of device to unpair
   * Removes both device and user device association
   */
  unpairDevice(deviceId: string) {
    const data = this.getData()!;
    data.devices = data.devices.filter(d => d.id !== deviceId);
    data.userDevices = data.userDevices.filter(ud => ud.deviceId !== deviceId);
    this.saveData(data);
  }
  
  /**
   * Adds new symptom entry
   * @param symptom - Complete symptom data
   * Appends to symptom history for tracking
   */
  addSymptom(symptom: Symptom) {
    const data = this.getData()!;
    data.symptoms.push(symptom);
    this.saveData(data);
  }
  
  /**
   * Updates existing symptom (e.g., after analysis)
   * @param symptom - Updated symptom data
   * Used when analysis completes or user edits entry
   */
  updateSymptom(symptom: Symptom) {
    const data = this.getData()!;
    const index = data.symptoms.findIndex(s => s.id === symptom.id);
    if (index >= 0) {
      data.symptoms[index] = symptom;
      this.saveData(data);
    }
  }
  
  /**
   * Removes symptom from history
   * @param id - Symptom ID to delete
   * Permanently removes from user's health log
   */
  deleteSymptom(id: string) {
    const data = this.getData()!;
    data.symptoms = data.symptoms.filter(s => s.id !== id);
    this.saveData(data);
  }
  
  /**
   * Gets all symptoms for a specific date
   * @param date - Date to query (time ignored, full day returned)
   * @returns Array of symptoms experienced on that date
   * Used by calendar/diary views
   */
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
  
  /**
   * Gets all symptoms sorted by date
   * @returns Array of all symptoms (newest first)
   * Used by log view and symptom history screens
   */
  getAllSymptoms(): Symptom[] {
    const data = this.getData()!;
    return data.symptoms.sort((a, b) => b.experiencedAt.getTime() - a.experiencedAt.getTime());
  }
  
  /**
   * Adds new blood pressure reading
   * @param reading - BP measurement data
   * Stores BP reading for trend analysis
   */
  addBloodPressure(reading: BloodPressureReading) {
    const data = this.getData()!;
    data.bloodPressureReadings.push(reading);
    this.saveData(data);
  }
  
  /**
   * Gets blood pressure readings for a specific date
   * @param date - Date to query (returns full day)
   * @returns Array of BP readings from that date
   * Used by calendar and daily summary views
   */
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
  
  /**
   * Gets all blood pressure readings sorted by date
   * @returns Array of all BP readings (newest first)
   * Used by BP history and trend analysis screens
   */
  getAllBloodPressureReadings(): BloodPressureReading[] {
    const data = this.getData()!;
    return data.bloodPressureReadings.sort((a, b) => b.measuredAt.getTime() - a.measuredAt.getTime());
  }
  
  /**
   * Creates user-defined custom symptom
   * @param name - Name of custom symptom
   * Allows users to track symptoms not in predefined list
   */
  addCustomSymptom(name: string) {
    const data = this.getData()!;
    data.customSymptoms.push({
      id: `custom-symptom-${uuidv4()}`,
      name,
      createdAt: new Date()
    });
    this.saveData(data);
  }
  
  /**
   * Gets all user-created custom symptoms
   * @returns Array of custom symptoms
   * Used in symptom selection to show personalized options
   */
  getCustomSymptoms(): CustomSymptom[] {
    return this.getData()!.customSymptoms;
  }
  
  /**
   * Creates user-defined custom trigger
   * @param name - Name of custom trigger
   * Allows tracking of personal symptom triggers
   */
  addCustomTrigger(name: string) {
    const data = this.getData()!;
    data.customTriggers.push({
      id: `custom-trigger-${uuidv4()}`,
      name,
      createdAt: new Date()
    });
    this.saveData(data);
  }
  
  /**
   * Gets all user-created custom triggers
   * @returns Array of custom triggers
   * Used in trigger selection for personalized tracking
   */
  getCustomTriggers(): CustomTrigger[] {
    return this.getData()!.customTriggers;
  }
  
  /**
   * Removes custom trigger
   * @param id - Trigger ID to delete
   * Allows users to clean up unused triggers
   */
  deleteCustomTrigger(id: string) {
    const data = this.getData()!;
    data.customTriggers = data.customTriggers.filter(t => t.id !== id);
    this.saveData(data);
  }
  
  /**
   * Gets current Holter study with dynamic progress
   * @returns HolterStudy with real-time progress calculation
   * 
   * Automatically updates:
   * - Progress percentage based on elapsed time
   * - Days completed
   * - Study status (active/completed)
   * 
   * @example
   * const study = storage.getHolterStudy();
   * // Returns study with current progress, e.g., 64% complete
   */
  getHolterStudy(): HolterStudy {
    const study = this.getData()!.holterStudy;
    
    // Update progress based on current date
    const now = new Date();
    const elapsed = now.getTime() - study.startDate.getTime();
    const totalDuration = study.endDate.getTime() - study.startDate.getTime();
    
    study.progressPercentage = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
    study.daysCompleted = Math.floor(elapsed / (24 * 60 * 60 * 1000));
    study.lastUpdated = now;
    
    if (study.progressPercentage >= 100) {
      study.status = 'completed';
    }
    
    return study;
  }
}