# Ayurnxt - Design Reference

## 🎨 Color Palette

### Primary Colors
```
Emerald 50:  #f0fdf4  (Soft backgrounds)
Emerald 100: #d1fae5  (Light accents)
Emerald 200: #a7f3d0  (Borders, subtle highlights)
Emerald 300: #6ee7b7  (Progress bars, active states)
Emerald 400: #34d399  (Hover states)
Emerald 500: #10b981  (Primary actions)
Emerald 600: #059669  (Primary buttons)
Emerald 700: #047857  (Primary text, icons)
Emerald 800: #065f46  (Dark text)
Emerald 900: #064e3b  (Headings, emphasis)
```

### Accent Colors
```
Rose 50:     #fef2f2  (Soft backgrounds)
Rose 100:    #fee2e2  (Light accents)
Amber 400:   #fbbf24  (Attention, warnings)
Amber 500:   #f59e0b  (Schedule highlights)
```

### Neutral Colors
```
White:       #ffffff  (Cards, inputs)
Stone 50:    #fafaf9  (Subtle backgrounds)
Stone 100:   #f5f5f4  (Borders)
Stone 400:   #a8a29e  (Placeholder text)
Stone 700:   #44403c  (Secondary text)
```

## 📐 Spacing Scale

### Padding
```
p-4:  16px  (Compact cards)
p-5:  20px  (Standard cards)
p-6:  24px  (Comfortable cards)
p-7:  28px  (Spacious cards)
p-8:  32px  (Hero sections)
```

### Gaps
```
space-y-3:  12px  (Tight lists)
space-y-4:  16px  (Standard lists)
space-y-5:  20px  (Comfortable lists)
space-y-6:  24px  (Section spacing)
space-y-8:  32px  (Major sections)
```

### Margins
```
mb-2:  8px   (Label spacing)
mb-3:  12px  (Small section breaks)
mb-4:  16px  (Standard section breaks)
mb-6:  24px  (Major section breaks)
mb-8:  32px  (Page section breaks)
```

## 🔤 Typography

### Font Families
```css
/* Headings - Serif for authority */
font-family: 'Crimson Pro', serif;

/* Body - Sans-serif for clarity */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Font Sizes
```
text-[9px]:   9px   (Tiny labels)
text-[10px]:  10px  (Small labels, badges)
text-xs:      12px  (Secondary text)
text-sm:      14px  (Body text)
text-base:    16px  (Standard text)
text-lg:      18px  (Subheadings)
text-xl:      20px  (Section headings)
text-2xl:     24px  (Card headings)
text-3xl:     30px  (Page headings)
text-5xl:     48px  (Hero headings)
```

### Font Weights
```
font-normal:    400  (Body text)
font-medium:    500  (Emphasis)
font-semibold:  600  (Subheadings)
font-bold:      700  (Headings, buttons)
```

### Line Heights
```
leading-relaxed:  1.625  (Body text)
leading-tight:    1.25   (Headings)
```

## 🎭 Effects

### Shadows
```css
/* Subtle card shadow */
shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)

/* Standard card shadow */
shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)

/* Elevated card shadow */
shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)

/* Premium shadow */
shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1)

