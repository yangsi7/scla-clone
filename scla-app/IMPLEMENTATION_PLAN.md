# SCLA Clone UI Implementation Plan

## Overview
This document outlines the implementation plan for the requested UI improvements and new screens for the SCLA app clone.

## 1. Mobile View Simulation (iPhone Frame)

### Requirements
- Add an iPhone frame wrapper around the app
- Maintain the app's responsive layout within the frame
- Include status bar, dynamic island, and home indicator

### Implementation Steps
1. Create `IPhoneFrame` component wrapper
2. Apply to root layout with conditional rendering
3. Add proper dimensions (390x844px for iPhone 14)
4. Include status bar with time, battery, signal icons
5. Keep existing dynamic island implementation
6. Add home indicator at bottom

## 2. Navigation Updates

### Current Issues
- Bottom navigation has "+ Log" instead of just "+"
- The "+" button currently links to /add page

### Required Changes
1. **Remove "Log" text from + button**
   - Update bottom navigation to show only the + icon
   - Position + button between Home and actual Log tab

2. **Update + button behavior**
   - Change from direct link to modal/drawer trigger
   - Show options: "Add Symptom" and "Add Blood Pressure"
   - Link each option to respective flows

## 3. Settings Pages Implementation

### 3.1 User Settings Page (`/settings/profile`)
- Profile information display/edit
- Name, email, date of birth, gender
- Change password option
- Notification preferences

### 3.2 View Clinics Page (`/clinic`)
Based on IMG_5838:
- Display current clinic: "Staging Clinic"
- Show clinic contact information
- Email: info@pace-cardiology.com
- Phone: 905 953-7917
- Fax: 905 953-0046
- Two office locations (Newmarket & Barrie)
- Link to terms of service

### 3.3 Language Settings (`/settings/language`)
Based on IMG_5840-5841:
- Current language display (English)
- Language selection page with options:
  - English (selected)
  - Deutsche
  - Français
  - Italiano
- Radio button selection
- Save button at bottom

### 3.4 About Page (`/about`)
Based on IMG_5842:
- SCLA-A Version: 2.4.0 (15)
- SCLA-A GTIN: 628341958240
- Mobile MBE Version: 0.2064.1
- MBE GTIN: 628341958257
- Links to:
  - Terms and Conditions
  - Privacy Policy

### 3.5 Help Page (`/help`)
- Two main sections:
  - Contact Us
  - FAQ
- Contact form with fields:
  - Subject
  - Message
  - Submit button
- FAQ with expandable sections

### 3.6 Advanced Settings (`/settings/advanced`)
- Sub-pages for:
  - Notifications settings
  - Data & Privacy
  - Device preferences
  - Debug options (for demo)

### 3.7 Terms Pages
Based on IMG_5839 & IMG_5844:
- Terms of Service page
- Privacy Policy page
- Terms and Conditions with checkbox acceptance
- Scrollable content area

## 4. Add Button Drawer Implementation

### Requirements
- Bottom drawer that slides up when + is pressed
- Two options with icons:
  - Add Symptom → Link to symptom flow
  - Add Blood Pressure → Link to BP flow
- Dark overlay background
- Smooth slide animation

## 5. Complete Symptom & BP Flows

### 5.1 Symptom Flow Enhancement
Current implementation exists, needs:
- Better navigation between steps
- Progress indicator
- Back button functionality
- Save to mock data on completion

### 5.2 Blood Pressure Flow Enhancement
Current implementation exists, needs:
- Complete validation
- Historical data display
- Chart visualization
- Save to mock data

## 6. Additional UI Polish

### 6.1 iPhone Status Bar
- Current time (dynamic)
- Signal strength bars
- WiFi indicator
- Battery percentage

### 6.2 Animations
- Page transitions (slide left/right)
- Modal appearances (slide up)
- Button press states
- Loading states

### 6.3 Empty States
- Notifications page (IMG_5834)
- Other data pages when no content

## Implementation Priority

### Phase 1 (Core Navigation)
1. Fix bottom navigation (remove "Log" text)
2. Implement Add button drawer
3. Add iPhone frame wrapper

### Phase 2 (Settings Pages)
1. User Settings
2. View Clinics
3. Language Settings
4. About Page
5. Help Page (Contact & FAQ)

### Phase 3 (Advanced Features)
1. Advanced Settings with sub-pages
2. Terms & Conditions pages
3. Privacy Policy page
4. Notifications page

### Phase 4 (Polish)
1. Complete symptom/BP flow enhancements
2. Add all animations
3. Implement empty states
4. Final UI adjustments

## Technical Considerations

### State Management
- Language preference in AuthContext
- Selected clinic information
- Notification settings

### Mock Data Updates
- Add clinic information to mock API
- Store language preference
- Save notification settings

### Routing Structure
```
/settings/
  ├── profile
  ├── language
  └── advanced/
      ├── notifications
      ├── privacy
      └── device
/clinic
/about
/help/
  ├── contact
  └── faq
/terms
/privacy
```

### Component Structure
```
components/
  ├── layout/
  │   ├── IPhoneFrame.tsx
  │   ├── AddButtonDrawer.tsx
  │   └── BottomNavigation.tsx (updated)
  ├── settings/
  │   ├── ProfileSettings.tsx
  │   ├── LanguageSelector.tsx
  │   └── AdvancedSettings.tsx
  └── clinic/
      └── ClinicInfo.tsx
```

## Success Criteria
- [ ] iPhone frame displays correctly
- [ ] Bottom nav shows only + icon (no "Log" text)
- [ ] + button opens drawer with two options
- [ ] All settings pages accessible from burger menu
- [ ] Language can be changed and persisted
- [ ] Clinic information displays correctly
- [ ] About page shows version info
- [ ] Help page has Contact and FAQ sections
- [ ] Terms and Privacy pages accessible
- [ ] All animations smooth and consistent
- [ ] Empty states show appropriate messages