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

## Phase 3: UI Implementation Plan

### Design System (Based on Screenshots Analysis)

#### Visual Identity
- **Color Palette**:
  ```css
  --primary-blue: #0E4DA4;      /* Buttons, links */
  --dark-navy: #003366;          /* Headers, primary text */
  --success-green: #4CAF50;      /* Good signal */
  --error-red: #DC3545;          /* No signal, errors */
  --warning-orange: #FFA500;     /* Battery icon */
  --bg-gray: #F5F5F5;           /* Background */
  --card-white: #FFFFFF;         /* Cards */
  --text-gray: #666666;          /* Secondary text */
  --border-gray: #E0E0E0;        /* Dividers */
  ```

- **Typography**:
  - Font: System font stack (SF Pro on iOS)
  - Headers: 24-32px, bold
  - Body: 16px, regular
  - Small: 14px, secondary info
  - Button: 16px, medium weight

- **Component Patterns**:
  - Full-width primary buttons (blue)
  - Rounded corners (8px cards, 24px buttons)
  - Bottom tab navigation with icons
  - Card-based layouts with shadows
  - Modal dialogs with dark overlay
  - Status badges (pill-shaped)

#### Key UI Elements from Screenshots
1. **Welcome Screen (IMG_5815)**:
   - Centered logo and tagline
   - Custom illustration
   - Page indicator dots
   - Primary CTA button

2. **Dashboard (IMG_5824)**:
   - Greeting header
   - Signal status card with icon
   - Progress indicators
   - Battery optimization modal

3. **ECG Viewer (IMG_5830)**:
   - Grid paper background
   - Multi-channel display
   - Scale selector dropdown
   - Signal quality badges

4. **Device Pairing (IMG_5819-5823)**:
   - Step-by-step flow
   - Device illustrations
   - Success animations
   - Connection status icons

### Architecture Overview

#### Tech Stack Integration
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + custom design system
- **Components**: Custom components (shadcn/ui as base)
- **State Management**: React Context for global state
- **Forms**: react-hook-form + zod validation
- **Animations**: Framer Motion for illustrations
- **Charts**: Canvas API for ECG rendering
- **Icons**: Custom icon set + Lucide React
- **Mock Data**: Existing mockAPI singleton

#### File Structure
```
src/
├── app/                          # Next.js 14 app router
│   ├── (auth)/                   # Auth route group
│   │   ├── layout.tsx           # No navigation layout
│   │   ├── welcome/             # Landing page
│   │   ├── login/               # Login methods
│   │   └── qr-scan/             # QR scanner
│   ├── (main)/                   # Main app routes
│   │   ├── layout.tsx           # Bottom tabs layout
│   │   ├── dashboard/           # Home dashboard
│   │   ├── ecg/                 # ECG viewer
│   │   ├── log/                 # Health log
│   │   ├── device/              # Device management
│   │   └── symptom/             # Symptom entry flow
│   └── globals.css              # Global styles
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── BottomNavigation.tsx
│   │   ├── TopBar.tsx
│   │   ├── NavigationDrawer.tsx
│   │   └── PageTransition.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── QRScanner.tsx
│   │   ├── SixDigitInput.tsx
│   │   └── AuthMethodSelector.tsx
│   ├── dashboard/
│   │   ├── StatusCard.tsx
│   │   ├── SignalIndicator.tsx
│   │   ├── HolterProgress.tsx
│   │   └── BatteryOptimizationModal.tsx
│   ├── ecg/
│   │   ├── ECGCanvas.tsx
│   │   ├── ECGControls.tsx
│   │   ├── HeartRateDisplay.tsx
│   │   └── SignalQualityBadge.tsx
│   ├── health/
│   │   ├── SymptomCard.tsx
│   │   ├── BloodPressureCard.tsx
│   │   ├── TriggerSelector.tsx
│   │   └── IntensitySlider.tsx
│   ├── device/
│   │   ├── DeviceCard.tsx
│   │   ├── PairingFlow.tsx
│   │   ├── ConnectionStatus.tsx
│   │   └── BatteryIndicator.tsx
│   └── shared/
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       ├── EmptyState.tsx
│       └── SkeletonLoader.tsx
├── hooks/
│   ├── useAuth.tsx              # Auth state management
│   ├── useECGStream.tsx         # ECG subscription
│   ├── useDevice.tsx            # Device management
│   ├── useHealth.tsx            # Health data queries
│   └── useToast.tsx             # Toast notifications
├── contexts/
│   ├── AuthContext.tsx          # Authentication state
│   ├── DeviceContext.tsx        # Device connection state
│   └── ThemeContext.tsx         # Theme preferences
├── lib/
│   ├── validators/              # Zod schemas
│   │   ├── auth.ts
│   │   ├── health.ts
│   │   └── device.ts
│   ├── utils.ts                 # Utility functions
│   └── constants.ts             # App constants
├── styles/
│   └── animations.ts            # Framer Motion variants
├── mock/                        # ✓ Already implemented
└── types/                       # ✓ Already implemented
```

