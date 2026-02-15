# AYURNXT CONDITION-BASED PROTOCOL TIMINGS

**System-Defined Protocol Defaults for Condition-Specific Therapy**

---

## OVERVIEW

This document defines condition-based protocol timings for the Ayurnxt external plaster therapy system. Timings are based on commonly available practitioner guidance for topical oil applications.

**Important Disclaimers:**
- These are **demonstration protocol defaults**, NOT medical advice
- All applications are **EXTERNAL ONLY** on appropriate skin conditions
- **Consult a healthcare professional** for personalized treatment guidance

---

## CONDITION CATEGORIES

### 1. INTERNAL PAIN
**Deep musculoskeletal pain perceived internally**

**Examples:**
- Joint pain (knee, shoulder, elbow, hip)
- Back pain (lower back, upper back)
- Muscle ache (deep tissue discomfort)
- Chronic stiffness
- Arthralgia (joint discomfort)

**PROTOCOL TIMING:**
```
Session Duration: 30–45 minutes
Max Sessions per Day: 1
Cooldown Period: 10 hours
```

**SKIN REQUIREMENTS:**
- Intact external skin only
- No open wounds or breaks in skin
- Clean, dry application area

**DEMO PROTOCOL TEXT:**
> System-defined protocol default based on commonly available practitioner guidance for topical oil applications. Traditional Ayurvedic thailam-based applications often recommend gentle application followed by a period of 30–45 minutes for deep musculoskeletal discomfort. This is a demonstration protocol and not medical advice. Consult a healthcare professional for personalized treatment guidance.

**REFERENCE BASIS:**
- Nutraceutical topical oil applications often recommend gentle application then leaving on for ~20–30 minutes for pain relief
- Traditional topical oil treatments suggest applying oil and leaving it on the skin for approximately 30 minutes

---

### 2. EXTERNAL PAIN
**Surface-level discomfort on intact skin**

**Examples:**
- Muscle soreness (post-activity)
- Sprain discomfort (closed skin)
- Localized tenderness
- Mild strain
- Post-exercise muscle fatigue

**PROTOCOL TIMING:**
```
Session Duration: 20–30 minutes
Max Sessions per Day: 1
Cooldown Period: 8 hours
```

**SKIN REQUIREMENTS:**
- Intact external skin only
- No open wounds or active bleeding
- Clean application area

**DEMO PROTOCOL TEXT:**
> System-defined protocol default based on commonly available practitioner guidance. Topical oil applications for surface-level discomfort typically recommend 20–30 minutes of application time. This timing is derived from traditional practices where oils like Murivenna are applied and left on the skin for approximately 30 minutes. This is a demonstration protocol and not medical advice. Consult a healthcare professional for personalized treatment guidance.

**REFERENCE BASIS:**
- Traditional topical oil treatments like Murivenna suggest applying oil and leaving it on the skin for a period such as ~30 minutes
- Commonly available practitioner guidance for surface-level discomfort

---

### 3. MINOR SUPERFICIAL WOUNDS
**Shallow abrasions, non-bleeding scratches, superficial burns (healed surface only)**

**Examples:**
- Shallow abrasions (non-bleeding)
- Minor scratches (surface level, closed)
- Superficial burns (first-degree, healed)
- Paper cuts (closed, no bleeding)
- Minor skin irritation (healed surface)

**PROTOCOL TIMING:**
```
Session Duration: 15–20 minutes
Max Sessions per Day: 1
Cooldown Period: 12 hours
```

**SKIN REQUIREMENTS:**
- Wound surface must be closed and non-bleeding
- No active discharge or weeping
- No signs of infection (redness, swelling, warmth)
- Superficial layer only (no deep tissue involvement)
- Clean, dry wound area

**CONTRAINDICATION WARNING:**
⚠️ Do not apply to open, bleeding, or infected wounds. Discontinue immediately if irritation or discomfort occurs.

**DEMO PROTOCOL TEXT:**
> System-defined protocol default for minor superficial wounds with healed surface only. Application time is limited to 15–20 minutes to minimize skin exposure. This protocol applies ONLY to non-bleeding, closed superficial wounds. This is a demonstration protocol and not medical advice. Consult a healthcare professional for wound care guidance.

---

### 4. NOT SUPPORTED CASES
**Conditions not appropriate for external plaster therapy**

**Examples:**
- Open wounds (actively bleeding)
- Infected wounds (pus, discharge, fever)
- Deep lacerations
- Puncture wounds
- Surgical wounds (fresh)
- Burns (second-degree or higher)
- Ulcers (open)
- Skin with active infection

**PROTOCOL TIMING:**
```
Session Duration: N/A
Max Sessions per Day: 0
Cooldown Period: N/A
```

**SAFETY NOTICE:**
```
⚠️ SAFETY NOTICE

Consult a healthcare professional; external plaster therapy is not 
appropriate for this condition.

This system is designed for external application on intact or 
appropriately healed skin only. Open wounds, bleeding wounds, and 
infected wounds require professional medical evaluation and treatment.

Please seek immediate medical attention for:
• Open or actively bleeding wounds
• Signs of infection (redness, swelling, warmth, discharge, fever)
• Deep lacerations or puncture wounds
• Burns beyond superficial first-degree
• Any wound requiring professional wound care

This is not a substitute for medical treatment.
```

