# SCLA Clone - Skiin Connected Life App

## Overview

This is a complete clone of the SCLA (Skiin Connected Life App) mobile application, built as a web app using Next.js, TypeScript, and Tailwind CSS. The app features a comprehensive mock data layer that simulates all backend functionality, enabling full app features without external dependencies.

## Key Features

### Health Monitoring
- **Real-time ECG Monitoring**: Dual-channel ECG waveform display at 250Hz
- **Symptom Logging**: Track symptoms with intensity ratings, triggers, and duration
- **Blood Pressure Tracking**: Dual measurement capability with historical tracking
- **Diary View**: Calendar-based view of all health data entries

### Device Integration
- **Bluetooth Simulation**: Mock device discovery and pairing
- **Device Management**: Battery level, connection status, and sync monitoring
- **Signal Quality**: Real-time signal quality indicators

### Clinical Features
- **Holter Study Progress**: 14-day study tracking
- **ECG Analysis**: Automatic symptom-ECG correlation
- **Report Generation**: Clinical report preparation

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: React Context + Local Storage
- **Mock Data**: Custom mock API with realistic data generation
- **Real-time**: Simulated WebSocket for ECG streaming

## Mock Data System

The app includes a sophisticated mock data layer that provides:

### Authentication
- Default user: john.doe@example.com / password123
- Multiple auth methods: Email/Password, 6-digit code, QR code

### Device Simulation
- 3 discoverable SKIIN devices
- Real-time battery drain simulation
- Connection status changes
- Signal quality variations

### Health Data
- 6 months of historical symptoms and blood pressure readings
- Real-time ECG waveform generation with PQRST complexes
- Automatic analysis simulation
- Custom symptoms and triggers

### Data Persistence
- All data stored in localStorage
- Session management
- Offline-first architecture

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd scla-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:3000

### Development Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript type checking
```

## App Structure

### Navigation
- **Home Tab**: Dashboard with device status and study progress
- **Log Tab**: Add symptoms or blood pressure readings
- **Diary Tab**: View historical data with calendar navigation

### Key User Flows
1. **Authentication**: Welcome → Sign In → Main App
2. **Device Pairing**: Add Garment → Discover → Select → Pair
3. **Symptom Logging**: Log → Symptom → Details → Confirmation
4. **Blood Pressure**: Log → BP → Enter Values → Confirmation

## Implementation Status

### Completed ✅
- Project setup and configuration
- Complete mock data architecture
- Data models and TypeScript types
- Mock API service
- Real-time ECG generator
- Device status simulator
- Data persistence layer

### In Progress 🚧
- UI component library
- Navigation structure
- Authentication screens

### Pending ⏳
- All 26 screens implementation
- Real-time ECG visualization
- Form components
- Settings management
- Testing setup

## Architecture

The app follows a modular architecture:

```
src/
├── app/          # Next.js app directory and routes
├── components/   # Reusable React components
├── lib/          # Utility functions
├── hooks/        # Custom React hooks
├── types/        # TypeScript type definitions
└── mock/         # Mock data layer
```

### Mock Data Layer
- `api.ts`: Main API service with all endpoints
- `storage.ts`: localStorage wrapper for data persistence
- `ecgGenerator.ts`: Real-time ECG waveform generation
- `deviceSimulator.ts`: Device status simulation
- `dataGenerators.ts`: Historical data generation
- `constants.ts`: Predefined symptoms and triggers

## Testing the App

### Quick Test Scenarios

1. **Authentication**
   - Email: john.doe@example.com
   - Password: password123

2. **Device Pairing**
   - Click "Get Started" or navigate to device pairing
   - Select any available device
   - Watch connection simulation

3. **Add Symptom**
   - Go to Log tab
   - Select "Symptom"
   - Choose "Brain Fog" or any symptom
   - Set intensity, triggers, and save

4. **View ECG**
   - From Home, click on Signal Status
   - Watch real-time ECG simulation
   - Note signal quality indicators

## Contributing

This is a demonstration project. Feel free to explore and modify as needed.

## License

This project is for educational purposes only.