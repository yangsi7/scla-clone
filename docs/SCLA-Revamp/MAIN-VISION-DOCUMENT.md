# SCLA Platform 3.0: What's Changing

## Executive Summary

SCLA Platform 3.0 introduces a module system that transforms our existing monitoring tools into structured health programs. Users complete time-bound modules (14-30 days) with daily tasks, generating clinical reports at completion.

**Key Changes:**
- SCLA gets new navigation (Home/Modules/Reports) and becomes the primary daily interface
- HHD adds sleep and activity cards, adapts display based on active module
- Three initial modules: Heart Health Monitoring, AFib Management, BP Optimization
- Success metric: Module completion rate >70%

## What's Actually Changing

### SCLA App Changes

**Current State:**
- Multiple scattered features
- Unclear navigation
- Low daily engagement

**New Navigation Structure:**
```
[Home/Today] [Modules] [Reports]
           [+] FAB Menu
```

**Home/Today Tab:**
- Morning summary card (overnight metrics)
- Today's tasks based on active module
- Quick stats (current HR, last BP, etc.)
- Module progress indicator

**Modules Tab:**
- Available programs with clear duration
- Current module progress
- Enrollment flow with expectations

**Reports Tab:**
- Completed module reports
- Share functionality
- PDF generation

**FAB Menu (+):**
- Log Symptom (existing flow)
- Start Test (orthostatic)
- Quick Entry (BP, weight)

### HHD Dashboard Changes

**Current State:**
- Three main cards: Heart Rate, AFib Burden, Blood Pressure
- Symptom log at top
- Educational dropdowns

**New Additions:**
1. **Sleep Card**
   - Duration, efficiency, stages
   - Heart rate during sleep
   - AFib episodes during sleep

2. **Activity Card**
   - Steps, active minutes
   - Heart rate response to activity
   - Recovery patterns

3. **Module-Adaptive Display**
   - If AFib module active: Enhanced AFib burden analysis, trigger correlations
   - If BP module active: Time-of-day BP patterns, medication timing analysis
   - If Heart Health module active: Comprehensive daily summaries

**Layout remains familiar but enhanced:**
```
[Symptom Log]
[HR Card] [AFib Card]
[BP Card] [Sleep Card]
[Activity Card]
[Module Insights] (when active)


## Module System

### Core Concept
Modules are time-bound programs that add structure to daily monitoring. One module active at a time, each with specific daily tasks and a clear end goal.

**Module Framework:**
- Duration: 14-30 days
- Daily time: 5-10 minutes
- Completion trigger: Report generation
- Success metric: >70% task completion

### 1. Heart Health Monitoring (14 days)

**Target Metric**: Generate comprehensive screening report
**Engagement Hook**: "Know your heart in 14 days"

**Daily Flow:**
- Morning (3 min): BP + weight + "How do you feel?"
- Throughout: Passive ECG monitoring
- Evening (2 min): Energy level + stress rating
- Every 3 days: Orthostatic test

**Completion Rewards:**
- Detailed health report
- Risk assessment score
- Personalized recommendations
- Badge: "Heart Health Champion"

### 2. AFib Management (30 days)

**Target Metric**: Identify personal triggers
**Engagement Hook**: "Find what triggers your AFib"

**Daily Flow:**
- Morning (2 min): Sleep quality + symptom check
- Episode logging: Enhanced with trigger checklist
- Evening (3 min): Daily trigger diary (coffee, alcohol, stress)
- Weekly: Pattern review "Your AFib days correlate with..."

**Completion Rewards:**
- AFib burden trend report
- Personal trigger analysis
- Episode calendar
- Badge: "AFib Expert"

### 3. BP Optimization (21 days)

**Target Metric**: Achieve target BP range
**Engagement Hook**: "Control your BP in 3 weeks"

**Daily Flow:**
- Morning (3 min): BP before meds + medication timing
- Lunch: Quick med reminder
- Evening (3 min): BP after day + sodium/exercise log
- Every 3 days: "Experiment" (e.g., measure after walk)

**Completion Rewards:**
- BP improvement chart
- Optimal medication timing
- Lifestyle impact analysis
- Badge: "BP Master"

## Engagement Framework

### Daily Engagement Loop
1. **Morning Hook** (Push at 7 AM): "Check your overnight summary"
2. **Task Completion** (2-5 min): Module-specific quick tasks
3. **Progress Feedback**: Visual progress bar + streak counter
4. **Evening Reflection** (Optional): End-of-day insights

### Weekly Engagement
- **Monday**: Weekly goal setting based on previous week
- **Wednesday**: Mid-week insight ("You're doing better than 73% of users")
- **Friday**: Pattern summary ("Your triggers this week...")
- **Sunday**: Week complete celebration + next week preview

### Completion Motivation
- Progress milestones every 25% (badges)
- Streak rewards (3, 7, 14 days)
- Peer comparison ("Top 20% for completion")
- Report preview building throughout module

### Key Metrics to Optimize
1. **Primary**: Module completion rate (target >70%)
2. **Secondary**: Daily task completion (target >85%)
3. **Tertiary**: Report sharing rate (target >50%)

## Module Flow Examples

### AFib Module - Daily User Flow
```
Day 1-3: Baseline
- Morning: "How did you sleep?" + symptom check
- Any time: Enhanced episode logging
- Evening: Simple trigger checklist

Day 4-14: Pattern Building  
- Morning: Shows overnight AFib burden
- Prompts: "Log your coffee intake"
- Insights: "You had no AFib on days without coffee"

Day 15-25: Testing Hypotheses
- Experiments: "Try skipping morning coffee"
- Tracking: More detailed trigger logging
- Feedback: "2 days AFib-free!"

Day 26-30: Consolidation
- Summary: "Your main triggers are..."
- Planning: "Lifestyle changes to consider"
- Report prep: Preview building
```

### BP Module - Optimization Flow
```
Week 1: Technique & Timing
- Proper measurement coaching
- Finding best medication times
- Baseline establishment

Week 2: Lifestyle Experiments
- "Measure BP after 10 min walk"
- "Try reducing sodium today"
- "Take meds with breakfast vs dinner"

Week 3: Lock in Success
- Confirm optimal patterns
- Build sustainable habits
- Generate recommendations
```


## Implementation Roadmap

### Phase 1: Core Experience (Month 1-2)
- SCLA navigation update
- Module framework backend
- HHD sleep/activity cards
- Basic engagement loops

### Phase 2: Module Launch (Month 3-4)
- Launch AFib Management module
- Launch BP Optimization module  
- Launch Heart Health Monitoring
- Report generation system

### Phase 3: Optimization (Month 5-6)
- Module completion analysis
- Engagement optimization
- Provider feedback integration
- Scale to 10K users

## Success Metrics

**Primary KPIs:**
- Module completion rate: >70%
- Daily active users: 3x increase
- Report sharing rate: >50%

**Secondary KPIs:**
- Task completion rate: >85%
- User retention at 90 days: >60%
- Provider satisfaction: >4/5

## Technical Requirements

**SCLA Changes:**
- New navigation component
- Module state management
- Enhanced push notifications
- Background task scheduling

**HHD Changes:**
- New card components (Sleep, Activity)
- Module-adaptive layouts
- Enhanced PDF generation
- Real-time data sync

**Backend Changes:**
- Module enrollment system
- Task scheduling engine
- Report generation service
- Analytics pipeline

## Detailed Mockups

For detailed screen designs, see:
- [SCLA Detailed Mockups](mockups/scla-detailed-mockups.md)
- [HHD Enhanced Mockups](mockups/hhd-enhanced-mockups.md)