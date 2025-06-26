# SCLA Clone Implementation Todo List

## Phase 1: Research & Analysis ✓

### Documentation Analysis ✓
- [x] Read SCLA Complete Reconstruction Documentation
- [x] Analyze Screen Analysis document
- [x] Study Data Models and Backend Requirements
- [x] Review Navigation Flows document
- [x] Create screenshot-to-screen mapping
- [x] Document all UI components and patterns

### Mock Data Architecture ✓
- [x] Design User data model and generator
- [x] Design Device data model and generator
- [x] Design ECG data simulator
- [x] Design Symptom data generator
- [x] Design Blood Pressure data generator
- [x] Design Holter Study data model
- [x] Create data persistence strategy
- [x] Design real-time update system

### Project Planning ✓
- [x] Create detailed component hierarchy
- [x] Plan routing structure
- [x] Design state management architecture
- [x] Create folder structure
- [x] Document mock API endpoints

## Phase 2: Foundation Setup ✓

### Project Initialization ✓
- [x] Create Next.js project
- [x] Configure TypeScript
- [x] Set up Tailwind CSS
- [x] Configure development tools
- [ ] Install shadcn/ui (pending for Phase 3)

### Mock Data Implementation ✓
- [x] Create TypeScript interfaces (17 interfaces)
- [x] Implement data generators (symptoms, BP, users)
- [x] Create mock API service (complete with all endpoints)
- [x] Implement localStorage persistence
- [x] Create data seeders (6 months of data)
- [x] ECG waveform generator (250Hz PQRST)
- [x] Device status simulator
- [x] Add comprehensive JSDoc documentation

### Core Infrastructure (Pending for Phase 3)
- [ ] Create layout components
- [ ] Set up routing
- [ ] Implement navigation system
- [ ] Create theme configuration
- [ ] Set up state management

## Phase 3: UI Implementation

### Phase 3.1: Foundation Setup (Week 1)

#### Environment & Dependencies
- [ ] Install shadcn/ui CLI: `npx shadcn-ui@latest init`
- [ ] Configure shadcn/ui with Next.js and Tailwind
- [ ] Install react-hook-form and zod
- [ ] Install framer-motion for animations
- [ ] Install recharts for data visualization
- [ ] Configure path aliases in tsconfig.json

#### Design System Setup
- [ ] Create theme configuration in tailwind.config.ts
- [ ] Define color palette matching screenshots
- [ ] Set up typography scale
- [ ] Configure spacing system
- [ ] Create CSS variables for theme

#### Base UI Components
- [ ] Import shadcn/ui Button component
- [ ] Customize Button for full-width blue style
- [ ] Import shadcn/ui Card component
- [ ] Import shadcn/ui Input component
- [ ] Import shadcn/ui Dialog component
- [ ] Import shadcn/ui Tabs component
- [ ] Import shadcn/ui Select component
- [ ] Import shadcn/ui Slider component
- [ ] Import shadcn/ui Calendar component
- [ ] Import shadcn/ui Toast component
- [ ] Create LoadingSpinner component
- [ ] Create SkeletonLoader component
- [ ] Create EmptyState component
- [ ] Create ErrorBoundary component
- [ ] Create StatusBadge component (pill-shaped)
- [ ] Create DynamicIsland component (black pill)

#### Layout Infrastructure
- [ ] Create (auth) route group with layout
- [ ] Create (main) route group with layout
- [ ] Build BottomNavigation component
- [ ] Build TopBar component
- [ ] Build NavigationDrawer component
- [ ] Implement PageTransition wrapper
- [ ] Set up responsive grid system
- [ ] Configure theme colors in globals.css

### Phase 3.2: Core Features (Week 2)

#### Authentication System
- [ ] Create AuthContext with mockAPI integration
- [ ] Implement useAuth hook
- [ ] Build welcome/page.tsx matching IMG_5815:
  - [ ] SKIIN logo and "Track" tagline
  - [ ] Custom illustration with health icons
  - [ ] Page indicator dots
  - [ ] "Get Started" button
  - [ ] "Already have an account? Sign In" link
- [ ] Create login/page.tsx matching IMG_5816:
  - [ ] Email and password inputs
  - [ ] Password visibility toggle
  - [ ] "Forgot Password?" link
  - [ ] Alternative auth method buttons
- [ ] Build QRScanner mock component
- [ ] Create SixDigitInput component
- [ ] Add terms acceptance screen (IMG_5843)
- [ ] Add session persistence check on app load
- [ ] Create protected route middleware
- [ ] Add logout functionality

#### Navigation & Routing
- [ ] Set up app router structure
- [ ] Configure bottom tab routes
- [ ] Implement route guards
- [ ] Add loading states for route transitions
- [ ] Create breadcrumb component
- [ ] Handle back navigation
- [ ] Add deep linking support

#### Data Management Hooks
- [ ] Create useDevice hook with pairing logic
- [ ] Create useECGStream hook with subscription
- [ ] Create useHealth hook for symptoms/BP
- [ ] Create useToast hook for notifications
- [ ] Implement error handling patterns
- [ ] Add data caching strategy
- [ ] Create refresh/refetch utilities

### Phase 3.3: Health Features (Week 3)

#### Dashboard Screen (IMG_5824)
- [ ] Create dashboard/page.tsx layout
- [ ] Add "Good morning!" greeting header
- [ ] Build GARMENT SIGNAL STATUS card:
  - [ ] Red "NO SIGNAL" badge with X icon
  - [ ] Status message text
  - [ ] Chevron for navigation
- [ ] Create BatteryOptimizationModal:
  - [ ] Modal overlay
  - [ ] Two button options (No/Yes)
  - [ ] Auto-show on first load
