# Ayurnxt - Visual System Quick Reference

## 🎨 Animation Classes

```css
.protocol-transition    → State change (0.8s fade + blur)
.protocol-slide        → Element entrance (0.6s slide)
.breathing-glow        → 4s breathing effect
.breathing-pulse       → 4s pulse with shadow
.session-locked        → 2s lock indicator
.earned-achievement    → 0.8s achievement reveal
.safety-overlay        → Blur background (0.5s)
.safety-content        → Focus content (0.6s + delay)
.streak-indicator      → 2s pulse for streaks
.responsible-warning   → 0.6s caring alert
.deliberate-action     → Button press feedback
```

## ⏱️ Timing Guide

```
Fast (200-300ms)    → Micro-interactions
Medium (500-800ms)  → State transitions
Slow (2-4s)         → Breathing effects
Infinite            → Ambient animations
```

## 🎨 Color Palette

```
Emerald 50:  #f0fdf4  (Backgrounds)
Emerald 100: #d1fae5  (Light accents)
Emerald 500: #10b981  (Primary)
Emerald 600: #059669  (Primary dark)
Emerald 700: #047857  (Text, icons)
Emerald 900: #064e3b  (Headings)

Rose 50:     #fef2f2  (Safety backgrounds)
Rose 200:    #fecaca  (Safety borders)
Rose 700:    #be123c  (Safety icons)

Amber 50:    #fffbeb  (Caution backgrounds)
Amber 400:   #fbbf24  (Caution)
Amber 500:   #f59e0b  (Caution dark)
```

## 🎭 Visual Effects

### Breathing (4s cycle)
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.05); opacity: 0.9; }
}
```

### Session Lock (2s cycle)
```css
@keyframes lockGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
}
```

### Earned Achievement (0.8s)
```css
@keyframes earnedGlow {
  from { opacity: 0; transform: scale(0.8); filter: brightness(1.5); }
  to { opacity: 1; transform: scale(1); filter: brightness(1); }
}
```

### Deliberate Press (0.3s)
```css
@keyframes deliberatePress {
  0% { transform: scale(1); }
  50% { transform: scale(0.98); }
  100% { transform: scale(1); }
}
```

## 🎯 Usage Examples

### State Transition
```tsx
<div className="protocol-transition">
  {/* Content */}
</div>
```

### Breathing Timer
```tsx
<div className="breathing-glow">
  <span className="tabular-nums">{time}</span>
</div>
```

### Session Lock
```tsx
<div className="glass session-locked">
  <i className="fa-solid fa-lock"></i>
  <span>Session in Progress</span>
</div>
```

### Safety Modal
```tsx
<div className="safety-overlay">
  <div className="safety-content">
    {/* Modal content */}
  </div>
</div>
```

### Earned Score
```tsx
<div className="earned-achievement">
  <div className="text-6xl">{score}%</div>
</div>
```

### Deliberate Button
```tsx
<button className="deliberate-action">
  Click Me
</button>
```

## 📊 Stagger Delays

```tsx
style={{animationDelay: '0.1s'}}  // Section 1
style={{animationDelay: '0.2s'}}  // Section 2
style={{animationDelay: '0.3s'}}  // Section 3
style={{animationDelay: '0.4s'}}  // Section 4
```

## 🎨 Glassmorphism

```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-dark {
  background: rgba(6, 78, 59, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

## 🎯 Key Principles

1. **Breathing = Calm** (4s cycle)
2. **Deliberate = Authority** (300ms)
3. **Earned = Achievement** (0.8s glow)
4. **Blur = Focus** (12px backdrop)
5. **Soft = Caring** (Rose not Red)

## 🚀 Quick Demo

```javascript
// Enable fast mode
window.ayurnxtDemo.enableFastMode()

// Refresh page

// Sessions: 45min → 54sec
```

## ✅ Visual Checklist

- [ ] Breathing animations visible
- [ ] State transitions smooth
- [ ] Session lock pulsing
- [ ] Safety modal blurs
- [ ] Achievements glow
- [ ] Buttons deliberate
- [ ] Colors soft/caring
- [ ] Typography confident

---

**Ayurnxt** - Visual authority through motion and timing.
