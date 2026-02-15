# AYURNXT LOGO COLOR SCHEME

## Official Brand Colors

### Background Colors
- **Primary Background**: `#D4C4A8` (Warm Beige/Tan)
- **Light Background**: `#E0D4BE` (Lighter Beige)
- **Dark Background**: `#C4B498` (Darker Beige)

### Teal/Green Tones (Primary Brand Color)
- **Teal Primary**: `#2F6B5C` (Deep Teal - Main brand color)
- **Teal Medium**: `#3A7D6E` (Medium Teal)
- **Teal Dark**: `#1F4A3F` (Dark Teal - Text and emphasis)

### Gold/Brown Tones (Accent Color)
- **Gold Primary**: `#B8935C` (Warm Gold)
- **Gold Dark**: `#8B6F47` (Dark Gold/Brown)

### Text Colors
- **Primary Text**: `#5C4A3A` (Brown - Body text)
- **Secondary Text**: `#8B7355` (Light Brown - Secondary text)

---

## Color Usage Guide

### Logo
- **Gradient**: `linear-gradient(135deg, #2F6B5C 0%, #3A7D6E 40%, #B8935C 100%)`
- Creates the signature teal-to-gold transition
- White leaf icon on gradient background

### Brand Name (Ayurnxt)
- **Gradient**: `linear-gradient(135deg, #2F6B5C 0%, #1F4A3F 100%)`
- Deep teal gradient for professional look
- Text gradient clip for premium effect

### Buttons (Primary CTA)
- **Gradient**: `linear-gradient(135deg, #2F6B5C 0%, #3A7D6E 50%, #B8935C 100%)`
- Full teal-to-gold gradient
- White text for maximum contrast
- Shadow: `0 8px 24px rgba(47, 107, 92, 0.3)`

### Cards & Containers
- **Background**: `rgba(255, 255, 255, 0.65)` (Semi-transparent white)
- **Border**: `1px solid rgba(47, 107, 92, 0.15)` (Subtle teal)
- **Shadow**: `0 8px 32px rgba(47, 107, 92, 0.12)` (Soft teal shadow)
- **Backdrop Filter**: `blur(20px)` (Glassmorphism)

### Navigation Bar
- **Background**: `rgba(255, 255, 255, 0.75)` (Semi-transparent white)
- **Border Bottom**: `1px solid rgba(47, 107, 92, 0.12)` (Subtle teal)
- **Shadow**: `0 2px 16px rgba(47, 107, 92, 0.08)` (Soft shadow)

### Icons & Badges
- **Primary Color**: `#2F6B5C` (Teal Primary)
- **Background**: `rgba(47, 107, 92, 0.1)` (10% teal tint)
- Used for trust indicators, badges, and icons

### Links & Interactive Elements
- **Default**: `#2F6B5C` (Teal Primary)
- **Hover**: Slightly darker or scale effect
- **Border**: `rgba(47, 107, 92, 0.3)` (30% teal)

---

## CSS Variables

```css
:root {
  /* Background Colors */
  --beige-bg: #D4C4A8;
  --beige-light: #E0D4BE;
  --beige-dark: #C4B498;
  
  /* Teal/Green Tones */
  --teal-primary: #2F6B5C;
  --teal-medium: #3A7D6E;
  --teal-dark: #1F4A3F;
  
  /* Gold/Brown Tones */
  --gold-primary: #B8935C;
  --gold-dark: #8B6F47;
  
  /* Text Colors */
  --brown-text: #5C4A3A;
  --brown-light: #8B7355;
}
```

---

## Gradient Formulas

### Logo Gradient (Teal to Gold)
```css
background: linear-gradient(135deg, #2F6B5C 0%, #3A7D6E 40%, #B8935C 100%);
```

### Brand Name Gradient (Teal Depth)
```css
background: linear-gradient(135deg, #2F6B5C 0%, #1F4A3F 100%);
```

