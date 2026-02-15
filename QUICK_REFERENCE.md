# Ayurnxt - Quick Reference Card

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## ⚡ Fast Demo Mode

```javascript
// Open browser console (F12)
window.ayurnxtDemo.enableFastMode()
// Refresh page
// 45min sessions → 54 seconds
```

## 📊 Protocol States

```
1. IDLE          → Landing page
2. QR_SCAN       → Plaster authentication (5s)
3. SETUP         → Protocol configuration (30s)
4. LIVE_SESSION  → Locked therapy (45min or 54s fast)
5. SESSION_END   → Completion status (5s)
6. PAIN_LOGGING  → Required data (30s)
7. COMPLIANCE    → Progress dashboard
```

## 🔒 Key Enforcement Rules

- ❌ Cannot skip states
- ❌ Cannot pause sessions
- ❌ Cannot bypass cooldowns
- ❌ Cannot avoid pain logging
- ✅ Page refresh preserves state
- ✅ Safety checks are mandatory
- ✅ Consultation recommendations automatic

## 🎯 Therapy Modes

| Mode | Duration | Cooldown |
|------|----------|----------|
| Mild Pain | 30 min | 4 hours |
| Moderate Pain | 45 min | 6 hours |
| Post-Activity | 25 min | 3 hours |

## 🛡️ Safety Features

- **Sensation Check** at 50% progress
- **Early Termination** on discomfort
- **Pain Trend Detection** (improving/stable/worsening)
- **Consultation Triggers** (worsening trends, high pain)
- **Cooldown Enforcement** (prevents overuse)

## 📱 Demo Flow (2 min)

1. Click "Scan Therapy Plaster"
2. Wait for QR scan (5s)
3. Select Knee + Moderate Pain
4. Confirm protocol
5. Complete session (54s in fast mode)
6. Select "Mild Warmth" at sensation check
7. Set pain before: 7, after: 4
8. Select "Improved mobility"
9. View compliance dashboard

## 🎨 Design Preserved

- ✅ Glassmorphism
- ✅ Smooth animations
- ✅ Gradient backgrounds
- ✅ Premium typography
- ✅ Micro-interactions

## 🔧 Console Commands

```javascript
// Enable fast mode (2% speed)
window.ayurnxtDemo.enableFastMode()

// Enable ultra-fast mode (0.5% speed)
window.ayurnxtDemo.ultraFastMode()

// Disable fast mode
window.ayurnxtDemo.disableFastMode()

// Check status
window.ayurnxtDemo.getStatus()

// Clear all data
localStorage.clear()
```

## 📊 Compliance Metrics

- **Compliance Score**: % of completed sessions
- **Consistency Streak**: Consecutive completions
- **Pain Trend**: Improving/Stable/Worsening
- **Session History**: All sessions with status

## ⚠️ Consultation Triggers

System recommends professional consultation if:
1. Pain trend is worsening
2. 2+ early terminations in last 5 sessions
3. Average pain ≥ 7 in last 3 sessions

## 📁 Key Files

```
therapyProtocol.ts              - Core protocol system
demoMode.ts                     - Demo speed control
App.tsx                         - State machine
components/QRScanSimulation.tsx - Authentication
components/TherapySetup.tsx     - Configuration
components/LiveTherapySession.tsx - Locked session
components/StructuredPainLogging.tsx - Data collection
components/ComplianceDashboard.tsx - Progress
```

## 📚 Documentation

- **PROTOCOL_DEMO_GUIDE.md** - Complete demo instructions
- **PROTOCOL_SYSTEM.md** - Technical documentation
- **PROTOCOL_TRANSFORMATION.md** - What changed
- **README.md** - Project overview

## 🎯 Evaluation Points

1. **Protocol Enforcement** - Cannot skip or manipulate
2. **Session Locking** - Cannot pause or restart
3. **Safety Monitoring** - Automated checks and triggers
4. **Data Quality** - Structured, required inputs
5. **Premium UI** - Beautiful despite strict rules

## 💡 Pro Tips

- Use fast mode for demos
- Show state enforcement by trying to skip
- Demonstrate cooldown blocking
- Complete 3 sessions to show trends
- Try early termination to show safety

## 🌟 Key Message

**"This system enforces safe, standardized therapy."**

Not a dashboard. Not a chatbot. A protocol-driven clinical supervision system.

---

**Ayurnxt** - Protocol enforcement meets premium design.
