# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ULTRA IMPORTANT
1. Follow the process outlined in @working_files/CLAUDE_PROCESS.md. It includes the agentic loop over which you should operate as well as a descriptions of all your modules and rules.
2. Your working files (always read and keep up to date):
  - planning and tasks: always plan your work in @working_files/planning.md and then generate your tasks in @working_files/todo.md
  - Event stream: log all events, tool use, reflections, assistant & user response, each event as a one line item in @working_files/event-stream.md
3. If you are not sure about something, you need to research it until you are sure. If you fail to, stop and ask me for clarifications. Never halucinate any material, documentation or code. You need to be sure that it is correct. If not FLAG and ASK. STOP and ASK if the information you need is important for continuing your work.
4. When planning for a complex request, take a phased approach:
  - Documentation and code understanding
  - Research online documentation, best practices and any other relevant material
  - Plan carefully and hollistically
  - Execute the plan
  - Review the generated deliverables checking wether they satisfy the initial request and requirements
  - Clean up the repository and docs

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## Project Overview

This is the SCLA (Skiin Connected Life App) Clone - a complete reconstruction of the SCLA app with comprehensive mock data infrastructure. The project simulates all backend functionality to enable full app features without requiring a real backend.

## Repository Structure

```
/
├── docs/                       # All project documentation
│   ├── SCLA-description/      # Current app analysis and reconstruction
│   │   ├── SCLA (Skiin Connected Life App) - Complete Reconstruction Documentation.md (1,244 lines)
│   │   ├── SCLA App Screen Analysis.md (1,131 lines)
│   │   ├── SCLA App Data Models and Backend Requirements.md (567 lines)
│   │   └── SCLA App Navigation Flows and Component Interactions.md (219 lines)
│   ├── SCLA-screenshots/     # Reference screenshots (56 screenshots: IMG_5815-5870.PNG)
│   └── scla-clone/           # SCLA Clone implementation documentation
│       ├── README.md         # Project overview and getting started
│       ├── MOCK_DATA_SPEC.md # Comprehensive mock data architecture (715 lines)
│       └── PHASE_1_2_REFLECTION.md # Phase 1 & 2 analysis and learnings (281 lines)
├── scla-app/                 # SCLA Clone implementation
│   └── (see SCLA Clone Project Structure below)
└── working_files/            # AI assistant working artifacts
    ├── CLAUDE_PROCESS.md     # Process methodology
    ├── todo.md              # Task tracking
    ├── planning.md          # Technical specifications
    └── event-stream.md      # Implementation history
```

## Key Documentation References

### SCLA Clone Documentation
1. **Getting Started**: `docs/scla-clone/README.md` - Project overview and setup instructions
2. **Mock Data Architecture**: `docs/scla-clone/MOCK_DATA_SPEC.md` - Complete mock data system documentation
3. **Project Reflection**: `docs/scla-clone/PHASE_1_2_REFLECTION.md` - Phase 1 & 2 achievements and learnings

### Original App Analysis
1. **Complete Reconstruction**: `docs/SCLA-description/SCLA (Skiin Connected Life App) - Complete Reconstruction Documentation.md` - Primary analysis document (1,244 lines)
2. **Screen Specifications**: `docs/SCLA-description/SCLA App Screen Analysis.md` - All 26 screens with ASCII mockups
3. **Data Models**: `docs/SCLA-description/SCLA App Data Models and Backend Requirements.md` - 17 database tables and API specs
4. **Navigation Flows**: `docs/SCLA-description/SCLA App Navigation Flows and Component Interactions.md` - User journeys and interactions

### App Architecture
- **Screens**: 26 unique screens identified and specified
- **Core Features**: ECG monitoring, symptom tracking, blood pressure logging, device management
- **Navigation**: Bottom tabs (Dashboard, ECG, Log, Device) + modals + drawer
- **Integration**: SKIIN wearable ECG devices via Bluetooth

## Development Status

**Current Phase**: Phase 2 Complete, Ready for Phase 3 (UI Implementation)

### Tech Stack
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Mock Backend**: localStorage + TypeScript classes
- **Real-time**: Simulated WebSocket with intervals
- **Testing**: To be implemented with Vitest + Testing Library
- **Validation**: TypeScript interfaces (Zod to be added)

### Completed Phases
1. **Phase 1: Research & Analysis** ✅
   - Analyzed 3,161 lines of documentation
   - Identified 26 unique screens
   - Mapped all user flows and interactions
   - Extracted 17 data models

2. **Phase 2: Foundation & Mock Data** ✅
   - Created Next.js project with TypeScript
   - Implemented complete mock data layer (8 modules)
   - Real-time ECG generation at 250Hz
   - Device simulation with battery drain
   - 6 months of historical data generation
   - Data persistence with localStorage
   - Comprehensive JSDoc documentation

### Upcoming Phases
3. **Phase 3: UI Implementation** 🚧 Next
   - Create component library
   - Implement all 26 screens
   - Connect to mock data
   - Add animations and transitions

4. **Phase 4: Polish & Testing** ⏳
   - Add loading/error states
   - Implement tests
   - Performance optimization
   - Documentation cleanup

