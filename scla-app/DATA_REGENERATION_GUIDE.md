# Data Regeneration Guide

## Overview
The SCLA Clone app uses mock data stored in localStorage. If you're not seeing data in the diary (especially for June 2024), you can regenerate fresh test data.

## How to Regenerate Data

### Method 1: Automatic (Recommended)
1. Navigate to: `http://localhost:3000/regenerate-data`
2. Wait for the regeneration process to complete (about 3 seconds)
3. You'll be automatically redirected to the dashboard
4. Check the diary tab - you should now see entries for June 2024

### Method 2: Manual Browser Console
1. Open Developer Tools (F12)
2. Go to the Console tab
3. Run: `localStorage.clear()`
4. Refresh the page
5. The app will automatically generate new data on startup

## What Gets Generated

When data is regenerated, you get:
- **6 months of symptom history** with realistic patterns
- **6 months of blood pressure readings** with morning/evening variations
- **Guaranteed June 2024 entries** for testing:
  - 6 symptom entries throughout June
  - 6 blood pressure readings throughout June
- **Active Holter study** in progress
- **Default user profile** (John Doe)

## Troubleshooting

### Issue: Still no data after regeneration
1. Check browser console for errors
2. Try Method 2 (manual clear)
3. Make sure you're logged in (use email: john.doe@example.com, password: password123)

### Issue: Can't access /regenerate-data
Make sure the development server is running:
```bash
cd scla-app
npm run dev
```

### Issue: Data disappears after refresh
This is normal behavior if you're in incognito/private mode. The app uses localStorage which is cleared in private browsing.

## Technical Details

The regeneration process:
1. Clears existing symptom and BP data
2. Uses `SymptomGenerator` to create 6 months of symptoms
3. Uses `BloodPressureGenerator` to create 6 months of BP readings
4. Both generators include specific June 2024 entries
5. Saves everything to localStorage

The generators ensure realistic data patterns:
- Symptoms: 60% of days have no symptoms, 30% have 1, 8% have 2, 2% have 3
- Blood pressure: 60% morning readings, 40% evening readings
- Circadian rhythm: Lower BP in morning, higher in evening