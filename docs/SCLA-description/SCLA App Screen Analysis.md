# SCLA App Screen Analysis

## Screen 1: Welcome/Landing Screen (IMG_5815.PNG)

```
┌─────────────────────────────────────┐
│ 09:59                    ●●● ⚡ 📶 4 │
├─────────────────────────────────────┤
│                                     │
│              SKIIN                  │
│              Track                  │
│   your heart rate, location,        │
│   activity and body temperature.    │
│                                     │
│         [Illustration of            │
│          person with device         │
│          and health icons]          │
│                                     │
│            ● ○                      │
│                                     │
│            Welcome                  │
│     Get started using Skiin today!  │
│                                     │
│        [Get Started]                │
│                                     │
│   Already have an account? Sign In  │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- "Get Started" button → Leads to registration flow
- "Sign In" link → Leads to sign-in screen

**Purpose:** App introduction and entry point for new/existing users

---

## Screen 2: Sign In Screen (IMG_5816.PNG)

```
┌─────────────────────────────────────┐
│ 11:09                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│                                     │
│             Sign In                 │
│                                     │
│ Email                               │
│ [_________________________]        │
│                                     │
│ Password                            │
│ [_________________________] 👁      │
│                                     │
│ Forgot Password?                    │
│                                     │
│                                     │
│ Don't have an account?   Sign Up    │
│                                     │
│        [Sign In]                    │
│                                     │
│              OR                     │
│                                     │
│   [Sign In Using 6-Digit Number]    │
│                                     │
│   [🔲 Sign In Using QR Code]        │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Email input field
- Password input field  
- Eye icon → Toggle password visibility
- "Forgot Password?" link → Password reset flow
- "Sign Up" link → Registration flow
- "Sign In" button → Authenticate user
- "Sign In Using 6-Digit Number" button → Alternative auth method
- "Sign In Using QR Code" button → QR code authentication

**Purpose:** User authentication with multiple sign-in options

---

## Screen 3: Device Pairing Screen (IMG_5817.PNG)

```
┌─────────────────────────────────────┐
│ 11:10                   ●●● ⚡ 📶 17 │
├─────────────────────────────────────┤
│                                     │
│           Add Garment               │
│                                     │
│          Pair Your Pod              │
│                                     │
│ To get started, remove your pod     │
│ from the charging dock. Your Pod's  │
│ light should blink yellow to        │
│ indicate that it is ready to pair.  │
│                                     │
│                                     │
│        [Image of SKIIN pod          │
│         and charging dock]          │
│                                     │
│                                     │
│                                     │
│                                     │
│           [Pair Pod]                │
│                                     │
│           [Cancel]                  │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- "Pair Pod" button → Initiate Bluetooth pairing
- "Cancel" button → Return to previous screen

**Purpose:** Device setup and pairing instructions




---

## Screen 4: Select Pod for Pairing (IMG_5820.PNG)

```
┌─────────────────────────────────────┐
│ 11:10                   ●●● ⚡ 📶 17 │
├─────────────────────────────────────┤
│                                     │
│           Add Garment               │
│                                     │
│       Select Pod for Pairing        │
│                                     │
│ Select the serial number that       │
│ matches the Pod you want to pair.   │
│                                     │
│ Please choose any one from          │
│ available connections.              │
│                                     │
│  ○ #31067601890                     │
│  ○ #31046900579                     │
│  ○ #31048501123                     │
│                                     │
│                                     │
│           [Pair Pod]                │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Radio buttons for each pod serial number
- "Pair Pod" button → Initiate pairing with selected pod

**Purpose:** Select a specific pod for pairing from a list of available devices.

---

## Screen 5: Connecting Pod (IMG_5822.PNG)

