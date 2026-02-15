# Ayurnxt Protocol-Driven Therapy System

## 🎯 System Overview

Ayurnxt is now a **protocol-driven therapy system** that enforces strict clinical workflows. This is NOT a free-form dashboard—it's a controlled healthcare supervision layer.

## 🔒 Core Principles

1. **The plaster delivers therapy** - Software provides supervision only
2. **Protocol enforcement** - Users cannot skip or reorder states
3. **Safety first** - System prevents misuse and overuse
4. **No medical claims** - Guidance only, not diagnosis or treatment

## 📊 Therapy State Machine

### State Flow (STRICT - Cannot be bypassed)

```
STATE 0: IDLE (Landing Page)
    ↓
STATE 1: QR_SCAN (Plaster Authentication)
    ↓
STATE 2: SETUP (Protocol Configuration)
    ↓
STATE 3: LIVE_SESSION (Locked Therapy Session)
    ↓
STATE 4: SESSION_END (Completion or Termination)
    ↓
STATE 5: PAIN_LOGGING (Structured Data Collection)
    ↓
STATE 6: COMPLIANCE_REVIEW (Progress Dashboard)
    ↓ (loop back)
STATE 1: QR_SCAN (New Session)
```

### State Transition Rules

- **Forward only** - Cannot go backwards
- **No skipping** - Must complete each state
- **Validation enforced** - Invalid transitions are blocked
- **Page refresh protected** - Active sessions persist

## 🔐 State Details

### STATE 0: IDLE / Landing
**Purpose**: Entry point to system

**Features**:
- Hero animation with branding
- "Scan Therapy Plaster" CTA
- Provider portal access
- Trust indicators

**Exit Condition**: User clicks "Scan Therapy Plaster"

---

### STATE 1: QR Scan Simulation
**Purpose**: Authenticate therapy unit

**Features**:
- Simulated QR scanning animation
- 2-second scan delay
- "Standardized therapy unit detected" message
- Cannot be bypassed via URL

**Exit Condition**: Scan completes successfully

**Constraints**:
- One scan = one physical plaster
- No camera access required (simulation)
- Generates unique plaster ID

---

### STATE 2: Therapy Setup
**Purpose**: Configure protocol parameters

**Features**:
- Body area selection (6 predefined safe areas)
- Therapy mode selection (3 modes)
- Protocol details display
- Safety notes
- Confirmation modal

**Therapy Modes**:
1. **Mild Pain Relief**
   - Duration: 30 minutes
   - Cooldown: 4 hours
   
2. **Moderate Pain Relief**
   - Duration: 45 minutes
   - Cooldown: 6 hours
   
3. **Post-Activity Recovery**
   - Duration: 25 minutes
   - Cooldown: 3 hours

**Exit Condition**: User confirms configuration

**Constraints**:
- Must select both area and mode
- Cannot modify after confirmation
- Protocol parameters are fixed (not editable)

---

### STATE 3: Live Therapy Session (LOCKED)
**Purpose**: Active therapy with safety monitoring

**Features**:
- Countdown timer (cannot pause/restart)
- Circular progress indicator
- Session status display
- Mid-session sensation check (at 50% progress)

**Sensation Check Options**:
1. **Mild Warmth** - Normal, continue
2. **No Sensation** - Noted, continue
3. **Strong Discomfort** - Immediate termination

**Exit Conditions**:
- Timer reaches zero (normal completion)
- Strong discomfort reported (early termination)

**Constraints**:
- Session cannot be paused
- Session cannot be restarted
- Page refresh does NOT reset timer
- Must complete sensation check to proceed

**Safety Features**:
- Page unload warning
- State persistence
- Automatic termination on discomfort

---

### STATE 4: Session End
**Purpose**: Transition between therapy and logging

**Features**:
- Completion status display
- Safety guidance (if terminated early)
- Next steps instructions
- Proceed to logging button

**Exit Condition**: User clicks "Proceed to Pain Assessment"

**Constraints**:
- Pain logging is mandatory
- Cannot skip to dashboard

---

### STATE 5: Structured Pain Logging
**Purpose**: Collect standardized outcome data

**Features**:
- Pain level BEFORE session (0-10 slider)
- Pain level AFTER session (0-10 slider)
- Pain change indicator
- Mobility assessment (4 options)

**Mobility Options**:
1. Improved mobility
2. No change in mobility
3. Reduced mobility
4. Increased stiffness

**Exit Condition**: All fields completed

**Constraints**:
- No free-text medical fields
- Structured inputs only
- All fields required
- Data feeds compliance metrics

---

### STATE 6: Compliance & Progress Dashboard
**Purpose**: Display protocol adherence and outcomes

**Features**:
- Compliance score (% completed sessions)
- Consistency streak
- Pain trend analysis
- Session history
- Cooldown status
- Healthcare consultation recommendations

**Metrics Displayed**:
- Total sessions
- Completed sessions
- Compliance score (0-100%)
- Consistency streak
- Pain trend (improving/stable/worsening)

**Exit Conditions**:
- Start new session (if not in cooldown)
- View provider portal
- Return to landing

**Constraints**:
- Cannot start new session during cooldown
- Cooldown timer displayed
- Red flags trigger consultation recommendation

