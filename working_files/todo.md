# SCLA Clone Implementation Todo List

## Current Sprint: Settings & Mobile UI Implementation

### ✅ Completed Today (Jan 27)

#### Mobile UI
- [x] Created IPhoneFrame component with realistic iPhone 14 design
- [x] Added conditional iPhone frame for development mode
- [x] Fixed navigation - removed "+ Log" tab (now 3 tabs)
- [x] Converted "+" to FAB that opens modal
- [x] Added hamburger menu to top header

#### Settings Pages
- [x] User Settings page with profile info
- [x] View Clinic page with contact details
- [x] Language selection page (12 languages)
- [x] About page with mission and features
- [x] Help page with FAQ and Contact sections
- [x] Contact Us form page
- [x] FAQ expandable page
- [x] Advanced Settings menu
- [x] Privacy & Security settings
- [x] Notifications settings
- [x] Data Export settings
- [x] Data Upload settings
- [x] Battery Optimization settings
- [x] Debug Logs page

### 🚧 Remaining Tasks

#### Symptom Entry Flow (Based on Screenshots #14-21)
- [x] Main symptom entry screen with date/time selection
- [x] Symptom search and grid selection
- [x] Selected symptoms display as blue pills
- [x] "See More" expandable symptom list
- [x] Add More Details screen with collapsible sections
- [x] Intensity slider (0-10 with gradient)
- [x] Trigger selection with search
- [x] Duration selection (Ongoing/On and off)
- [x] Notes textarea
- [x] Success screen with illustration
- [x] Fix time picker interaction - make it clickable
- [x] Fix ADD button aspect ratio (width >> height)
- [ ] Test complete symptom flow
- [x] Add custom symptom functionality

#### Diary Tab Fixes ✅ COMPLETED
- [x] Create empty state with illustration
- [x] Implement calendar day selection with proper highlighting
- [x] Connect to mockAPI to show actual logged entries
- [x] Create entry cards matching screenshot design
- [x] Add timeline indicator for current time
- [x] Implement detailed view modal/page
- [x] Add Edit/Remove functionality
- [x] Create month/year picker component
- [x] Make settings and help icons interactive
- [x] Create Manage Symptoms & Triggers settings page
- [x] Ensure mock data generates June entries (visit /regenerate-data to refresh)
- [x] Fix loading screen issue - added checkSession method
- [x] Fix regenerate-data redirect to dashboard

#### Blood Pressure Entry Flow (Based on Screenshots #22-24) ✅ COMPLETED
- [x] Step 1: Date/time selection - integrated into single page
- [x] Step 2: BP value inputs (systolic/diastolic) - dual measurements
- [x] Step 3: Arm selection - defaulted to left arm as per screenshots
- [x] Success confirmation - separate success page
- [x] Form validation - range checking and required fields

#### Additional Features
- [x] Delete Account flow
- [x] Privacy Policy page
- [x] Terms of Service page
- [x] Open Source Licenses page
- [ ] Password reset flow
- [ ] Offline mode handling

#### Polish & Testing
- [ ] Test all navigation paths with Puppeteer
- [ ] Ensure all forms have proper validation
- [ ] Add loading states where needed
- [ ] Check responsive design
- [ ] Verify toast messages work correctly
- [ ] Test iPhone frame on different screen sizes

### 🔥 Urgent Fixes
- [x] Fix iPhone frame scrolling issue
- [x] Add carousel to welcome screen with two provided images
- [x] Test scrolling functionality
- [x] Fix mockAPI.getCurrentUser error
- [x] Fix all toast errors (addToast -> showToast)
- [x] Redesign Advanced Settings to match screenshots
- [x] Create missing advanced settings pages
- [x] Fix navigation tabs to be inside iPhone frame
- [x] Remove excessive empty space in welcome and dashboard
- [x] Remove device tab, keep only Home and Diary tabs
- [x] Fix regenerate-data TypeError (data.users[0] -> data.user)
- [x] Add regenerateData method to mockAPI
- [x] Improve regenerate-data page with progress indicators
- [x] Add automatic data regeneration if missing
- [x] Add helpful tip in diary when no data exists

### ✅ Blood Pressure Entry Flow Complete
- [x] Fixed TimePicker component props mismatch (was expecting Date/onChange, got time/onTimeChange)
- [x] Fixed "Add Blood Pressure" button dead issue (wrong API method name)
- [x] Fixed duplicate hamburger menu (conditional header rendering in main layout)
- [x] Implemented complete BP entry flow with success page
- [x] Added proper user authentication check
- [x] Form validation with error messages
- [x] Created Puppeteer test script for testing

### ✅ Navigation Centralization Complete
- [x] Created HeaderContext for centralized state management
- [x] Created SharedHeader component
- [x] Updated main layout with HeaderProvider
- [x] Migrated dashboard to use centralized header
- [x] Migrated diary to use centralized header
- [x] Migrated blood pressure entry to use centralized header
- [x] Migrated symptom entry to use centralized header
- [x] Removed all duplicate hamburger menus
- [x] Single NavigationDrawer instance

### Next Priority
1. ✅ Complete symptom entry flow (7 steps) - DONE
2. ✅ Blood pressure entry flow (3 steps) - DONE
3. ✅ Fix duplicate hamburger menus - DONE
4. Update remaining pages (ECG, Holter Study) to use centralized header
5. Test all navigation paths with consistent headers
6. Add any missing features or polish

## Implementation Notes
- All settings pages follow consistent design patterns
- Toggle switches use SCLA blue when active
- Forms include proper validation and feedback
- Navigation includes back buttons on all sub-pages
- Modal animations use Framer Motion