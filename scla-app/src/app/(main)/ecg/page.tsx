'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Heart } from 'lucide-react';
import { mockAPI } from '@/mock/api';
import type { ECGRealtimeData } from '@/types';

export default function ECGViewerPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [scale, setScale] = useState<number>(10.0);
  const [showScaleMenu, setShowScaleMenu] = useState(false);
  const [signalQuality, setSignalQuality] = useState<'good' | 'poor' | 'no_signal'>('good');
  
  // ECG data buffers for each channel
  const channel1Buffer = useRef<number[]>([]);
  const channel2Buffer = useRef<number[]>([]);
  const channel3Buffer = useRef<number[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    // Subscribe to ECG data
    const unsubscribe = mockAPI.subscribeToECG((data: ECGRealtimeData) => {
      // Update heart rate
      setHeartRate(data.heartRate);
      
      // Update signal quality
      if (data.signalQuality > 0.8) {
        setSignalQuality('good');
      } else if (data.signalQuality > 0.5) {
        setSignalQuality('poor');
      } else {
        setSignalQuality('no_signal');
      }
      
      // Add data to buffers
      channel1Buffer.current.push(...data.channel1Data);
      channel2Buffer.current.push(...data.channel2Data);
      channel3Buffer.current.push(...data.channel2Data); // Using channel2 data for channel3 demo
      
      // Keep buffer size manageable (5 seconds of data at 250Hz)
      const maxBufferSize = 250 * 5;
      if (channel1Buffer.current.length > maxBufferSize) {
        channel1Buffer.current = channel1Buffer.current.slice(-maxBufferSize);
        channel2Buffer.current = channel2Buffer.current.slice(-maxBufferSize);
        channel3Buffer.current = channel3Buffer.current.slice(-maxBufferSize);
      }
    });

    // Start animation loop
    const animate = () => {
      drawECG();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      unsubscribe();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [scale]);

  const drawECG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const channelHeight = height / 3;
    
    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 0.5;
    
    // Vertical lines (every 10px)
    for (let x = 0; x < width; x += 10) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines (every 10px)
    for (let y = 0; y < height; y += 10) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw channel separators
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, channelHeight);
    ctx.lineTo(width, channelHeight);
    ctx.moveTo(0, channelHeight * 2);
    ctx.lineTo(width, channelHeight * 2);
    ctx.stroke();
    
    // Draw ECG waveforms
    ctx.strokeStyle = '#0E4DA4';
    ctx.lineWidth = 2;
    
    // Draw each channel
    drawChannel(ctx, channel1Buffer.current, 0, channelHeight, width, scale);
    drawChannel(ctx, channel2Buffer.current, channelHeight, channelHeight, width, scale);
    drawChannel(ctx, channel3Buffer.current, channelHeight * 2, channelHeight, width, scale);
    
    // Draw channel labels
    ctx.fillStyle = '#666666';
    ctx.font = '12px sans-serif';
    ctx.fillText('CHANNEL 1', 10, 20);
    ctx.fillText('CHANNEL 2', 10, channelHeight + 20);
    ctx.fillText('CHANNEL 3', 10, channelHeight * 2 + 20);
    
    // Draw signal quality badges
    const qualityColor = signalQuality === 'good' ? '#4CAF50' : 
                        signalQuality === 'poor' ? '#FFA500' : '#DC3545';
    const qualityText = signalQuality === 'good' ? 'GOOD SIGNAL' :
                       signalQuality === 'poor' ? 'POOR SIGNAL' : 'NO SIGNAL';
    
    ctx.fillStyle = qualityColor;
    ctx.fillRect(90, 8, 90, 20);
    ctx.fillStyle = 'white';
    ctx.font = '10px sans-serif';
    ctx.fillText(qualityText, 100, 22);
    
    // Draw "now" indicator
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(width - 50, height - 30, 40, 20);
    ctx.fillStyle = 'white';
    ctx.fillText('now', width - 40, height - 15);
  };

  const drawChannel = (
    ctx: CanvasRenderingContext2D,
    data: number[],
    yOffset: number,
    height: number,
    width: number,
    scale: number
  ) => {
    if (data.length < 2) return;
    
    ctx.beginPath();
    const samplesPerPixel = Math.max(1, Math.floor(data.length / width));
    const yCenter = yOffset + height / 2;
    const yScale = (height * 0.8) / 2; // Use 80% of channel height
    
    for (let x = 0; x < width; x++) {
      const dataIndex = Math.floor(x * samplesPerPixel);
      if (dataIndex < data.length) {
        const value = data[dataIndex] * (scale / 10); // Adjust for scale
        const y = yCenter - (value * yScale);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    
    ctx.stroke();
  };

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={() => router.back()} className="p-2">
            <ArrowLeft size={24} className="text-[rgb(var(--scla-dark-navy))]" />
          </button>
          
          <h1 className="text-lg font-semibold text-[rgb(var(--scla-dark-navy))]">
            Garment Signal Status
          </h1>
          
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        {/* Heart Rate Display */}
        <div className="flex items-center gap-2 px-4 py-2">
          <Heart size={24} className="text-[rgb(var(--scla-error-red))] fill-current" />
          <span className="text-2xl font-bold text-[rgb(var(--scla-dark-navy))]">
            {heartRate === 0 ? '--' : heartRate}
          </span>
        </div>

        {/* ECG Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={390}
            height={600}
            className="w-full"
            style={{ maxWidth: '390px' }}
          />
          
          {/* Scale Selector */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowScaleMenu(!showScaleMenu)}
              className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center gap-2"
            >
              <span className="text-sm font-medium">{scale.toFixed(1)} mm/mV</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showScaleMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
                {[10.0, 5.0, 2.5].map((value) => (
                  <button
                    key={value}
                    onClick={() => {
                      setScale(value);
                      setShowScaleMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                      scale === value ? 'bg-gray-100' : ''
                    }`}
                  >
                    {value.toFixed(1)} mm/mV
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4">
          <p className="text-xs text-[rgb(var(--scla-text-gray))] text-center">
            Disclaimer: This garment signal viewer is for your personal purposes
            only and not for diagnostic purposes.
          </p>
        </div>
      </div>
    </div>
  );
}