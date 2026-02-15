# Ayurnxt Protocol System - Demo Guide

## 🎯 Quick Start for Judges

### Option 1: Fast Demo Mode (Recommended for Evaluation)

1. Open browser console (F12)
2. Type: `window.ayurnxtDemo.enableFastMode()`
3. Refresh the page
4. Sessions will now run at 2% speed (45min → 54 seconds)

### Option 2: Ultra-Fast Mode (For Quick Testing)

1. Open browser console (F12)
2. Type: `window.ayurnxtDemo.ultraFastMode()`
3. Refresh the page
4. Sessions will now run at 0.5% speed (45min → 13.5 seconds)

### Option 3: Normal Mode (Full Experience)

Experience the actual therapy duration (not recommended for demos)

---

## 📋 Complete Protocol Flow Demo

### Step 1: Landing Page (10 seconds)
**What to observe**:
- Premium hero animation (floating leaf with glow)
- "Protocol-driven supervision" messaging
- Single CTA: "Scan Therapy Plaster"
- No free navigation - must follow protocol

**Action**: Click "Scan Therapy Plaster"

---

### Step 2: QR Scan Simulation (5 seconds)
**What to observe**:
- Scanning animation with scan line
- "Authenticating plaster..." message
- "Standardized therapy unit detected" confirmation
- Unique plaster ID generated

**Key Point**: This simulates physical plaster authentication. Cannot be bypassed.

**Action**: Wait for scan to complete (automatic)

---

### Step 3: Therapy Setup (30-60 seconds)
**What to observe**:
- Body area selection (6 predefined safe areas)
- Therapy mode selection (3 modes with different protocols)
- Protocol details display:
  - Session duration (fixed)
  - Cooldown period (fixed)
  - Safety notes
- Confirmation modal with warning

**Key Points**:
- Parameters are NOT editable
- Each mode has deterministic configuration
- Must confirm before proceeding
- Cannot go back after confirmation

**Action**: 
1. Select "Knee" as body area
2. Select "Moderate Pain Relief" mode
3. Review protocol (45min session, 6h cooldown)
4. Click "Review Configuration"
5. Click "Start Therapy Session"

---

### Step 4: Live Therapy Session (45 min or 54 sec in fast mode)
**What to observe**:
- Circular progress indicator
- Countdown timer
- "Session in Progress" status
- Session info (plaster ID, mode, area)
- **Mid-session sensation check** (at 50% progress)

**Key Points**:
- Session is LOCKED - cannot pause
- Session cannot be restarted
- Page refresh does NOT reset timer
- Sensation check is MANDATORY

**Sensation Check** (appears at 50%):
- **Mild Warmth** → Continue normally
- **No Sensation** → Continue with note
- **Strong Discomfort** → Immediate termination

**Action**: 
1. Watch timer countdown
2. When sensation check appears, select "Mild Warmth"
3. Wait for session to complete

**Demo Tip**: In fast mode, sensation check appears after ~27 seconds

---

### Step 5: Session End (10 seconds)
**What to observe**:
- Completion status (green checkmark)
- "Session completed successfully" message
- Next steps instructions
- "Proceed to Pain Assessment" button

**Key Point**: Pain logging is MANDATORY - cannot skip

**Action**: Click "Proceed to Pain Assessment"

---

### Step 6: Structured Pain Logging (30 seconds)
**What to observe**:
- Pain BEFORE session slider (0-10)
- Pain AFTER session slider (0-10)
- Pain change indicator (shows improvement/worsening)
- Mobility assessment (4 structured options)
- No free-text medical fields

**Key Points**:
- All fields are REQUIRED
- Structured inputs only
- Data feeds compliance metrics
- Cannot proceed without completion

**Action**:
1. Set "Pain Before" to 7
2. Set "Pain After" to 4
3. Select "Improved mobility"
4. Click "Complete Assessment"

---

### Step 7: Compliance Dashboard (60+ seconds)
**What to observe**:
- Compliance score (% completed sessions)
- Consistency streak
- Pain trend analysis (improving/stable/worsening)
- Session history with status
- Cooldown status (if applicable)
- Healthcare consultation recommendation (if triggered)

**Key Points**:
- Cannot start new session during cooldown
- Cooldown timer displayed
- Pain trends calculated automatically
- Red flags trigger consultation recommendation

**Actions to demonstrate**:
1. Review compliance score
2. Check pain trend
3. View session history
4. Note cooldown status
5. Try to start new session (blocked if in cooldown)

---

## 🔒 Protocol Enforcement Demonstrations

### Demo 1: State Machine Enforcement
**Purpose**: Show that states cannot be skipped

**Steps**:
1. Start at landing page
2. Try to manually navigate (no way to skip QR scan)
3. Complete QR scan
4. Try to skip setup (impossible - must configure)
5. Complete setup
6. Try to skip live session (impossible - must complete)

**Result**: Protocol flow is strictly enforced

---

### Demo 2: Session Locking
**Purpose**: Show that active sessions cannot be manipulated

**Steps**:
1. Start a therapy session
2. Try to pause (no pause button exists)
3. Try to refresh page (session persists)
4. Try to navigate away (warning appears)
5. Complete sensation check
6. Wait for completion

**Result**: Session integrity is maintained

---

### Demo 3: Cooldown Enforcement
**Purpose**: Show that overuse is prevented