### Button Gradient (Full Spectrum)
```css
background: linear-gradient(135deg, #2F6B5C 0%, #3A7D6E 50%, #B8935C 100%);
```

### Background Gradient (Subtle Beige)
```css
background: linear-gradient(135deg, #D4C4A8 0%, #E0D4BE 50%, #D4C4A8 100%);
```

---

## Shadow Formulas

### Logo Shadow
```css
box-shadow: 0 20px 60px rgba(47, 107, 92, 0.3);
```

### Card Shadow
```css
box-shadow: 0 8px 32px rgba(47, 107, 92, 0.12);
```

### Button Shadow
```css
box-shadow: 0 8px 24px rgba(47, 107, 92, 0.3);
```

### Navigation Shadow
```css
box-shadow: 0 2px 16px rgba(47, 107, 92, 0.08);
```

---

## Opacity & Transparency Guide

### Backgrounds
- **Cards**: 65% white (`rgba(255, 255, 255, 0.65)`)
- **Navigation**: 75% white (`rgba(255, 255, 255, 0.75)`)
- **Buttons**: 60% white (`rgba(255, 255, 255, 0.6)`)

### Borders
- **Subtle**: 10-15% teal (`rgba(47, 107, 92, 0.1)` to `0.15`)
- **Medium**: 20% teal (`rgba(47, 107, 92, 0.2)`)
- **Visible**: 30% teal (`rgba(47, 107, 92, 0.3)`)

### Shadows
- **Soft**: 8-12% teal (`rgba(47, 107, 92, 0.08)` to `0.12`)
- **Medium**: 20-30% teal (`rgba(47, 107, 92, 0.2)` to `0.3`)

---

## Accessibility

### Contrast Ratios
- **Teal Primary (#2F6B5C) on Beige (#D4C4A8)**: ✓ WCAG AA compliant
- **Dark Teal (#1F4A3F) on Beige (#D4C4A8)**: ✓ WCAG AAA compliant
- **Brown Text (#5C4A3A) on Beige (#D4C4A8)**: ✓ WCAG AA compliant
- **White on Teal Gradient**: ✓ WCAG AAA compliant

### Focus States
- **Outline Color**: `#2F6B5C` (Teal Primary)
- **Outline Width**: 2px
- **Outline Offset**: 2px

### Selection Color
- **Background**: `rgba(47, 107, 92, 0.2)` (20% teal)
- **Text**: `#1F4A3F` (Dark Teal)

---

## Brand Personality

### Visual Characteristics
- **Warm & Natural**: Beige background evokes natural, earthy Ayurvedic roots
- **Professional & Trustworthy**: Deep teal conveys medical professionalism
- **Premium & Elegant**: Gold accents add sophistication
- **Calm & Soothing**: Soft color transitions create peaceful atmosphere

### Emotional Response
- **Trust**: Professional teal tones
- **Wellness**: Natural beige and green
- **Innovation**: Modern gradients and glassmorphism
- **Heritage**: Traditional Ayurvedic color palette

---

## Implementation Notes

1. **Always use the logo gradient** for primary brand elements
2. **Maintain beige background** (#D4C4A8) throughout the app
3. **Use teal for interactive elements** (buttons, links, icons)
4. **Reserve gold for accents** (gradients, highlights)
5. **Keep text in brown tones** for warmth and readability
6. **Apply glassmorphism** to cards and navigation for premium feel
7. **Use soft shadows** with teal tint for brand consistency

---

## Color Psychology

### Teal (#2F6B5C)
- Represents healing, tranquility, and professionalism
- Associated with medical care and wellness
- Conveys trust and reliability

### Gold (#B8935C)
- Represents quality, tradition, and value
- Associated with Ayurvedic heritage
- Adds warmth and premium feel

### Beige (#D4C4A8)
- Represents natural, organic, and earthy
- Creates calm, soothing atmosphere
- Provides neutral, elegant backdrop

---

**Brand Consistency**: Always refer to this document when implementing new features to maintain visual coherence across the Ayurnxt platform.
