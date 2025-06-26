# SCLA App Navigation Flows and Component Interactions

## Main Navigation Structure

### Bottom Tab Navigation
The app uses a bottom tab navigation with three main sections:
- **Home** (🏠): Main dashboard and status overview
- **Log** (➕): Data entry and logging functionality  
- **Diary** (📖): Historical data viewing and management

### Top Navigation Elements
- **Hamburger Menu (≡)**: Side navigation access (appears on Home and Diary)
- **Signal Status Indicator**: Shows garment connection status (NO SIGNAL/GOOD SIGNAL)
- **Help Icon (?)**: Context-sensitive help (appears on Diary)
- **Settings Icon (⚙)**: Quick settings access (appears on Diary)

## Authentication Flow

```
Welcome Screen (IMG_5815) 
    ↓ "Get Started"
Registration Flow (not shown)
    ↓ "Sign In" 
Sign In Screen (IMG_5816)
    ↓ Multiple auth options:
    • Email/Password → Main App
    • 6-Digit Number → Alternative auth
    • QR Code → Alternative auth
    • Forgot Password → Password reset
```

## Device Pairing Flow

```
Sign In Success
    ↓
Device Pairing Screen (IMG_5817)
    ↓ "Pair Pod"
Pod Selection Screen (IMG_5820)
    ↓ Select pod + "Pair Pod"
Connecting Screen (IMG_5822)
    ↓ Connection success
Main Dashboard (IMG_5824/5825)
```

## Home Tab Flow

```
Home Dashboard (IMG_5824/5825)
    ├─ Hamburger Menu (≡)
    │   └─ Side Navigation (not shown)
    │
    ├─ Signal Status Card
    │   └─ Garment Signal Status (IMG_5827)
    │       ├─ ECG Viewer with real-time data
    │       ├─ Signal quality indicators
    │       └─ Troubleshooting options
    │
    ├─ Holter Study Progress
    │   └─ Expandable progress details
    │
    └─ Battery Optimization Popup
        ├─ "No" → Dismiss popup
        └─ "Yes" → Phone settings
```

## Log Tab Flow

```
Log Tab (IMG_5855)
    ↓ Tap "+" or Log tab
Log Modal: "What would you like to add?"
    ├─ Symptom
    │   └─ Symptom Entry Flow
    └─ Blood Pressure  
        └─ Blood Pressure Entry Flow
```

### Blood Pressure Entry Flow

```
Blood Pressure Form (IMG_5856)
    ↓ Fill date/time + measurements
Blood Pressure with Keypad (IMG_5857)
    ↓ Enter values via numeric keypad
Blood Pressure Confirmation (IMG_5858)
    ↓ "Close"
Return to Log/Home
```

### Symptom Entry Flow

```
Symptom Form (IMG_5859)
    ↓ Select date/time + symptoms
Expanded Symptom List (IMG_5860)
    ↓ Select symptoms
    ├─ "Save" → Basic symptom entry
    └─ "Add More Details"
        ↓
        Symptom Details (IMG_5861)
            ↓ Expand symptom
        Detailed Form (IMG_5862)
            ↓ Set intensity + triggers
        Complete Details (IMG_5863)
            ↓ Add duration + notes
        Custom Trigger Entry (IMG_5864)
            ↓ "Save"
        Symptom Confirmation (IMG_5865)
            ↓ "Close"
        Return to Log/Home
```

## Diary Tab Flow

```
Diary Tab (IMG_5866)
    ├─ Calendar Navigation
    │   ├─ Month/Year Dropdown
    │   ├─ Date Selection
    │   └─ Refresh Button
    │
    ├─ Entry List (when data exists)
    │   └─ Entry Cards
    │       └─ Symptom Detail View (IMG_5868)
    │           ├─ "Edit Symptom" → Edit flow
    │           └─ "Remove Symptom" → Delete confirmation
    │
    ├─ Empty State (IMG_5867)
    │   └─ Welcome message when no data
    │
    ├─ Help Icon (?)
    │   └─ Help/Support content
    │
    └─ Settings Icon (⚙)
        └─ Settings menu
```

## Settings and Management Flows

```
Advanced Settings (IMG_5854)
    ├─ User Profile Settings → Profile management
    ├─ Clinical Program → Program settings  
    ├─ Pod Management → Device Management (IMG_5853)
    │   ├─ Device details and status
    │   ├─ Sync information
    │   └─ "Forget Pod" → Unpair device
    ├─ Health & Wellness Data Upload
    │   ├─ WiFi only option
    │   └─ WiFi + Cellular option
    └─ Logout → Return to authentication
```

```
Manage Symptoms & Triggers (IMG_5869/5870)
    ├─ Symptoms Tab (IMG_5869)
    │   └─ Custom symptoms list (empty state shown)
    └─ Triggers Tab (IMG_5870)
        └─ Custom triggers list with delete options
```

## Modal and Popup Interactions

### Battery Optimization Popup (IMG_5824)
- **Trigger**: Appears on Home dashboard
- **Actions**: "No" (dismiss) or "Yes" (go to settings)
- **Context**: System optimization for better data collection

### Signal Status Popup (IMG_5827)
- **Trigger**: Poor signal quality detected
- **Actions**: "Troubleshoot" link or "X" to dismiss
- **Context**: ECG signal quality issues

### Add Data Modal (IMG_5855)
- **Trigger**: Tap "+" button or Log tab
- **Options**: Symptom or Blood Pressure entry
- **Context**: Quick access to data logging

## ECG Viewer Functionality (IMG_5827)

### Display Features
- **Real-time ECG waveforms**: Two channels (Channel 1 and Channel 3)
- **Signal quality indicators**: POOR SIGNAL/GOOD SIGNAL status
- **Heart rate display**: Shows current BPM (-- when no signal)
- **Scale adjustment**: Dropdown for mm/mV settings (10.0 mm/mV shown)

### Navigation and Controls
- **Back navigation**: Return to Home dashboard
- **Scale dropdown**: Adjust ECG display sensitivity
- **Signal quality alerts**: Popup notifications for poor signal
- **Troubleshooting**: Link to improve signal quality

### Data Analysis Integration
- **Automatic analysis**: ECG data analyzed when symptoms logged
- **Pending status**: Shows "Pending Analysis" and "Pending Review"
- **Notifications**: User notified when analysis complete

## Cross-Screen Data Flow

### Data Entry to Diary Flow
1. **Log Entry**: User enters data via Log tab
2. **Confirmation**: Success confirmation shown
3. **Diary Update**: Entry appears in Diary with timestamp
4. **Analysis Status**: Shows pending analysis/review status
5. **ECG Integration**: If available, ECG data analyzed automatically

### Signal Status Integration
- **Home Dashboard**: Shows current signal status
- **ECG Viewer**: Real-time signal quality monitoring  
- **Troubleshooting**: Guided steps to improve signal
- **Device Management**: Connection and sync status

### Settings Propagation
- **Data Upload Preferences**: Affects sync behavior across app
- **Device Settings**: Impacts data collection and display
- **Profile Settings**: Influences personalization throughout app

