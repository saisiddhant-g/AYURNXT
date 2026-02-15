# STITCH DESIGN SYSTEM FOR AYURNXT

## Overview
Visual design system based on Stitch UI reference, applied as a skin over the existing Ayurnxt protocol logic.

**IMPORTANT**: All protocol logic, state machine, and enforcement rules remain 100% intact.

---

## Color Palette

### Primary Colors
```css
--bg-primary: #F5F3EF;        /* Main background - soft cream */
--bg-secondary: #FFFFFF;       /* Card backgrounds - pure white */
--bg-card: #FDFCFA;           /* Card surface - warm white */
--green-primary: #2D5F4F;     /* Primary green - buttons, headings */
--green-secondary: #3A7D6E;   /* Secondary green - hover states */
--green-light: #E8F3F0;       /* Light green - badges, backgrounds */
```

### Accent Colors
```css
--orange-accent: #D4915C;     /* Warning/accent color */
--orange-light: #F5E6D8;      /* Light orange - warning backgrounds */
```

### Text Colors
```css
--text-primary: #2C3E3B;      /* Primary text - headings */
--text-secondary: #6B7C78;    /* Secondary text - body */
--text-muted: #9BA8A4;        /* Muted text - labels, hints */
```

### UI Elements
```css
--border-light: #E5E3DF;      /* Borders, dividers */
--shadow-sm: 0 2px 8px rgba(45, 95, 79, 0.08);
--shadow-md: 0 4px 16px rgba(45, 95, 79, 0.12);
--shadow-lg: 0 8px 24px rgba(45, 95, 79, 0.16);
```

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

### Font Sizes
- **Headings**: 24-32px, font-weight: 700
- **Subheadings**: 16-20px, font-weight: 600
- **Body**: 14-15px, font-weight: 400
- **Small**: 12-13px, font-weight: 500
- **Tiny**: 10-11px, font-weight: 600

---

## Component Styles

### Cards
```css
.stitch-card {
  background: #FDFCFA;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(45, 95, 79, 0.08);
  border: 1px solid #E5E3DF;
  padding: 20-24px;
}
```

### Buttons

**Primary Button**
```css
.stitch-button-primary {
  background: #2D5F4F;
  color: white;
  border-radius: 12px;
  padding: 14px 24px;
  font-weight: 600;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(45, 95, 79, 0.08);
}

.stitch-button-primary:hover {
  background: #3A7D6E;
  transform: translateY(-1px);
}
```

**Secondary Button**
```css
.stitch-button-secondary {
  background: #FFFFFF;
  color: #2D5F4F;
  border-radius: 12px;
  padding: 14px 24px;
  font-weight: 600;
  border: 1px solid #E5E3DF;
}

.stitch-button-secondary:hover {
  background: #E8F3F0;
  border-color: #2D5F4F;
}
```

### Badges

**Success Badge**
```css
.stitch-badge-success {
  background: #E8F3F0;
  color: #2D5F4F;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
```

**Warning Badge**
```css
.stitch-badge-warning {
  background: #F5E6D8;
  color: #D4915C;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
}
```

---

## Layout Structure

### Navigation Bar
- **Background**: White with 95% opacity, backdrop blur
- **Border**: 1px solid #E5E3DF
- **Shadow**: Subtle top shadow
- **Height**: 64px
- **Logo**: Circular, 40px diameter
- **Brand Name**: #2D5F4F, 20px, font-weight: 600

### Main Content
- **Background**: #F5F3EF gradient
- **Max Width**: 448px (28rem)
- **Padding**: 24px horizontal
- **Spacing**: 32px between sections

### Footer
- **Background**: Transparent
- **Text**: #9BA8A4, 10px, uppercase
- **Padding**: 24px vertical

---

## Screen-Specific Designs

### 1. QR Activation Screen
- **Checkmark Icon**: Large circular green checkmark
- **Status Text**: "Unit Detected" - bold, #2C3E3B
- **Description**: Small text, #6B7C78
- **Button**: Full-width primary button
- **Cancel**: Secondary text button below

### 2. Therapy Protocol Setup
- **Body Silhouette**: Gray body diagram for area selection
- **Target Area**: Highlighted in green when selected
- **Condition Cards**: White cards with colored icons
  - Internal Pain: Orange icon
  - External Pain: Blue icon
  - Minor Wound: Red icon
- **Confirm Button**: Green primary button with arrow