```
┌─────────────────────────────────────┐
│ 11:10                   ●●● ⚡ 📶 17 │
├─────────────────────────────────────┤
│           <   Add Garment           │
│                                     │
│           Connecting Pod            │
│                                     │
│ We are now establishing a bluetooth │
│ connection to your Pod.             │
│                                     │
│        [Image of SKIIN pod]         │
│                                     │
│ Serial Number: 31067601890          │
│                                     │
│ This should just take a few seconds...│
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to previous screen

**Purpose:** Display the connection status while pairing with the pod.

---

## Screen 6: Home Dashboard with Popup (IMG_5824.PNG)

```
┌─────────────────────────────────────┐
│ 11:10                   ●●● ⚡ 📶 17 │
├─────────────────────────────────────┤
│  ≡                     [🚫 NO SIGNAL] │
│                                     │
│ Good morning!                       │
│                                     │
│ GARMENT SIGNAL STATUS              >│
│ [X NO SIGNAL] Your garment is not   │
│ currently capturing data.           │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   Optimize Battery Operation    │ │
│ │                                 │ │
│ │ Would you like to optimize the  │ │
│ │ phone settings for better data  │ │
│ │ collection?                     │ │
│ │                                 │ │
│ │        [No]        [Yes]        │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 14-DAY PROGRESS                     │
│  ...                                │
│                                     │
│ 🏠 Home    ➕ Log    📖 Diary      │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Hamburger menu (≡) → Open side navigation
- "NO SIGNAL" status → Go to signal status screen
- Garment Signal Status card → Go to signal status screen
- "No" button → Dismiss battery optimization popup
- "Yes" button → Go to phone settings for optimization
- Home, Log, Diary tabs → Navigate between main sections

**Purpose:** Main dashboard displaying key information and navigation, with a popup for battery optimization.

---

## Screen 7: Home Dashboard (IMG_5825.PNG)

```
┌─────────────────────────────────────┐
│ 11:11                   ●●● ⚡ 📶 17 │
├─────────────────────────────────────┤
│  ≡                     [🚫 NO SIGNAL] │
│                                     │
│ Good morning!                       │
│                                     │
│ GARMENT SIGNAL STATUS              >│
│ [X NO SIGNAL] Your garment is not   │
│ currently capturing data.           │
│                                     │
│ HOLTER STUDY PROGRESS               v │
│ Last updated 2025-06-24 at 10:21 AM │
│                                     │
│ Welcome!                            │
│ Check here for guidance and progress│
│ updates on your Holter study.       │
│                                     │
│ TODAY                               │
│ ...                                 │
│                                     │
│ 🏠 Home    ➕ Log    📖 Diary      │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Hamburger menu (≡) → Open side navigation
- "NO SIGNAL" status → Go to signal status screen
- Garment Signal Status card → Go to signal status screen
- Holter Study Progress dropdown → Expand/collapse progress details
- Home, Log, Diary tabs → Navigate between main sections

**Purpose:** Main dashboard displaying garment status and Holter study progress.

---

## Screen 8: Garment Signal Status (IMG_5827.PNG)

```
┌─────────────────────────────────────┐
│ 11:11                   ●●● ⚡ 📶 17 │
├─────────────────────────────────────┤
│           <   Garment Signal Status │
│                                     │
│  ♥ --                      [10.0 mm/mV] v │
│                                     │
│ CHANNEL 1  [POOR SIGNAL]            │
│ [ECG waveform graph]                │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        Poor Signal          X   │ │
│ │                                 │ │
│ │ Your signal quality is lower    │ │
│ │ than usual. Please Troubleshoot │ │
│ │ to improve your heart rate      │ │
│ │ readability.                    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ CHANNEL 3  [POOR SIGNAL]            │
│ [ECG waveform graph]                │
│                                     │
│ Disclaimer: ...                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to home dashboard
- Dropdown (10.0 mm/mV) → Change ECG display settings
- "Troubleshoot" link → Go to troubleshooting guide
- "X" on popup → Dismiss poor signal notification

**Purpose:** Display real-time ECG data with signal quality indicators and troubleshooting options.



---

## Screen 9: Log Tab with Add Modal (IMG_5855.PNG)