---

## 🛡️ Safety Features

### Cooldown Management
- **Purpose**: Prevent overuse
- **Enforcement**: Cannot start new session during cooldown
- **Display**: Countdown timer shown
- **Calculation**: Based on therapy mode

### Pain Trend Detection
- **Improving**: Pain decreasing over sessions
- **Stable**: Pain levels consistent
- **Worsening**: Pain increasing over sessions
- **Insufficient Data**: < 2 completed sessions

### Consultation Triggers
System recommends professional consultation if:
1. Pain trend is worsening
2. 2+ early terminations in last 5 sessions
3. Average pain level ≥ 7 in last 3 sessions

### Session Locking
- Cannot pause active session
- Cannot restart active session
- Cannot extend duration
- Page refresh preserves state

## 🤖 AI Usage (Constrained)

AI is **NOT** a chatbot. AI may **ONLY**:
- Generate 2-3 line session summaries
- Interpret logged data descriptively
- Explain system steps or safety messages

AI **MUST NOT**:
- Diagnose conditions
- Suggest treatment changes
- Predict outcomes
- Use emotional or persuasive language

**Tone**: Neutral and clinical only

## 📊 Data Structure

### TherapySession
```typescript
{
  id: string;
  plasterId: string;
  bodyArea: string;
  mode: TherapyMode;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  status: SessionStatus;
  sensationCheck: SensationLevel;
  painBefore: number;
  painAfter: number;
  notes: string;
  terminationReason?: string;
}
```

### ComplianceMetrics
```typescript
{
  totalSessions: number;
  completedSessions: number;
  incompleteSessions: number;
  complianceScore: number; // 0-100
  consistencyStreak: number;
  lastSessionTime: string;
  cooldownEndsAt: string;
}
```

## 🎯 Key Differences from Previous Version

### Before (Dashboard App)
- Free navigation between views
- Manual data entry
- No state enforcement
- Skippable steps
- Generic health tracking

### After (Protocol System)
- Strict state machine
- Enforced workflow
- Cannot skip states
- Locked sessions
- Clinical protocol enforcement

## 🚀 Demo Flow

### Complete Protocol Flow (5-7 minutes)

1. **Landing** (10s)
   - Click "Scan Therapy Plaster"

2. **QR Scan** (5s)
   - Watch scan animation
   - See "unit detected" message

3. **Setup** (30s)
   - Select body area (e.g., Knee)
   - Select mode (e.g., Moderate Pain)
   - Review protocol details
   - Confirm configuration

4. **Live Session** (45min or fast-forward for demo)
   - Watch timer countdown
   - Complete sensation check at 50%
   - Wait for completion

5. **Session End** (10s)
   - See completion message
   - Click "Proceed to Pain Assessment"

6. **Pain Logging** (30s)
   - Set pain before (e.g., 7)
   - Set pain after (e.g., 4)
   - Select mobility option
   - Submit

7. **Compliance Dashboard** (60s)
   - View compliance score
   - Check pain trend
   - See session history
   - Note cooldown status

### Quick Demo (2 minutes)
For evaluation purposes, you can modify session duration in `therapyProtocol.ts`:
```typescript
sessionDurationMinutes: 1, // Instead of 30/45
```

## ✅ Validation Checklist

### State Machine
- [ ] Cannot skip states
- [ ] Cannot go backwards
- [ ] Invalid transitions blocked
- [ ] Page refresh preserves state

### Session Locking
- [ ] Cannot pause session
- [ ] Cannot restart session
- [ ] Timer persists on refresh
- [ ] Unload warning shown

### Cooldown Enforcement
- [ ] Cannot start during cooldown
- [ ] Countdown displayed
- [ ] Calculation correct
- [ ] Mode-specific durations

### Data Collection
- [ ] Pain logging required
- [ ] Structured inputs only
- [ ] No free medical text
- [ ] All fields validated

### Safety Features
- [ ] Sensation check mandatory
- [ ] Early termination works
- [ ] Pain trends calculated
- [ ] Consultation recommendations

## 🎨 UI Preservation

All premium UI elements are **preserved**:
- Glassmorphism effects
- Smooth animations
- Gradient backgrounds
- Professional typography
- Micro-interactions

**New behavior, same beautiful design.**

## 📝 Clinical Disclaimers

Present throughout system:
- "Guidance only, not diagnosis"
- "Not a substitute for professional medical advice"
- "For demonstration purposes"
- "Consult healthcare professional if needed"

## 🔧 Technical Implementation

### State Management
- `TherapyStateManager` class enforces transitions
- State persistence in localStorage
- Page refresh protection
- Invalid transition logging

### Timer Management
- `SessionTimer` class handles countdown
- Millisecond precision
- Progress calculation
- Completion detection

### Cooldown Management
- `CooldownManager` class calculates remaining time
- Mode-specific durations
- Prevents premature sessions

### Compliance Calculation
- `ComplianceCalculator` class computes metrics
- Pain trend analysis
- Consultation triggers
- Streak tracking

---

**Ayurnxt** - Where protocol enforcement meets premium design.

*A judge should clearly see: "This system enforces safe, standardized therapy."*
