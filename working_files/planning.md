# SCLA Clone Implementation Planning

## Project Overview
Creating a complete clone of the SCLA (Skiin Connected Life App) with comprehensive mock data infrastructure to enable full app functionality without a backend. The app will be implemented using React/Next.js with TypeScript, Tailwind CSS, and shadcn/ui components.

## Phase 1: Research & Analysis (Current)

### 1.1 Documentation Analysis
- [ ] Read and analyze SCLA Complete Reconstruction Documentation
- [ ] Analyze Screen Analysis document
- [ ] Study Data Models and Backend Requirements
- [ ] Review Navigation Flows and Component Interactions
- [ ] Map screenshots to screen specifications

### 1.2 Mock Data Architecture Design
- [ ] Design comprehensive mock data structure
- [ ] Create data generation utilities
- [ ] Design state management for mock backend
- [ ] Plan data persistence strategy (localStorage)
- [ ] Design real-time data simulation (ECG, device status)

### 1.3 Project Architecture Planning
- [ ] Define folder structure
- [ ] Plan component hierarchy
- [ ] Design routing structure
- [ ] Plan state management architecture
- [ ] Design mock API layer

## Phase 2: Foundation & Mock Data Layer

### 2.1 Project Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up shadcn/ui
- [ ] Configure ESLint and Prettier
- [ ] Set up project structure

### 2.2 Mock Data Implementation
- [ ] Create TypeScript interfaces for all data models
- [ ] Implement mock data generators
- [ ] Create mock API service layer
- [ ] Implement data persistence layer
- [ ] Create real-time data simulators

### 2.3 Core Infrastructure
- [ ] Set up routing structure
- [ ] Implement authentication context
- [ ] Create navigation components
- [ ] Set up theme system
- [ ] Implement responsive layout system

## Phase 3: Screen Implementation

### 3.1 Authentication Screens
- [ ] Welcome/Landing Screen
- [ ] Sign In Screen with auth methods
- [ ] Session management

### 3.2 Device Management Screens
- [ ] Device Pairing Introduction
- [ ] Pod Selection Screen
- [ ] Connection Status Screen
- [ ] Device Management Settings

### 3.3 Main Navigation
- [ ] Bottom Tab Navigation
- [ ] Top Navigation Bar
- [ ] Side Navigation Drawer
- [ ] Modal System

### 3.4 Home Dashboard
- [ ] Status Cards
- [ ] Signal Status Indicator
- [ ] Holter Study Progress
- [ ] Battery Optimization Popup
- [ ] Real-time updates

### 3.5 Health Data Entry
- [ ] Symptom Entry Flow (7 screens)
- [ ] Blood Pressure Entry (3 screens)
- [ ] Custom Symptom/Trigger Management
- [ ] Data validation and confirmation

### 3.6 ECG Viewer
- [ ] Real-time ECG waveform display
- [ ] Dual-channel visualization
- [ ] Signal quality indicators
- [ ] Scale adjustment controls
- [ ] WebSocket simulation

### 3.7 Log & Diary
- [ ] Log Tab Interface
- [ ] Diary Tab with Calendar
- [ ] Entry List Views
- [ ] Detail Views
- [ ] Edit/Delete functionality

### 3.8 Settings & Advanced
- [ ] Advanced Settings Screen
- [ ] User Preferences
- [ ] Data Upload Settings
- [ ] App Configuration

## Phase 4: Integration & Polish

### 4.1 Data Flow Integration
- [ ] Connect all screens to mock data
- [ ] Implement data persistence
- [ ] Add real-time updates
- [ ] Implement search and filtering

### 4.2 UI/UX Polish
- [ ] Animations and transitions
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Accessibility features

### 4.3 Testing & Documentation
- [ ] Component testing
- [ ] Integration testing
- [ ] Documentation updates
- [ ] Usage guide

## Technical Specifications

### Data Models
```typescript
// User & Authentication
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  createdAt: Date;
  preferences: UserPreferences;
}

interface UserSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}

// Device Management
interface Device {
  id: string;
  serialNumber: string;
  firmwareVersion: string;
  batteryLevel: number;
  lastSyncedAt: Date;
  status: 'connected' | 'disconnected' | 'pairing';
}

// Health Data
interface ECGData {
  id: string;
  userId: string;
  deviceId: string;
  timestamp: Date;
  channel1Data: number[];
  channel2Data: number[];
  heartRate: number;
  signalQuality: number;
}

interface Symptom {
  id: string;
  userId: string;
  name: string;
  intensity: number;
  triggers: string[];
  duration: number;
  notes: string;
  timestamp: Date;
}

interface BloodPressureReading {
  id: string;
  userId: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  timestamp: Date;
  arm: 'left' | 'right';
}
```