```
┌─────────────────────────────────────┐
│ 11:12                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│  ≡                     [🚫 NO SIGNAL] │
│                                     │
│ Good morning!                       │
│                                     │
│ GARMENT SIGNAL STATUS              >│
│ [✓ GOOD SIGNAL] You are capturing   │
│ good signal quality. Great job!     │
│                                     │
│ HOLTER STUDY PROGRESS               v │
│ Last updated 2025-06-24 at 10:21 AM │
│                                     │
│ Welcome!                            │
│ Check here for guidance and progress│
│ updates on your Holter study.       │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │   What would you like to add?   │ │
│ │                                 │ │
│ │  🔸 Symptom                    >│ │
│ │                                 │ │
│ │  🔴 Blood Pressure             >│ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🏠 Home    ➕ Log    📖 Diary      │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Hamburger menu (≡) → Open side navigation
- Garment Signal Status card → Go to signal status screen
- Holter Study Progress dropdown → Expand/collapse progress details
- "Symptom" option → Go to symptom entry form
- "Blood Pressure" option → Go to blood pressure entry form
- Home, Log, Diary tabs → Navigate between main sections

**Purpose:** Log tab interface with modal for adding new health data entries.

---

## Screen 10: Blood Pressure Entry Form (IMG_5856.PNG)

```
┌─────────────────────────────────────┐
│ 11:12                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Blood Pressure        │
│                                     │
│ When did you measure your blood     │
│ pressure?                           │
│                                     │
│ [📅 Today]                          │
│                                     │
│ [🕐 11:12]    ⚪ AM    ⚪ PM         │
│                                     │
│ [Illustration of person taking      │
│  blood pressure with instructions]  │
│                                     │
│ • Rest for 5 minutes before        │
│   measuring                         │
│ • Empty your bladder               │
│ • Sit with your back and arm       │
│   supported                         │
│ • Place feet flat on the floor     │
│ • Ensure cuff is at the level of   │
│   your heart                        │
│ • Do not talk while taking a       │
│   measurement                       │
│                                     │
│ First measurement                   │
│ [Systolic ___] mmHg                 │
│ [Diastolic ___] mmHg                │
│                                     │
│ Second measurement                  │
│ [Systolic ___] mmHg                 │
│ [Diastolic ___] mmHg                │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to Log tab
- Date field → Open date picker
- Time field → Open time picker
- AM/PM radio buttons → Select time period
- Systolic/Diastolic input fields → Enter blood pressure values

**Purpose:** Blood pressure entry form with instructions and dual measurement capability.

---

## Screen 11: Blood Pressure with Numeric Keypad (IMG_5857.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Blood Pressure        │
│                                     │
│ First measurement                   │
│ [128] mmHg                          │
│ [83] mmHg                           │
│                                     │
│ Second measurement                  │
│ [129] mmHg                          │
│ [85] mmHg                           │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │  1    2    3                    │ │
│ │      ABC   DEF                  │ │
│ │                                 │ │
│ │  4    5    6                    │ │
│ │ GHI  JKL  MNO                   │ │
│ │                                 │ │
│ │  7    8    9                    │ │
│ │PQRS  TUV  WXYZ                  │ │
│ │                                 │ │
│ │       0    ⌫                    │ │
│ │                                 │ │
│ │       🌐                        │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to Log tab
- Numeric keypad → Enter blood pressure values
- Delete key (⌫) → Remove last digit

**Purpose:** Blood pressure entry with filled values and numeric input interface.

---

## Screen 12: Blood Pressure Confirmation (IMG_5858.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Blood Pressure        │
│                                     │
│                                     │
│        [Illustration of woman       │
│         giving OK gesture]          │
│                                     │
│                                     │
│ Your blood pressure has been added. │
│                                     │
│                                     │
│            [Close]                  │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to Log tab
- "Close" button → Return to main interface

**Purpose:** Confirmation screen after successfully adding blood pressure data.

---

## Screen 13: Symptom Entry Form (IMG_5859.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Symptom               │
│                                     │
│ When did you experience these       │
│ symptoms?                           │
│                                     │
│ [📅 Today]                          │
│                                     │
│ [🕐 11:13]    ⚪ AM    ⚪ PM         │
│                                     │
│ What symptoms are you experiencing? │
│                                     │
│ [🔍 Search or add symptom] [+ ADD]  │
│                                     │
│ [Routine ECG]    [Fainting]         │
│                                     │
│ [Chest Pain / Discomfort]           │
│                                     │
│ [Chest Discomfort During Exercise]  │
│                                     │
│ [Palpitations]   [Shortness of      │
│                   Breath]           │
│                                     │
│ [Dizziness]      [Heart Pounding]   │
│                                     │
│ [See More ▼]                        │
│                                     │
│ [Save]          [Add More Details]  │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to Log tab
- Date field → Open date picker
- Time field → Open time picker
- AM/PM radio buttons → Select time period
- Search field → Search for symptoms
- "+ ADD" button → Add custom symptom
- Symptom buttons → Select predefined symptoms
- "See More" → Expand symptom list
- "Save" button → Save symptom entry
- "Add More Details" button → Go to detailed symptom form