**Steps**:
1. Complete a full session
2. Complete pain logging
3. Reach compliance dashboard
4. Try to start new session immediately
5. See "Cooldown Active" message
6. Note countdown timer

**Result**: Cannot start new session until cooldown expires

---

### Demo 4: Pain Trend Detection
**Purpose**: Show automated safety monitoring

**Steps**:
1. Complete 3 sessions with increasing pain levels
   - Session 1: Before 5 → After 6
   - Session 2: Before 6 → After 7
   - Session 3: Before 7 → After 8
2. View compliance dashboard
3. See "Pain levels are increasing" warning
4. See "Professional Consultation Recommended" alert

**Result**: System detects worsening trends and recommends action

---

### Demo 5: Early Termination
**Purpose**: Show safety protocol activation

**Steps**:
1. Start a therapy session
2. Wait for sensation check (50% progress)
3. Select "Strong Discomfort"
4. Session ends immediately
5. See "Safety Protocol Activated" message
6. Complete pain logging (still required)
7. Session marked as "Terminated Early" in history

**Result**: Safety takes priority over completion

---

## 🎨 Design Highlights to Point Out

### Premium UI (Preserved)
- Glassmorphism effects on all cards
- Smooth animations (float, pulse, slide)
- Gradient backgrounds and icons
- Professional typography
- Micro-interactions

### Clinical Responsibility
- Clear disclaimers on every screen
- Professional terminology
- No diagnosis or treatment claims
- Consultation recommendations
- Safety-first messaging

### User Experience
- Intuitive flow (despite strict enforcement)
- Clear progress indicators
- Helpful guidance at each step
- Non-alarming safety messages
- Calm, trustworthy aesthetic

---

## 📊 Key Metrics to Highlight

### Protocol Enforcement
- 6 sequential states
- 0 skippable steps
- 100% state validation
- Page refresh protection

### Safety Features
- Mandatory sensation checks
- Cooldown enforcement
- Pain trend detection
- Early termination capability
- Consultation recommendations

### Data Quality
- Structured inputs only
- No free-text medical fields
- Required field validation
- Compliance tracking
- Trend analysis

---

## 🎬 2-Minute Pitch Script

> "Ayurnxt is a **protocol-driven therapy system** for Ayurvedic herbal plasters.
>
> Notice this is NOT a free-form dashboard. It's a **strict clinical workflow** that enforces safe therapy protocols.
>
> Watch as I scan a therapy plaster [QR scan animation]. The system authenticates the unit and initializes a standardized protocol.
>
> I configure the therapy [select area and mode]. Notice the parameters are **fixed** - I can't edit session duration or cooldown periods. This prevents misuse.
>
> Now the session starts [live session screen]. This is **locked** - I cannot pause, restart, or extend it. The system will check my sensation at 50% progress.
>
> [Sensation check appears] This is mandatory. If I report strong discomfort, the session ends immediately for safety.
>
> [Session completes] Now I **must** log pain data. This isn't optional - it feeds the compliance system.
>
> [Compliance dashboard] Here's my progress. The system calculates compliance scores, detects pain trends, and enforces cooldown periods.
>
> If I try to start another session now [click button], I'm blocked. The cooldown prevents overuse.
>
> This is how software should supervise therapy - **protocol-driven, safety-first, and impossible to misuse**."

---

## ✅ Evaluation Checklist

### Protocol Enforcement
- [ ] Cannot skip QR scan
- [ ] Cannot skip setup
- [ ] Cannot skip live session
- [ ] Cannot skip pain logging
- [ ] States transition in order only

### Session Integrity
- [ ] Cannot pause session
- [ ] Cannot restart session
- [ ] Page refresh preserves state
- [ ] Timer continues accurately
- [ ] Unload warning appears

### Safety Features
- [ ] Sensation check is mandatory
- [ ] Strong discomfort terminates session
- [ ] Pain trends are calculated
- [ ] Consultation recommendations appear
- [ ] Cooldown is enforced

### Data Quality
- [ ] All fields are required
- [ ] Structured inputs only
- [ ] No free medical text
- [ ] Data persists correctly
- [ ] Metrics calculate accurately

### UI/UX
- [ ] Premium design preserved
- [ ] Animations are smooth
- [ ] Flow is intuitive
- [ ] Messaging is clear
- [ ] Disclaimers are present

---

## 🔧 Troubleshooting

### Session Duration Too Long?
Enable fast mode:
```javascript
window.ayurnxtDemo.enableFastMode()
// Then refresh page
```

### Want to Test Cooldown?
Complete a session, then try to start another immediately. You'll see the cooldown enforcement.

### Want to Test Pain Trends?
Complete 3+ sessions with varying pain levels. The system will calculate trends automatically.

### Want to Reset Everything?
Clear localStorage:
```javascript
localStorage.clear()
// Then refresh page
```

---

## 🌟 What Makes This Special

### Not a Dashboard
- No free navigation
- No skippable steps
- No editable protocols
- Strict state machine

### Not a Chatbot
- No AI conversation
- No open-ended queries
- Structured workflows only
- Clinical protocols enforced

### Not Generic Health Tracking
- Therapy-specific
- Protocol-driven
- Safety-enforced
- Compliance-focused

### It's a Clinical Supervision System
- Enforces correct usage
- Prevents misuse
- Monitors safety
- Tracks compliance
- Recommends consultation when needed

---

**Ayurnxt** - Where protocol enforcement meets premium design.

*"This system enforces safe, standardized therapy."*
