# CONDITION TIMING SYSTEM - QUICK SUMMARY

## Overview
Extended Ayurnxt therapy timing logic with condition-based protocol selection.

---

## 📋 STRUCTURED OUTPUT (As Requested)

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

## 🎯 CONDITION TYPES

### 1. Internal Pain
- **Definition:** Deep musculoskeletal pain perceived internally
- **Examples:** Joint pain, back pain, muscle ache
- **Duration:** 30–45 minutes
- **Max/Day:** 1 session
- **Cooldown:** 10 hours

### 2. External Pain
- **Definition:** Surface-level discomfort on intact skin
- **Examples:** Muscle soreness, sprain discomfort, localized tenderness
- **Duration:** 20–30 minutes
- **Max/Day:** 1 session
- **Cooldown:** 8 hours

### 3. Minor Superficial Wounds
- **Definition:** Shallow abrasions, non-bleeding scratches, superficial burns
- **Examples:** Minor scratches (closed), healed burns, paper cuts (closed)
- **Duration:** 15–20 minutes
- **Max/Day:** 1 session
- **Cooldown:** 12 hours
- **⚠️ Critical:** Wound must be closed, non-bleeding, no infection

### 4. Not Supported
- **Definition:** Conditions not appropriate for external plaster therapy
- **Examples:** Open wounds, bleeding, infected wounds, deep lacerations
- **Action:** Display safety notice, prevent session start
- **Message:** "Consult a healthcare professional; external plaster therapy is not appropriate for this condition."

---

## 📊 QUICK REFERENCE TABLE

| Condition | Duration | Max/Day | Cooldown | Status |
|-----------|----------|---------|----------|--------|
| Internal Pain | 30–45 min | 1 | 10 hrs | ✓ Supported |
| External Pain | 20–30 min | 1 | 8 hrs | ✓ Supported |
| Minor Wounds | 15–20 min | 1 | 12 hrs | ✓ Supported |
| Not Supported | N/A | 0 | N/A | ✗ Blocked |

---

## 🔧 FILES CREATED

1. **conditionProtocols.ts** - Complete TypeScript implementation
   - Condition definitions and enums
   - Protocol timing configurations
   - Validation functions
   - Helper utilities

2. **CONDITION_PROTOCOLS_REFERENCE.md** - Comprehensive documentation
   - Detailed condition descriptions
   - Protocol specifications
   - Integration guidelines
   - Safety enforcement rules

3. **conditionTimings.json** - Structured JSON output
   - Machine-readable format
   - All timing data
   - Metadata and references

4. **CONDITION_INTEGRATION_EXAMPLE.tsx** - React integration examples
   - UI components
   - Validation hooks
   - Complete setup flow
   - Usage patterns

5. **CONDITION_TIMING_SUMMARY.md** - This quick reference

---

## 💻 USAGE EXAMPLES

### Get Timing for Condition
```typescript
import { getConditionTiming, ConditionCategory } from './conditionProtocols';

const timing = getConditionTiming(ConditionCategory.INTERNAL_PAIN);
console.log(timing.sessionDuration);    // "30–45 minutes"
console.log(timing.maxSessionsPerDay);  // 1
console.log(timing.cooldownHours);      // 10
console.log(timing.demoProtocolText);   // Full protocol text
```

### Validate Session Start
```typescript
import { ConditionValidator } from './conditionProtocols';

const validation = ConditionValidator.canStartSession(
  ConditionCategory.EXTERNAL_PAIN,
  lastSessionTime
);

if (validation.allowed) {
  // Start session
} else {
  // Show reason: validation.reason
}
```

### Check Support Status
```typescript
import { isConditionSupported, getSafetyNotice } from './conditionProtocols';

if (!isConditionSupported(ConditionCategory.NOT_SUPPORTED)) {
  const notice = getSafetyNotice(ConditionCategory.NOT_SUPPORTED);
  alert(notice); // Show safety warning
}
```

---

## 🛡️ SAFETY FEATURES

✓ **Non-medical language** - All text uses neutral, clinical terminology  
✓ **Protocol defaults** - Clearly marked as demonstration system defaults  
✓ **Unsupported conditions** - Blocked with safety notices  
✓ **Cooldown enforcement** - Prevents excessive use  
✓ **Fixed durations** - Based on practitioner guidance  
✓ **Professional consultation** - Recommended throughout  

---

## 📚 REFERENCE BASIS

**Topical Oil Application Guidance:**
- Nutraceutical topical oil applications often recommend gentle application then leaving on for ~20–30 minutes for pain relief
- Traditional topical oil treatments like Murivenna suggest applying oil and leaving it on the skin for approximately 30 minutes

**Safety Standards:**
- External use only on appropriate skin conditions
- System-defined protocol defaults for demonstration
- Not medical prescriptions or healing claims

---

## 🚀 INTEGRATION STEPS

1. Import condition protocols into your therapy setup
2. Add condition selection as first step in user flow
3. Use selected condition to determine session duration
4. Validate before starting each session
5. Display appropriate protocol text and safety notices
6. Enforce cooldown periods between sessions

---

## ⚠️ IMPORTANT REMINDERS

- These are **system-defined protocol defaults**
- **NOT medical advice** or treatment prescriptions
- All applications are **EXTERNAL ONLY**
- **Consult healthcare professional** for actual treatment
- Suitable for **demo and evaluation purposes**

---

**Version:** 1.0  
**Compliance:** Non-medical, safety-oriented, demonstration defaults  
**Language:** Clinical, neutral, appropriate for healthcare demo