## Working Process (Reference @working_files/CLAUDE_PROCESS.md)

### Development Commands
```bash
cd scla-app
npm install                         # Install dependencies
npm run dev                        # Start development server (port 3000)
npm run build                      # Build for production
npm run start                      # Start production server
npm run lint                       # Run ESLint
```

## Key Features to Implement

### ECG Monitoring
- Real-time dual-channel display at 250Hz
- Signal quality indicators
- Scale adjustment (5, 10, 20 mm/mV)
- Heart rate display
- WebSocket simulation for streaming

### Symptom Tracking
- Predefined symptoms (14 options)
- Custom symptom creation
- Intensity scale (1-10)
- Duration tracking (ongoing/intermittent)
- Trigger associations
- Automatic analysis simulation

### Blood Pressure
- Dual measurement support
- Left/right arm selection
- Morning/evening patterns
- Historical trends
- Note attachments

## Data Models (Already Implemented)

All TypeScript interfaces defined in `src/types/index.ts`:
- **User**: Profile with authentication and preferences
- **Device**: SKIIN pod hardware information
- **UserDevice**: Device pairing and settings
- **Symptom**: Complete symptom tracking with analysis
- **BloodPressureReading**: BP measurements with metadata
- **ECGRealtimeData**: Streaming ECG data structure
- **HolterStudy**: Long-term monitoring progress
- **AuthSession**: Authentication tokens and expiry
- **DiaryEntry**: Unified health log entries
- Plus 8 more supporting interfaces

## Important Notes

- This is a healthcare application - prioritize data security and privacy
- All mock data is realistic but completely fictional
- Timestamps properly handle timezones via Date objects
- Device connectivity states are fully simulated
- Offline-first with localStorage persistence
- All functions have comprehensive JSDoc documentation

## SCLA Clone Implementation Details

### Project Structure
```
scla-app/
├── src/
│   ├── app/                         # Next.js app directory
│   │   ├── layout.tsx              # Root layout
│   │   ├── globals.css             # Global styles
│   │   └── (routes)                # Route groups
│   ├── components/                  # React components
│   │   ├── ui/                     # Basic UI components
│   │   ├── layout/                 # Layout components
│   │   ├── ecg/                    # ECG-specific components
│   │   └── forms/                  # Form components
│   ├── lib/                        # Utility functions
│   ├── hooks/                      # Custom React hooks
│   ├── types/                      # TypeScript type definitions
│   └── mock/                       # Mock data layer (fully documented with JSDoc)
│       ├── api.ts                  # Mock API service - main entry point (289 lines)
│       ├── storage.ts              # localStorage wrapper - data persistence (281 lines)
│       ├── ecgGenerator.ts         # ECG waveform generator - PQRST complexes (112 lines)
│       ├── deviceSimulator.ts      # Device status simulator - battery/connection (57 lines)
│       ├── dataGenerators.ts       # Data generators - symptoms/BP history (159 lines)
│       ├── constants.ts            # Mock data constants - predefined values (84 lines)
│       └── utils.ts                # Utility functions - helpers (75 lines)
├── public/                         # Static assets
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── tailwind.config.ts              # Tailwind CSS config
├── next.config.js                  # Next.js config
└── postcss.config.js              # PostCSS config
```


### Mock Data System (Fully Implemented)

#### Authentication
- Email/password: john.doe@example.com / password123
- QR code login (any string containing 'valid')
- 6-digit code login (any 6 digits)
- Session management with 15-minute expiry

#### Device Simulation
- Bluetooth discovery with 3 mock devices
- Pairing process with 3-second delay
- Battery drain: 0.001% per minute when connected
- Connection fluctuations: 1% chance per update
- 15-minute sync cycles
- Signal strength variations (±5 dBm)

#### Health Data
- ECG: 250Hz dual-channel with PQRST complexes
- Symptoms: 6 months history, weighted distribution
- Blood pressure: Circadian rhythm patterns
- Analysis: Auto-completes after 15 seconds
- Custom symptoms and triggers

#### Data Persistence
- Complete localStorage implementation
- Date revival for proper JSON parsing
- Session persistence across browser restarts
- Offline-first architecture

### Access Mock API
```typescript
import { mockAPI } from '@/mock/api';

// Examples:
const session = await mockAPI.login(email, password);
const devices = await mockAPI.discoverDevices();
const unsubscribe = mockAPI.subscribeToECG(callback);
```

### Implementation Status
Phase 1: ✅ Research & Analysis - Complete
Phase 2: ✅ Foundation & Mock Data - Complete
- [x] Project setup with Next.js 14
- [x] TypeScript configuration
- [x] Complete mock data architecture
- [x] All data generators implemented
- [x] Real-time ECG simulation
- [x] Device status simulation
- [x] Data persistence layer
- [x] Comprehensive JSDoc documentation
Phase 3: 🚧 Screen Implementation - Ready to Start
- [ ] UI component library
- [ ] Navigation structure
- [ ] All 26 screens
- [ ] Connect to mock data
Phase 4: ⏳ Integration & Polish - Pending