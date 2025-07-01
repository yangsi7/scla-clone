# Manual Blood Pressure Entry Flow Test

## Test Steps

1. **Navigate to the app**: http://localhost:3000
   - Verify the dashboard loads

2. **Click the blue "+" FAB button** (bottom right)
   - Verify the Add modal opens with two options:
     - Symptom
     - Blood Pressure

3. **Click "Blood Pressure"**
   - Verify navigation to /blood-pressure/entry
   - Verify the page shows:
     - Date/Time selection (Today + current time)
     - AM/PM toggle
     - Instructions panel
     - First measurement fields
     - Second measurement fields

4. **Enter blood pressure values**:
   - First measurement: 120/80
   - Second measurement: 118/78
   - Click the "Add" button

5. **Verify success page**:
   - Should show success illustration
   - Message: "Your blood pressure has been added."
   - Click "Close" button

6. **Verify entry in diary**:
   - Click "Diary" tab
   - Should see the blood pressure entry with:
     - Time stamp
     - BP icon
     - Values (119/79 - average of two measurements)

## Expected Results
- ✅ Blood pressure entry flow completes without errors
- ✅ Data is saved and visible in diary
- ✅ All UI elements match the design
- ✅ Form validation works (requires at least first measurement)

## Known Issues to Check
- Label component import error (should be fixed)
- Time picker interaction
- AM/PM toggle functionality
- Success page navigation