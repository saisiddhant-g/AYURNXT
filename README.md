# Ayurnxt – Smart Ayurvedic Therapy System

A production-quality **protocol-driven therapy system** showcasing intelligent supervision for herbal plaster therapy.

## 🌿 Overview

Ayurnxt is a premium web application designed to demonstrate a modern, clinically-responsible approach to Ayurvedic therapy management. The system provides:

- **Protocol Enforcement**: Strict state machine prevents misuse
- **QR Authentication**: Simulated plaster scanning for session initiation
- **Live Session Monitoring**: Locked therapy sessions with safety checks
- **Structured Data Collection**: Pain assessment and compliance tracking
- **Provider Dashboard**: Clinical case management and oversight

## ✨ Key Features

### Protocol-Driven Workflow
- **State Machine**: 6 sequential states that cannot be skipped
- **Session Locking**: Active sessions cannot be paused or restarted
- **Cooldown Enforcement**: Prevents overuse with mandatory rest periods
- **Safety Checks**: Mid-session sensation monitoring
- **Page Refresh Protection**: Active sessions persist across refreshes

### Premium Healthcare UI
- Glassmorphism design with soft gradients
- Smooth animations and micro-interactions
- Calm, trustworthy aesthetic optimized for healthcare
- Mobile-first responsive design

### Clinical Responsibility
- Clear disclaimers: guidance only, not diagnosis
- Professional terminology and tone
- Evidence-based approach
- Supervised care emphasis
- Consultation recommendations when needed

### Demo-Ready Experience
- Impressive first 10 seconds with hero animations
- Smooth transitions between views
- Local data persistence for demo purposes
- Export functionality for clinical data

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- A Gemini API key for AI-powered recommendations

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set your Gemini API key in `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to the URL shown (typically `http://localhost:5173`)

## 📱 Usage

### Protocol Flow (Complete Session)
1. **Landing Page**: Click "Scan Therapy Plaster"
2. **QR Scan**: Watch authentication animation (2 seconds)
3. **Setup**: Select body area and therapy mode, confirm protocol
4. **Live Session**: Complete locked therapy session with sensation check
5. **Session End**: Review completion status
6. **Pain Logging**: Record before/after pain levels and mobility
7. **Compliance Dashboard**: View progress, trends, and next session availability

### Provider Portal
1. Click "Healthcare Provider Portal" on landing page
2. View all therapy sessions
3. Review compliance metrics
4. Export data (read-only, protocol enforcement prevents modification)

## 🎨 Design Philosophy

- **Calm & Premium**: Soft emerald gradients, glassmorphism, breathing space
- **Trust Signals**: Professional icons, clinical terminology, security indicators
- **Smooth Motion**: Subtle animations that feel natural, not distracting
- **Protocol-First**: Enforced workflows, not free-form navigation

## 🔒 Important Notes

- This is a **demonstration system** for evaluation purposes
- Not intended for actual medical use without proper clinical validation
- No diagnosis or treatment claims are made
- The plaster delivers therapy; software provides guidance only

## 🛠 Technology Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **AI**: Google Gemini API for personalized recommendations
- **Build**: Vite for fast development and optimized production builds
- **Icons**: Font Awesome 6
- **Fonts**: Inter (UI) + Crimson Pro (headings)

## 📦 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## 🎯 Evaluation Points

When evaluating this demo, notice:

1. **First Impression**: Hero animation, premium feel, immediate trust
2. **User Flow**: Intuitive navigation, clear CTAs, smooth transitions
3. **Clinical Tone**: Professional, responsible, evidence-based language
4. **Visual Polish**: Glassmorphism, gradients, micro-interactions
5. **Functionality**: Complete patient journey from initialization to tracking

---

**Ayurnxt** – Where ancient wisdom meets modern technology, responsibly.