**Purpose:** Symptom entry form with predefined options and custom entry capability.

---

## Screen 14: Expanded Symptom List (IMG_5860.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Symptom               │
│                                     │
│ What symptoms are you experiencing? │
│                                     │
│ [🔍 Search or add symptom] [+ ADD]  │
│                                     │
│ [Brain Fog]      [Routine ECG]      │
│                                     │
│ [Fainting]       [Chest Pain /      │
│                   Discomfort]       │
│                                     │
│ [Chest Discomfort During Exercise]  │
│                                     │
│ [Palpitations]   [Shortness of      │
│                   Breath]           │
│                                     │
│ [Dizziness]      [Heart Pounding]   │
│                                     │
│ [Fatigue         [Fatigue           │
│  (Physical)]      (Mental)]         │
│                                     │
│ [Insomnia]       [Sweating]         │
│                                     │
│ [Wheezing Cough]                    │
│                                     │
│ [Save]          [Add More Details]  │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- All symptom buttons → Select symptoms (Brain Fog is selected)
- Other elements same as previous screen

**Purpose:** Expanded symptom selection with "Brain Fog" selected.

---

## Screen 15: Symptom Details Form (IMG_5861.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Add More Details      │
│                                     │
│ Add additional details to symptoms  │
│                                     │
│ Tap on each symptom to add details  │
│ such as severity, possible triggers,│
│ duration and notes. Once you are    │
│ finished, tap the Save button below.│
│                                     │
│ [Brain Fog                       ▼] │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│            [Save]                   │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to symptom form
- "Brain Fog" dropdown → Expand symptom details
- "Save" button → Save symptom with details

**Purpose:** Symptom details entry screen with expandable symptom sections.

---

## Screen 16: Expanded Symptom Details (IMG_5862.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Add More Details      │
│                                     │
│ Add additional details to symptoms  │
│                                     │
│ [Brain Fog                       ▲] │
│                                     │
│ Symptom Intensity                   │
│ 0   1   2   3   4   5   6   7   8   9   10 │
│ ▼                                   │
│ ●━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ None                          Worst │
│                                     │
│ Possible Triggers                   │
│ [🔍 Search or add trigger] [+ ADD]  │
│                                     │
│ [Alcohol]    [Caffeine]    [Nicotine] │
│                                     │
│ [Not Sure]   [Poor sleep]           │
│                                     │
│ [Strenuous exercise]    [Stress]    │
│                                     │
│            [Save]                   │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Intensity slider → Set symptom severity (0-10)
- Search field → Search for triggers
- "+ ADD" button → Add custom trigger
- Trigger buttons → Select predefined triggers
- "Save" button → Save symptom with details

**Purpose:** Detailed symptom entry with intensity rating and trigger selection.

---

## Screen 17: Symptom Details with Selected Triggers (IMG_5863.PNG)

