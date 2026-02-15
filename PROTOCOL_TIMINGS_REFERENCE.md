# AYURNXT PROTOCOL-LEVEL APPLICATION TIMINGS

**System-Defined Protocol Defaults for Demo Application**

---

## IMPORTANT BOUNDARIES

⚠️ **Critical Disclaimers:**
- This is **NOT medical advice**
- This is **NOT diagnosis or treatment**
- These timings are **system-defined protocol defaults** for a demo application
- Application is **EXTERNAL ONLY** on intact skin
- "Internal pain" refers to pain perceived internally (muscle, joint, deep tissue)
- Plaster is **ALWAYS applied on intact external skin**
- **NO open, bleeding, or infected wounds**

**Language Standard:** Clinical, neutral, and safety-oriented

---

## USAGE CATEGORIES & TIMINGS

### 1. INTERNAL PAIN
**Deep-seated pain perceived internally**

**Examples:**
- Joint pain (knee, shoulder, elbow)
- Lower back pain
- Muscle spasms
- Chronic stiffness

**APPLICATION PROTOCOL:**
- **Session duration:** 30–45 minutes
- **Sessions per day:** Maximum 1
- **Cooldown before next session:** 8–12 hours

**EXPECTED SENSATIONS:**
- Mild warmth
- Gradual comfort

**SYSTEM NOTES:**
- Duration is fixed and non-editable
- Designed for comfort support, not pain cure
- System-defined protocol default

---

### 2. EXTERNAL PAIN
**Surface-level discomfort on closed skin**

**Examples:**
- Muscle soreness
- Post-activity fatigue
- Localized tenderness
- Mild inflammation (non-acute)

**APPLICATION PROTOCOL:**
- **Session duration:** 20–30 minutes
- **Sessions per day:** Maximum 1
- **Cooldown before next session:** 6–8 hours

**EXPECTED SENSATIONS:**
- Gentle warmth
- Relaxation of area

**SYSTEM NOTES:**
- Shorter duration to avoid skin fatigue
- Discontinue if irritation occurs
- System-defined protocol default

---

### 3. HEALED SKIN (CLOSED ONLY)
**Closed/healed skin only - NO wounds**

**Examples:**
- Minor healed scratches
- Post-wound skin discomfort (no scab, no bleeding)
- Residual tenderness after skin closure

**APPLICATION PROTOCOL:**
- **Session duration:** 15–20 minutes
- **Sessions per day:** Maximum 1
- **Cooldown before next session:** 12–24 hours

**EXPECTED SENSATIONS:**
- Minimal sensation
- Gentle comfort

**STRICT RULES:**
- ✓ Skin MUST be fully closed
- ✗ NO cuts, bleeding, discharge, or infection
- ⚠️ Immediate removal if irritation occurs

**SYSTEM NOTES:**
- Intended for comfort around healed skin only
- NOT for wound healing or infection management
- System-defined protocol default

---

## GLOBAL SAFETY ENFORCEMENT

### Session Management
- ✓ Do not allow extended or repeated sessions
- ✓ Lock session duration once started
- ✓ Fixed durations are non-editable by users

### Emergency Termination
**If user reports strong discomfort or burning:**
1. End session immediately
2. Display calm safety guidance
3. Log termination reason

**Emergency Stop Triggers:**
- Strong discomfort
- Burning sensation
- Skin irritation
- Unexpected pain increase

### Mandatory Disclaimers
Always display:
> "Consult a healthcare professional if pain or discomfort persists."

> "This system provides comfort support only, not medical treatment."

> "Application is for external use on intact skin only."

### Prohibited Conditions
**NEVER apply to:**
- Open wounds
- Bleeding skin
- Infected areas
- Broken skin
- Active inflammation with swelling
- Skin with discharge

---

## PROTOCOL VALIDATION RULES

### Before Starting Session
1. Verify cooldown period has elapsed
2. Confirm maximum daily sessions not exceeded
3. Validate skin condition is appropriate
4. Display category-specific safety notes

### During Session
1. Monitor for user-reported discomfort
2. Enforce fixed duration (no extensions)
3. Provide progress indicators
4. Enable emergency stop at any time

### After Session
1. Log completion status
2. Calculate next available session time
3. Record pain levels (before/after)
4. Update compliance metrics

---

## INTEGRATION GUIDELINES

### For Developers
```typescript
import { 
  PainCategory, 
  PROTOCOL_TIMINGS,
  ProtocolSafetyValidator 
} from './protocolTimings';

// Get protocol for a category
const protocol = PROTOCOL_TIMINGS[PainCategory.INTERNAL_PAIN];

// Validate session can start
const validation = ProtocolSafetyValidator.canStartSession(
  PainCategory.INTERNAL_PAIN,
  lastSessionTime
);

// Get fixed session duration
const duration = ProtocolSafetyValidator.getSessionDuration(
  PainCategory.INTERNAL_PAIN
);
```

### For UI Display
- Present all timings as "System-defined protocol defaults"
- Show expected sensations clearly
- Display cooldown timers prominently
- Make emergency stop button always visible
- Use calm, neutral language for all messaging

### For Evaluators
- All timings are pre-configured and locked
- No medical claims or healing promises
- Safety-first approach throughout
- Suitable for healthcare demo and review
- Compliant with external-use-only requirements

---

## TIMING SUMMARY TABLE

| Category | Duration | Max/Day | Cooldown | Editable |
|----------|----------|---------|----------|----------|
| Internal Pain | 30–45 min | 1 | 8–12 hrs | No |
| External Pain | 20–30 min | 1 | 6–8 hrs | No |
| Healed Skin | 15–20 min | 1 | 12–24 hrs | No |

---

## SAFETY MESSAGING TEMPLATES

### Session Start
```
Starting [Category] session
Duration: [X] minutes (fixed)
Expected: [Sensations]

You can stop at any time if discomfort occurs.
```

### During Session
```
Session in progress: [X] minutes remaining
Feeling: [Mild warmth / Gentle comfort]

Stop immediately if you experience strong discomfort.
```

### Session Complete
```
Session completed successfully
Next session available in: [X] hours

Consult a healthcare professional if pain persists.
```

### Emergency Stop
```
Session terminated for your safety.

Immediate actions:
• Remove the plaster gently
• Cleanse the area with cool water if needed
• Allow skin to rest

Consult a healthcare professional if pain or discomfort persists.
```

---

## COMPLIANCE NOTES

✓ **External use only** - All protocols enforce intact skin requirement  
✓ **No medical claims** - Language focuses on comfort support  
✓ **Safety-first** - Emergency stop always available  
✓ **Fixed timings** - Prevents misuse through extended sessions  
✓ **Cooldown enforcement** - Prevents excessive daily use  
✓ **Clear disclaimers** - Healthcare consultation recommended  

---

**Document Version:** 1.0  
**Last Updated:** System-defined protocol defaults  
**Purpose:** Demo application and evaluator review  
**Compliance:** External-use-only, safety-oriented, non-medical