### Mock Data Generation Strategy
1. **Static Data**: Pre-generated user profiles, symptoms catalog, triggers list
2. **Dynamic Data**: Real-time ECG simulation, device status updates
3. **Historical Data**: Generated time-series data for past 6 months
4. **Customizable Data**: User-created symptoms and triggers

### State Management
- **Global State**: User session, device connection, app settings
- **Local State**: Form data, UI state, temporary selections
- **Cached Data**: Health readings, diary entries, analysis results
- **Real-time State**: ECG stream, device status, sync status

## Documentation Structure
```
docs/
├── scla-clone/
│   ├── README.md                    # Project overview
│   ├── ARCHITECTURE.md              # Technical architecture
│   ├── MOCK_DATA_SPEC.md           # Mock data documentation
│   ├── COMPONENT_GUIDE.md          # Component library
│   ├── SCREEN_FLOWS.md             # Screen navigation flows
│   └── API_REFERENCE.md            # Mock API documentation
```

## Key Implementation Notes

1. **ECG Visualization**: Use Canvas API for smooth waveform rendering
2. **Mock Bluetooth**: Simulate device discovery and pairing flows
3. **Data Persistence**: Use localStorage with encryption simulation
4. **Real-time Updates**: Use React hooks for simulated WebSocket data
5. **Responsive Design**: Mobile-first with desktop adaptations
6. **Accessibility**: Full keyboard navigation and screen reader support
7. **Performance**: Virtual scrolling for large data lists
8. **Offline Support**: Service worker for offline functionality

## Current Status
Phase 1: ✅ Research & Analysis - COMPLETE
- Analyzed all SCLA documentation (1,244 lines)
- Identified 26 unique screens
- Mapped complete navigation flows
- Extracted all data models (17 tables)
- Created comprehensive mock data specification

Phase 2: ✅ Foundation & Mock Data - COMPLETE
- ✅ Created Next.js project structure
- ✅ Configured TypeScript and Tailwind CSS
- ✅ Implemented complete mock data layer:
  - Mock API service with all endpoints
  - ECG waveform generator (250Hz)
  - Device status simulator
  - Data persistence with localStorage
  - Historical data generators
- ✅ Created type definitions for all entities
- ✅ Set up project documentation
- ✅ Added comprehensive JSDoc documentation to all functions
- ✅ Created reflection document for Phase 1 & 2
- ✅ Updated CLAUDE.md with complete references

## Implementation Summary

### Mock Data Features Implemented
1. **Authentication System**
   - Email/password login
   - 6-digit code login
   - QR code login
   - Session management

2. **Device Management**
   - Device discovery simulation
   - Pairing process (3-second delay)
   - Battery drain simulation
   - Connection status changes
   - Signal strength variations

3. **Health Data**
   - Real-time ECG generation with PQRST complexes
   - 6 months of historical symptoms
   - Blood pressure readings with circadian variation
   - Custom symptoms and triggers
   - Automatic analysis simulation

4. **Data Persistence**
   - Complete localStorage implementation
   - Date revival for JSON parsing
   - Session expiration handling
   - Offline-first architecture

### Phase 3 Plan: UI Implementation

#### 3.1 Component Library Setup
1. Install and configure shadcn/ui
2. Create base components:
   - Button (primary, secondary, ghost variants)
   - Card (for status cards, device cards)
   - Input (text, password with visibility toggle)
   - Form components (labels, error states)
   - Icon system

#### 3.2 Navigation Infrastructure
1. Set up Next.js app router structure
2. Create layouts:
   - Auth layout (no navigation)
   - Main layout (with bottom tabs)
   - Modal layout (for overlays)
3. Implement bottom tab navigation:
   - Dashboard, ECG, Log, Device tabs
   - Active state indicators
   - Badge notifications

#### 3.3 Authentication Flow (3 screens)
1. Welcome screen with logo and sign-in button
2. Sign-in options (email, QR, 6-digit)
3. Form implementations with mock API integration

#### 3.4 Progressive Screen Implementation
Follow order based on complexity:
1. Static screens first (welcome, settings)
2. Form-based screens (auth, symptom entry)
3. Data display screens (log, diary)
4. Complex interactive screens (ECG viewer last)

### Ready for Phase 3
- All mock data infrastructure complete
- Type definitions provide clear contracts
- API methods ready for UI integration
- Real-time subscriptions available
- Data persistence working