```
┌─────────────────────────────────────┐
│ 11:13                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Add More Details      │
│                                     │
│ Possible Triggers                   │
│ [🔍 Search or add trigger] [+ ADD]  │
│                                     │
│ [Caffeine]   [Not Sure]   [Alcohol] │
│                                     │
│ [Nicotine]   [Poor sleep]           │
│                                     │
│ [Strenuous exercise]    [Stress]    │
│                                     │
│                                     │
│ Symptom Duration                    │
│ ⚫ Ongoing    ⚪ On and off          │
│                                     │
│ [__] hr    [__] min                 │
│                                     │
│                                     │
│ Notes                               │
│ Add any details you were unable to  │
│ include above, such as what you were│
│ doing when you experienced the      │
│ symptom, medications you may have   │
│ taken, etc.                         │
│                                     │
│ [Add a note]                        │
│            [Save]                   │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Selected triggers (Caffeine, Not Sure) → Deselect
- Unselected triggers → Select additional triggers
- Duration radio buttons → Select ongoing vs intermittent
- Hour/minute fields → Enter duration
- Notes field → Add additional details
- "Save" button → Save complete symptom entry

**Purpose:** Complete symptom details form with triggers, duration, and notes.

---

## Screen 18: Custom Trigger Entry (IMG_5864.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Add More Details      │
│                                     │
│ Possible Triggers                   │
│ [🔍 Search or add trigger] [+ ADD]  │
│                                     │
│ [Caffeine]   [hot]      [Not Sure]  │
│                                     │
│ [Alcohol]    [Nicotine]             │
│                                     │
│ [Poor sleep] [Strenuous exercise]   │
│                                     │
│ [Stress]                            │
│                                     │
│                                     │
│ Symptom Duration                    │
│            [Save]                   │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ q w e r t y u i o p             │ │
│ │ a s d f g h j k l               │ │
│ │ ▲ z x c v b n m     ⌫           │ │
│ │ 123 😊    space    .   done     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Keyboard → Type custom trigger
- "done" button → Confirm custom trigger entry
- Selected triggers including custom "hot" trigger

**Purpose:** Custom trigger entry with on-screen keyboard.

---

## Screen 19: Symptom Confirmation (IMG_5865.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Symptom               │
│                                     │
│                                     │
│        [Illustration of woman       │
│         giving OK gesture]          │
│                                     │
│                                     │
│ Your symptom has been logged!       │
│                                     │
│ If ECG data is available from your  │
│ Skiin garment, we'll analyze it to  │
│ better understand this symptom.     │
│ This may take a few minutes.        │
│                                     │
│ We'll notify you when the analysis  │
│ is ready.                           │
│                                     │
│            [Close]                  │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to Log tab
- "Close" button → Return to main interface

**Purpose:** Confirmation screen after successfully logging a symptom with ECG analysis information.

---

## Screen 20: Diary Tab with Entries (IMG_5866.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│  ≡           Diary           ? ⚙    │
│                                     │
│ June 2025 ▼                      🔄 │
│                                     │
│ Wed Thu Fri Sat Sun Mon Tue         │
│ 18  19  20  21  22  23  24          │
│                             ━━━     │
│                                     │
│ 10:38 ┌─────────────────────────┐   │
│ am    │ 🔸 SYMPTOM              │   │
│       │                         │   │
│       │ Sweating         ● 5/10 │   │
│       │ Caffeine                │   │
│       │                         │   │
│       │ ⏱ Pending Analysis      │   │
│       │ ⏱ Pending Review        │   │
│       └─────────────────────────┘   │
│                                     │
│ 11:12 ┌─────────────────────────┐   │
│ am    │ 🔴 BLOOD PRESSURE       │   │
│       │                         │   │
│       │ 128.5/84 mmHg           │   │
│       └─────────────────────────┘   │
│                                     │
│ 11:13 ┌─────────────────────────┐   │
│ am    │ 🔸 SYMPTOM              │   │
│       │                         │   │
│       │ Brain Fog        ● 5/10 │   │
│       │ Caffeine Not Sure hot   │   │
│       │                         │   │
│       │ ⏱ Pending Analysis      │   │
│       │ ⏱ Pending Review        │   │
│       └─────────────────────────┘   │
│                                     │
│ 11:14 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ am                                  │
│                                     │
│ 🏠 Home    ➕ Log    📖 Diary      │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Hamburger menu (≡) → Open side navigation
- Help icon (?) → Open help/support
- Settings icon (⚙) → Open settings
- Month dropdown → Change month/year
- Refresh icon (🔄) → Refresh diary data
- Calendar dates → Navigate to specific dates
- Entry cards → View detailed entry information
- Home, Log, Diary tabs → Navigate between main sections

**Purpose:** Diary tab showing chronological list of logged health data with timestamps and status indicators.

---

## Screen 21: Diary Empty State (IMG_5867.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│  ≡           Diary           ? ⚙    │
│                                     │
│ June 2025 ▼                      🔄 │
│                                     │
│ Wed Thu Fri Sat Sun Mon Tue         │
│ 18  19  20  21  22  23  24          │
│         ━━━                         │
│                                     │
│        Welcome to your Diary        │
│                                     │
│        [Illustration of woman       │
│         with phone and star]        │
│                                     │
│ The Diary page keeps a record of    │
│ your symptoms and health metrics    │
│ collected through your Skiin        │
│ Garment and other Bluetooth devices.│
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│ 🏠 Home    ➕ Log    📖 Diary      │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Same navigation elements as previous screen
- Currently showing Friday (20th) which has no entries

**Purpose:** Diary tab empty state when no data exists for selected date.

---

## Screen 22: Symptom Detail View (IMG_5868.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Today                 │
│                                     │
│ Symptom                             │
│ ⏱ Symptom experienced at 10:38am   │
│                                     │
│ Sweating                     ● 5/10 │
│                                     │
│ Possible Triggers                   │
│ Caffeine                            │
│                                     │
│ Duration                            │
│ Ongoing                             │
│                                     │
│                                     │
│ ⏱ Your symptom is pending review   │
│                                     │
│ [Edit Symptom]  [Remove Symptom]    │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to Diary
- "Edit Symptom" button → Modify symptom entry
- "Remove Symptom" button → Delete symptom entry

**Purpose:** Detailed view of a logged symptom with edit/remove options.

---

## Screen 23: Manage Symptoms Tab (IMG_5869.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Manage Symptoms &     │
│               Triggers              │
│                                     │
│ ┌─────────────┬─────────────────┐   │
│ │ Symptoms    │ Triggers        │   │
│ └─────────────┴─────────────────┘   │
│                                     │
│ You have not created any custom     │
│ symptoms yet. Once you do, you will │
│ see them here.                      │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to previous screen
- "Symptoms" tab → View custom symptoms (currently active)
- "Triggers" tab → View custom triggers

**Purpose:** Management interface for custom symptoms (currently empty).

---

## Screen 24: Manage Triggers Tab (IMG_5870.PNG)

```
┌─────────────────────────────────────┐
│ 11:14                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Manage Symptoms &     │
│               Triggers              │
│                                     │
│ ┌─────────────┬─────────────────┐   │
│ │ Symptoms    │ Triggers        │   │
│ └─────────────┴─────────────────┘   │
│                                     │
│ A list of custom triggers created   │
│ by you. To remove a custom trigger, │
│ tap on the trashcan icon.           │
│                                     │
│ hot                              🗑 │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to previous screen
- "Symptoms" tab → View custom symptoms
- "Triggers" tab → View custom triggers (currently active)
- Trash icon (🗑) → Delete custom trigger "hot"