### 3. Live Supervision Screen
- **Timer**: Large circular progress ring
  - Green stroke for progress
  - Time display in center (MM:SS)
- **Status Text**: "How does it feel?" below timer
- **Sensation Options**: Radio buttons with icons
  - Mild warmth
  - No sensation
  - Strong discomfort (warning icon)
- **Action Buttons**: Bottom navigation icons

### 4. Post-Session Log
- **Pain Sliders**: Horizontal sliders with labels
  - "Pain Level Before": 0-10 scale
  - "Pain Level After": 0-10 scale
- **Improvement Badge**: Green badge showing "-3 Points"
- **Notes Section**: Text area with light border
- **Complete Button**: Full-width green button

### 5. Compliance Dashboard
- **Header**: "Compliance Dashboard" with user icon
- **Metrics Card**: Blue card with completion stats
- **Experience Score**: Large percentage display (94%)
- **Progress Bar**: Green filled bar
- **Pain Chart**: Line graph showing trend
- **Session List**: Cards with status badges
  - Green: Completed
  - Orange: Incomplete
- **Recommendation Card**: Orange card at bottom

---

## Animations

### Transitions
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

### Hover Effects
- **Buttons**: translateY(-1px) + shadow increase
- **Cards**: Shadow increase
- **Icons**: scale(1.05)

### Loading States
- **Spinner**: Rotating circle
- **Progress**: Smooth fill animation
- **Fade In**: opacity 0 → 1, translateY(20px) → 0

---

## Icons

### Icon Library
Font Awesome 6 (solid style)

### Common Icons
- **QR Code**: fa-qrcode
- **Shield**: fa-shield-heart
- **Check**: fa-check-circle
- **Warning**: fa-triangle-exclamation
- **User**: fa-user-doctor
- **Lock**: fa-lock
- **Home**: fa-house
- **Arrow**: fa-arrow-right
- **Clock**: fa-clock

---

## Implementation Guidelines

### DO:
✓ Apply Stitch colors to all UI elements
✓ Use Stitch card styling for containers
✓ Update button styles to match Stitch
✓ Apply Stitch typography
✓ Use Stitch shadows and borders
✓ Implement Stitch animations

### DON'T:
✗ Modify therapyProtocol.ts
✗ Change state machine logic
✗ Alter enforcement rules
✗ Modify session locking
✗ Add or remove protocol states
✗ Change validation logic

---

## Component Mapping

### Existing → Stitch Style

**QRScanSimulation.tsx**
- Apply stitch-card styling
- Use green checkmark icon
- Update button to stitch-button-primary

**TherapySetup.tsx**
- Add body silhouette diagram
- Style condition cards with colored icons
- Update buttons to Stitch style

**LiveTherapySession.tsx**
- Implement circular progress ring
- Style sensation radio buttons
- Update colors to Stitch palette

**StructuredPainLogging.tsx**
- Style sliders with Stitch colors
- Add improvement badge
- Update button styling

**ComplianceDashboard.tsx**
- Implement metrics cards
- Add line chart for pain trend
- Style session list with badges
- Add recommendation card

---

## Responsive Behavior

### Mobile First (< 640px)
- Full width cards
- Stacked layouts
- Touch-friendly buttons (min 44px height)

### Tablet (640px - 1024px)
- Max width 448px centered
- Maintain mobile layout

### Desktop (> 1024px)
- Max width 448px centered
- Hover states enabled

---

## Accessibility

### Color Contrast
- Text on white: Minimum 4.5:1 ratio
- Buttons: Minimum 3:1 ratio
- Focus states: 2px solid #2D5F4F outline

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support

---

## Files to Update

1. **index.css** - ✅ Updated with Stitch color variables
2. **components/Layout.tsx** - ✅ Updated with Stitch navigation
3. **App.tsx** - Needs Stitch landing page styling
4. **components/QRScanSimulation.tsx** - Needs Stitch card styling
5. **components/TherapySetup.tsx** - Needs body diagram + Stitch cards
6. **components/LiveTherapySession.tsx** - Needs circular progress ring
7. **components/StructuredPainLogging.tsx** - Needs slider styling
8. **ComplianceDashboard.tsx** - Needs chart + metrics cards

---

**Status**: Partial implementation complete. Core design system established.
**Next Steps**: Apply Stitch styling to remaining components while preserving all protocol logic.