---

## STRUCTURED OUTPUT FORMAT

### JSON Object Mapping

```json
{
  "INTERNAL_PAIN": {
    "sessionDuration": "30–45 minutes",
    "maxSessionsPerDay": 1,
    "cooldownHours": 10,
    "demoProtocolText": "System-defined protocol default based on commonly available practitioner guidance for topical oil applications. Traditional Ayurvedic thailam-based applications often recommend gentle application followed by a period of 30–45 minutes for deep musculoskeletal discomfort. This is a demonstration protocol and not medical advice. Consult a healthcare professional for personalized treatment guidance."
  },
  "EXTERNAL_PAIN": {
    "sessionDuration": "20–30 minutes",
    "maxSessionsPerDay": 1,
    "cooldownHours": 8,
    "demoProtocolText": "System-defined protocol default based on commonly available practitioner guidance. Topical oil applications for surface-level discomfort typically recommend 20–30 minutes of application time. This timing is derived from traditional practices where oils like Murivenna are applied and left on the skin for approximately 30 minutes. This is a demonstration protocol and not medical advice. Consult a healthcare professional for personalized treatment guidance."
  },
  "MINOR_SUPERFICIAL_WOUNDS": {
    "sessionDuration": "15–20 minutes",
    "maxSessionsPerDay": 1,
    "cooldownHours": 12,
    "demoProtocolText": "System-defined protocol default for minor superficial wounds with healed surface only. Application time is limited to 15–20 minutes to minimize skin exposure. This protocol applies ONLY to non-bleeding, closed superficial wounds. This is a demonstration protocol and not medical advice. Consult a healthcare professional for wound care guidance."
  },
  "NOT_SUPPORTED": {
    "sessionDuration": "N/A",
    "maxSessionsPerDay": 0,
    "cooldownHours": 0,
    "demoProtocolText": "This condition type is not supported by the Ayurnxt external plaster therapy system."
  }
}
```

---

## TIMING SUMMARY TABLE

| Condition Type | Duration | Max/Day | Cooldown | Supported |
|----------------|----------|---------|----------|-----------|
| Internal Pain | 30–45 min | 1 | 10 hrs | ✓ Yes |
| External Pain | 20–30 min | 1 | 8 hrs | ✓ Yes |
| Minor Superficial Wounds | 15–20 min | 1 | 12 hrs | ✓ Yes |
| Not Supported | N/A | 0 | N/A | ✗ No |

---

## INTEGRATION GUIDELINES

### TypeScript Usage

```typescript
import { 
  ConditionCategory,
  getConditionTiming,
  getAllConditionTimings,
  isConditionSupported,
  ConditionValidator
} from './conditionProtocols';

// Get timing for specific condition
const timing = getConditionTiming(ConditionCategory.INTERNAL_PAIN);
console.log(timing.sessionDuration); // "30–45 minutes"
console.log(timing.maxSessionsPerDay); // 1
console.log(timing.cooldownHours); // 10

// Get all timings
const allTimings = getAllConditionTimings();

// Check if condition is supported
const supported = isConditionSupported(ConditionCategory.INTERNAL_PAIN); // true

// Validate session can start
const validation = ConditionValidator.canStartSession(
  ConditionCategory.INTERNAL_PAIN,
  lastSessionTime
);
```

### UI Selection Component

```typescript
import { getConditionOptions } from './conditionProtocols';

const options = getConditionOptions();
// Returns array of { value, label, description, isSupported }

// Filter to show only supported conditions
const supportedOptions = options.filter(opt => opt.isSupported);
```

---

## SAFETY ENFORCEMENT

### Before Session Start
1. Verify condition is supported
2. Check cooldown period has elapsed
3. Confirm skin requirements are met
4. Display appropriate protocol text

### During Session
1. Monitor for user-reported discomfort
2. Enforce fixed duration from protocol
3. Enable emergency stop at any time

### For Unsupported Conditions
1. Display safety notice immediately
2. Prevent session from starting
3. Recommend professional consultation
4. Log attempted use for safety tracking

---

## PRACTITIONER GUIDANCE REFERENCES

**Topical Oil Application Timing:**
- Nutraceutical topical oil applications often recommend gentle application then leaving on for approximately 20–30 minutes for pain relief
- Traditional topical oil treatments like Murivenna suggest applying oil and leaving it on the skin for a period such as approximately 30 minutes

**Safety Considerations:**
- All timings are system-defined protocol defaults
- Not medical prescriptions or healing claims
- External use only on appropriate skin conditions
- Professional consultation recommended for persistent symptoms

---

## COMPLIANCE NOTES

✓ **Non-medical language** - All text uses neutral, clinical terminology  
✓ **Safety-first approach** - Unsupported conditions clearly identified  
✓ **Protocol defaults** - Described as demonstration system defaults  
✓ **Professional consultation** - Recommended throughout documentation  
✓ **External use only** - Reinforced for all supported conditions  
✓ **Evidence-based timing** - Based on commonly available practitioner guidance  

---

**Document Version:** 1.0  
**Purpose:** Condition-based protocol timing for demo application  
**Compliance:** Non-medical, safety-oriented, demonstration defaults  
**References:** Commonly available practitioner guidance for topical oil applications