**Purpose:** Management interface for custom triggers showing the "hot" trigger created earlier.

---

## Screen 25: Device Management (IMG_5853.PNG)

```
┌─────────────────────────────────────┐
│ 11:12                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Devices               │
│                                     │
│                                     │
│        My Skiin Pod              ✏️ │
│        31067601890                  │
│                                     │
│        ✅ Connected                 │
│                                     │
│                                     │
│                                     │
│ Last data sync at 11:12 AM          │
│                                     │
│ 🔄 Data currently syncing           │
│                                     │
│ 🔋 Pod has moderate charge          │
│                                     │
│                                     │
│ Garment: Chestband                  │
│                                     │
│                                     │
│ More details                     ▲  │
│                                     │
│ Firmware version                    │
│ (18.0.9.1)              Up to date │
│                                     │
│ Hardware version                    │
│ (20)                                │
│                                     │
│                                     │
│           [Forget Pod]              │
│                                     │
│ ℹ️ Please remember to wash your     │
│   garment at least once a week to  │
│   avoid the material from stretching│
│   out too much.                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to previous screen
- Edit icon (✏️) → Edit device settings
- "More details" dropdown → Expand/collapse device information
- "Forget Pod" button → Unpair device

**Purpose:** Device management screen showing connected pod status, sync information, and device details.

---

## Screen 26: Advanced Settings (IMG_5854.PNG)

```
┌─────────────────────────────────────┐
│ 11:12                   ●●● ⚡ 📶 67 │
├─────────────────────────────────────┤
│           <   Advanced Settings     │
│                                     │
│                                     │
│ User Profile Settings            >  │
│                                     │
│                                     │
│ Clinical Program                 >  │
│                                     │
│                                     │
│ Pod Management                   >  │
│                                     │
│                                     │
│ Health & Wellness Data Upload    ▲  │
│ Choose how your health & wellness   │
│ data is uploaded                    │
│                                     │
│ ⚪ Wifi only                        │
│                                     │
│ ⚫ Both wifi and cellular data      │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│                                     │
│ Logout                              │
│                                     │
└─────────────────────────────────────┘
```

**Clickable Elements:**
- Back arrow → Return to previous screen
- "User Profile Settings" → Go to profile settings
- "Clinical Program" → Go to clinical program settings
- "Pod Management" → Go to device management
- Data upload radio buttons → Select upload preference
- "Logout" → Sign out of app

**Purpose:** Advanced settings menu with various configuration options and logout functionality.