/* Colored shadows */
shadow-emerald-200/50: 0 10px 15px rgba(167, 243, 208, 0.5)
```

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-dark {
  background: rgba(6, 78, 59, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### Gradients
```css
/* Primary gradient */
background: linear-gradient(135deg, #064e3b 0%, #10b981 100%);

/* Button gradient */
background: linear-gradient(to right, #059669 0%, #047857 100%);

/* Background gradient */
background: linear-gradient(135deg, #f0fdf4 0%, #fef3f2 100%);

/* Icon gradient */
background: linear-gradient(to bottom right, #10b981 0%, #059669 100%);
```

## 🎬 Animations

### Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
  50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
}
```

### Timing
```css
/* Standard transition */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Smooth entrance */
animation: fadeIn 0.5s ease-out forwards;

/* Staggered entrance */
animation: slideUp 0.6s ease-out forwards;
animation-delay: 0.1s; /* Increment by 0.05s-0.1s */

/* Continuous animation */
animation: float 3s ease-in-out infinite;
animation: pulse-glow 2s ease-in-out infinite;
```

## 📏 Border Radius

```
rounded-lg:   8px   (Small elements)
rounded-xl:   12px  (Standard cards)
rounded-2xl:  16px  (Large cards)
rounded-3xl:  24px  (Hero cards)
rounded-full: 9999px (Circles, pills)
```

## 🎯 Component Patterns

### Card Pattern
```tsx
<div className="glass p-6 rounded-3xl shadow-lg">
  {/* Content */}
</div>
```

### Button Pattern
```tsx
<button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-200/50 hover:shadow-xl hover:scale-[1.02] transition-smooth">
  Button Text
</button>
```

### Input Pattern
```tsx
<input 
  className="w-full px-4 py-3.5 rounded-xl glass border border-emerald-100 focus:outline-none input-glow transition-smooth text-emerald-900"
  placeholder="Placeholder"
/>
```

### Icon Badge Pattern
```tsx
<div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200/50">
  <i className="fa-solid fa-icon text-white"></i>
</div>
```

### Section Header Pattern
```tsx
<div className="flex items-center space-x-2 mb-4">
  <i className="fa-solid fa-icon text-emerald-600 text-sm"></i>
  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800/70">
    Section Title
  </h3>
</div>
```

## 🎨 Design Tokens

### Opacity Levels
```
/10:  10%  (Very subtle)
/20:  20%  (Subtle)
/30:  30%  (Light)
/40:  40%  (Medium-light)
/50:  50%  (Medium)
/60:  60%  (Medium-dark)
/70:  70%  (Dark)
/80:  80%  (Very dark)
```

### Letter Spacing
```
tracking-tighter:  -0.05em  (Tight headings)
tracking-tight:    -0.025em (Headings)
tracking-normal:   0em      (Body text)
tracking-wide:     0.025em  (Emphasis)
tracking-wider:    0.05em   (Labels)
tracking-widest:   0.1em    (Small caps)
tracking-[0.15em]: 0.15em   (Tiny labels)
tracking-[0.2em]:  0.2em    (Footer text)
```

## 🖼️ Icon Usage

### Icon Sizes
```
text-[9px]:  9px   (Tiny inline icons)
text-[10px]: 10px  (Small inline icons)
text-xs:     12px  (Badge icons)
text-sm:     14px  (Button icons)
text-base:   16px  (Standard icons)
text-lg:     18px  (Tab icons)
text-xl:     20px  (Card icons)
text-2xl:    24px  (Status icons)
text-3xl:    30px  (Empty state icons)
text-4xl:    36px  (Large empty state)
text-5xl:    48px  (Hero icons)
```

### Icon Colors
```
text-emerald-600:    Primary actions
text-emerald-700:    Standard icons
text-emerald-700/40: Inactive states
text-emerald-700/60: Secondary icons
text-white:          Icons on colored backgrounds
text-amber-600:      Warning/attention icons
```

## 📱 Responsive Breakpoints

```
sm:  640px   (Small tablets)
md:  768px   (Tablets)
lg:  1024px  (Laptops)
xl:  1280px  (Desktops)
2xl: 1536px  (Large desktops)
```

### Container Max-Width
```
max-w-md:  448px  (Patient flows)
max-w-lg:  512px  (Main container)
max-w-xl:  576px  (Wide content)
max-w-2xl: 672px  (Provider dashboard)
```

## 🎯 Accessibility

### Focus States
```css
/* Visible focus for keyboard navigation */
*:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}

/* Input focus glow */
.input-glow:focus {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
```

### Touch Targets
```
Minimum: 44px × 44px
Recommended: 48px × 48px
```

### Color Contrast
```
Text on white: Emerald 900 (AAA)
Text on emerald: White (AAA)
Secondary text: Emerald 700/60 (AA)
```

## 🌟 Best Practices

### Do's
✅ Use glassmorphism for cards
✅ Add smooth transitions to all interactions
✅ Use gradient backgrounds for hero sections
✅ Include shadow effects for depth
✅ Stagger entrance animations
✅ Use emerald colors for primary actions
✅ Add hover states to interactive elements
✅ Use serif fonts for headings
✅ Include trust signals and disclaimers

### Don'ts
❌ Don't use harsh shadows
❌ Don't animate too aggressively
❌ Don't use bright, loud colors
❌ Don't skip loading states
❌ Don't forget mobile responsiveness
❌ Don't use generic healthcare imagery
❌ Don't make claims about diagnosis/cure
❌ Don't use chatbot language

---

**Ayurnxt Design System** - Premium, calm, trustworthy healthcare UI
