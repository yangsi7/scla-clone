import { Device } from '@/types';

/**
 * Simulates realistic device behavior for SKIIN pods
 * Handles battery drain, connection fluctuations, and sync cycles
 * 
 * @class DeviceStatusSimulator
 * @description This class creates realistic device behavior patterns for the mock data system.
 * It simulates battery drain during use, connection status changes, periodic sync cycles,
 * and signal strength variations to mimic real Bluetooth device behavior.
 * 
 * @example
 * const device = { id: '123', batteryLevel: 85, connectionStatus: 'connected', ... };
 * const simulator = new DeviceStatusSimulator(device);
 * 
 * // Get updated device status
 * const updatedDevice = simulator.update();
 * 
 * // Simulate charging
 * simulator.simulateCharging();
 */
export class DeviceStatusSimulator {
  private device: Device;
  private batteryDrainRate = 0.001; // % per minute - realistic battery drain for medical device
  private syncInterval = 15 * 60 * 1000; // 15 minutes - standard sync cycle
  private lastSync: Date;
  
  /**
   * Creates a new device simulator instance
   * @param device - Initial device state to simulate
   * The simulator creates a copy of the device to avoid mutating the original
   */
  constructor(device: Device) {
    this.device = { ...device };
    this.lastSync = new Date();
  }
  
  /**
   * Updates device status based on elapsed time and random events
   * @returns Updated device state with new battery level, connection status, and signal strength
   * 
   * Simulates:
   * - Battery drain when connected (0.001% per minute)
   * - Random connection drops (1% chance per update)
   * - Periodic sync cycles every 15 minutes
   * - Signal strength fluctuations (±5 dBm)
   */
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
  
  /**
   * Simulates placing the device on a charger
   * Sets battery to 100% and disconnects from app (typical charging behavior)
   * 
   * @example
   * simulator.simulateCharging(); // Device now at 100% battery and disconnected
   */
  simulateCharging() {
    this.device.batteryLevel = 100;
    this.device.connectionStatus = 'disconnected';
  }
  
  /**
   * Gets the current device state without updating
   * @returns A copy of the current device state
   * Useful for checking status without triggering time-based updates
   */
  getDevice(): Device {
    return { ...this.device };
  }
}