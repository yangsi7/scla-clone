import { ECGRealtimeData, SignalQuality } from '@/types';

/**
 * Generates realistic ECG waveform data for real-time display
 * Simulates dual-channel ECG with PQRST complexes at 250Hz sample rate
 * 
 * @class ECGWaveformGenerator
 * @description This class creates medically accurate ECG waveforms for the mock data system.
 * It generates the characteristic PQRST complex of heartbeats with appropriate timing and amplitudes.
 * The generator supports different signal qualities and heart rates to simulate various conditions.
 * 
 * @example
 * const ecgGen = new ECGWaveformGenerator();
 * ecgGen.updateHeartRate(80); // Set to 80 BPM
 * ecgGen.updateSignalQuality('poor'); // Simulate poor electrode contact
 * const data = ecgGen.generateRealtimeData(); // Get 200ms of ECG data
 */
export class ECGWaveformGenerator {
  private baselineVoltage = 0.0;
  private sampleRate = 250; // Hz - Standard ECG sample rate
  private heartRate = 72; // BPM - Normal resting heart rate
  private signalQuality: SignalQuality = 'good';
  private time = 0; // Running time counter for continuous waveform
  
  /**
   * Generates a batch of real-time ECG data
   * @returns ECGRealtimeData object containing 50 samples (200ms) of dual-channel ECG data
   * Each call advances the internal time counter for continuous waveform generation
   */
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
  
  /**
   * Generates raw ECG samples for both channels
   * @private
   * @param count - Number of samples to generate
   * @returns Object containing arrays of voltage values for both channels
   * Channel 3 is derived from Channel 1 with slight variations
   */
  private generateSamples(count: number): { channel1: number[], channel3: number[] } {
    const channel1: number[] = [];
    const channel3: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const t = this.time + (i / this.sampleRate);
      
      // Generate realistic ECG waveform (simplified PQRST complex)
      const ecgValue = this.generatePQRST(t);
      
      channel1.push(ecgValue);
      channel3.push(ecgValue * 0.8 + (Math.random() - 0.5) * 0.05);
    }
    
    this.time += count / this.sampleRate;
    return { channel1, channel3 };
  }
  
  /**
   * Generates a single point of the PQRST complex based on time
   * @private
   * @param t - Time in seconds
   * @returns Voltage value representing the ECG signal at time t
   * The PQRST complex consists of:
   * - P wave: Atrial depolarization (0.1s)
   * - QRS complex: Ventricular depolarization (0.08-0.12s)
   * - T wave: Ventricular repolarization (0.16s)
   */
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
  
  /**
   * Adds realistic noise to ECG data based on signal quality
   * @private
   * @param data - Array of clean ECG voltage values
   * @param quality - Signal quality level ('good', 'poor', 'no_signal')
   * @returns Array of ECG values with appropriate noise added
   * - 'no_signal': Returns pure noise
   * - 'poor': Adds 20% noise
   * - 'good': Adds 5% noise for realism
   */
  private addNoise(data: number[], quality: SignalQuality): number[] {
    if (quality === 'no_signal') {
      return data.map(() => Math.random() * 0.1 - 0.05);
    }
    
    const noiseLevel = quality === 'poor' ? 0.2 : 0.05;
    return data.map(v => v + (Math.random() - 0.5) * noiseLevel);
  }
  
  /**
   * Updates the simulated heart rate
   * @param bpm - Beats per minute (clamped between 40-200)
   * @example
   * ecgGen.updateHeartRate(120); // Simulates elevated heart rate
   */
  updateHeartRate(bpm: number) {
    this.heartRate = Math.max(40, Math.min(200, bpm));
  }
  
  /**
   * Updates the signal quality for both channels
   * @param quality - New signal quality level
   * @example
   * ecgGen.updateSignalQuality('poor'); // Simulates poor electrode contact
   */
  updateSignalQuality(quality: SignalQuality) {
    this.signalQuality = quality;
  }
  
  /**
   * Resets the internal time counter to start a fresh waveform
   * Useful when starting a new ECG recording session
   * @example
   * ecgGen.reset(); // Start from time = 0
   */
  reset() {
    this.time = 0;
  }
}