- [ ] Build 14-DAY PROGRESS section:
  - [ ] Progress bar visualization
  - [ ] "0h 0min" text displays
  - [ ] Green progress indicator
- [ ] Add pull-to-refresh functionality
- [ ] Implement real-time updates

#### Symptom Entry Flow
- [ ] Create symptom/layout.tsx for wizard
- [ ] Build symptom selection grid (page 1)
- [ ] Create IntensitySlider component (page 2)
- [ ] Build TriggerSelector multi-select (page 3)
- [ ] Create duration picker UI (page 4)
- [ ] Build notes textarea page (page 5)
- [ ] Create confirmation screen (page 6)
- [ ] Build success animation page (page 7)
- [ ] Add form state persistence
- [ ] Implement back/next navigation
- [ ] Add progress indicator

#### Blood Pressure Entry
- [ ] Create BP entry route structure
- [ ] Build date/time selector page
- [ ] Create dual measurement input UI
- [ ] Build arm selection toggle
- [ ] Add BP confirmation screen
- [ ] Create BP history chart view
- [ ] Implement form validation

#### Health Log & Diary
- [ ] Create log/page.tsx with tabs
- [ ] Build calendar view component
- [ ] Create SymptomCard component
- [ ] Create BloodPressureCard component
- [ ] Build entry list with filters
- [ ] Implement search functionality
- [ ] Add edit/delete modals
- [ ] Create detail view overlays

### Phase 3.4: Advanced Features (Week 4)

#### ECG Viewer (IMG_5830)
- [ ] Create ecg/page.tsx layout
- [ ] Build header with back button and title
- [ ] Create heart rate display (red heart icon + BPM)
- [ ] Build ECGCanvas component:
  - [ ] Grid paper background pattern
  - [ ] Three channel layout (CHANNEL 1, 2, 3)
  - [ ] Blue ECG waveform lines
  - [ ] Real-time animation
- [ ] Add signal quality badges:
  - [ ] "GOOD SIGNAL" green badges
  - [ ] Position next to channel labels
- [ ] Create scale selector dropdown:
  - [ ] 10.0, 5.0, 2.5 mm/mV options
  - [ ] Floating card design
- [ ] Add disclaimer text at bottom
- [ ] Implement real-time data subscription
- [ ] Add "now" indicator (green badge)
- [ ] Optimize Canvas rendering performance

#### Device Management (IMG_5817-5823)
- [ ] Create device pairing flow:
  - [ ] "Add Garment" intro screen (IMG_5817)
  - [ ] Pod discovery animation (IMG_5818)
  - [ ] Multiple pods selection (IMG_5819)
  - [ ] Serial number display
  - [ ] Pod illustration with arrow
  - [ ] Pairing success screen (IMG_5821)
- [ ] Build Check Garment Position (IMG_5823):
  - [ ] Instructional text
  - [ ] Garment photo reference
  - [ ] Battery/Signal/Connection icons
  - [ ] Status indicators (50%, Signal, Connected)
- [ ] Create device settings page
- [ ] Implement unpair functionality
- [ ] Add device rename feature

#### Settings & Advanced
- [ ] Create settings route structure
- [ ] Build user preferences form
- [ ] Create notification settings
- [ ] Add data upload preferences
- [ ] Build theme switcher
- [ ] Create about/help pages
- [ ] Add privacy policy page
- [ ] Implement data export feature

### Phase 3.5: Integration & Polish

#### State Management
- [ ] Implement DeviceContext provider
- [ ] Add ThemeContext provider
- [ ] Connect all screens to contexts
- [ ] Add optimistic UI updates
- [ ] Implement error recovery

#### Performance Optimization
- [ ] Add React.memo to components
- [ ] Implement virtual scrolling for logs
- [ ] Add lazy loading for routes
- [ ] Optimize bundle size
- [ ] Add service worker for offline

#### Testing
- [ ] Set up Vitest configuration
- [ ] Write unit tests for hooks
- [ ] Add component tests
- [ ] Create integration tests
- [ ] Set up Playwright for E2E

### Current Priority Tasks
- [ ] Install and configure shadcn/ui
- [ ] Set up app router structure
- [ ] Create AuthContext and useAuth hook
- [ ] Build welcome and login screens
- [ ] Implement bottom navigation

## Phase 4: Integration & Polish

### Data Integration
- [ ] Connect screens to mock data
- [ ] Implement data flow
- [ ] Add real-time updates
- [ ] Test data persistence

### UI/UX Polish
- [ ] Add animations
- [ ] Implement loading states
- [ ] Add error handling
- [ ] Create empty states
- [ ] Test responsiveness

### Testing & Documentation
- [ ] Write component tests
- [ ] Create user guide
- [ ] Document API
- [ ] Create demo scenarios

## Current Sprint (Phase 3.1 - Week 1)
- [ ] Run `npx shadcn-ui@latest init` in scla-app directory
- [ ] Configure components.json for shadcn/ui
- [ ] Install additional dependencies (framer-motion, react-hook-form, zod, recharts)
- [ ] Create app router folder structure
- [ ] Import first batch of shadcn/ui components
- [ ] Build AuthContext and authentication flow
- [ ] Create welcome screen with animations
- [ ] Implement login form with all three methods
- [ ] Set up bottom navigation component
- [ ] Create main app layout

## Completed Tasks Summary
### Phase 1 & 2 ✓
- Created comprehensive mock data layer (1,057 lines)
- Implemented all data models and types
- Built real-time ECG generation
- Created device simulation system
- Added 6 months of historical data
- Documented all functions with JSDoc
- Set up localStorage persistence
- Created complete mock API service