### Implementation Phases

#### Phase 3.1: Foundation Setup (Week 1)
1. **Environment Setup**
   - Install shadcn/ui CLI and components
   - Configure Framer Motion
   - Set up react-hook-form and zod
   - Configure path aliases

2. **Base Components**
   - Import shadcn/ui components (Button, Card, Input, etc.)
   - Create custom theme configuration
   - Build loading/error/empty states
   - Implement skeleton loaders

3. **Layout Infrastructure**
   - App router layouts (auth, main)
   - Bottom navigation component
   - Page transition wrapper
   - Responsive grid system

#### Phase 3.2: Core Features (Week 2)
1. **Authentication Flow**
   - AuthContext with mockAPI integration
   - Welcome screen with animations
   - Login form with validation
   - QR scanner mock interface
   - 6-digit code input component
   - Session persistence handling

2. **Navigation System**
   - Bottom tabs with badges
   - Route guards for auth
   - Deep linking support
   - Back navigation handling

3. **Data Hooks**
   - useAuth hook with session management
   - useDevice hook for pairing/status
   - useHealth hook for symptoms/BP
   - Error handling patterns

#### Phase 3.3: Health Features (Week 3)
1. **Dashboard Implementation**
   - Status cards with real data
   - Signal quality indicator
   - Holter study progress
   - Device battery status
   - Pull-to-refresh functionality

2. **Symptom Entry Flow**
   - Multi-step form wizard
   - Symptom selection grid
   - Intensity slider component
   - Trigger multi-select
   - Duration picker
   - Notes textarea
   - Confirmation screen
   - Success animation

3. **Blood Pressure Entry**
   - Date/time selector
   - Dual measurement inputs
   - Arm selection toggle
   - Historical chart view

#### Phase 3.4: Advanced Features (Week 4)
1. **ECG Viewer**
   - Canvas-based waveform renderer
   - Real-time data subscription
   - Dual-channel display
   - Scale controls (5/10/20 mm/mV)
   - Heart rate display
   - Signal quality badges
   - Recording controls

2. **Health Log & Diary**
   - Calendar view component
   - Entry list with filters
   - Detail view modals
   - Edit/delete functionality
   - Search implementation

3. **Device Management**
   - Discovery animation
   - Pairing flow wizard
   - Connection status cards
   - Settings management
   - Firmware update mock

### State Management Strategy

#### Global State (React Context)
```typescript
// AuthContext
- user: User | null
- session: AuthSession | null
- login/logout methods
- session validation

// DeviceContext  
- devices: Device[]
- activeDevice: Device | null
- connectionStatus
- pairing methods

// ThemeContext
- theme preferences
- ECG scale settings
- notification settings
```

#### Local State
- Form data (react-hook-form)
- UI state (modals, tabs, etc.)
- Pagination/filters
- Temporary selections

#### Data Fetching Pattern
```typescript
// Custom hook example
function useSymptoms() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    mockAPI.getSymptoms()
      .then(setSymptoms)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { symptoms, loading, error, refetch };
}
```

### Performance Optimizations
1. **Code Splitting**
   - Route-based splitting with Next.js
   - Lazy load heavy components (ECG viewer)
   - Dynamic imports for modals

2. **Data Optimization**
   - Pagination for long lists
   - Virtual scrolling for logs
   - Debounced search inputs
   - Memoized calculations

3. **Rendering Optimization**
   - React.memo for pure components
   - useMemo for expensive computations
   - useCallback for stable references
   - Skeleton loading states

### Testing Strategy
1. **Component Testing**
   - Unit tests with Vitest
   - Component tests with Testing Library
   - Mock API responses

2. **Integration Testing**
   - User flow tests
   - API integration tests
   - Navigation tests

3. **E2E Testing**
   - Critical paths with Playwright
   - Device pairing flow
   - Symptom entry flow
   - Authentication flow

### Accessibility Requirements
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader announcements
- High contrast mode support
- Focus management
- Error message clarity

### Ready for Implementation
- ✅ Mock API fully documented and tested
- ✅ Type definitions complete
- ✅ Data generators working
- ✅ Real-time subscriptions available
- ✅ Authentication methods ready
- ✅ Device simulation functional
- ✅ Health data persistence working