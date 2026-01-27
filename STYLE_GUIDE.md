# 🎨 Quick Style Guide - Lead Management System

## Visual Reference for the New Design

---

## 🎯 Component Styles

### Header
```
╔══════════════════════════════════════════════════════════╗
║  📋 Lead Management System        [+ Add New Lead]      ║
║  (Gradient text)                  (Purple gradient btn)  ║
╚══════════════════════════════════════════════════════════╝
    ↑ Glass effect with blur
    ↑ Sticky positioned
    ↑ Slide-down animation
```

### Statistics Cards
```
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ 📊 TOTAL       │  │ 📞 CONTACTED   │  │ 🔄 FOLLOWED    │
│ LEADS          │  │                │  │ UP             │
│    45          │  │      12        │  │      8         │
└────────────────┘  └────────────────┘  └────────────────┘
  Purple gradient    White + blue bar   White + purple bar
  Hover: Lift 5px    Hover: Lift 5px    Hover: Lift 5px
  Shadow: Strong     Shadow: Medium     Shadow: Medium
```

### Filter Bar
```
┌──────────────────────────────────────────────────────────┐
│  🔍 Search                    📊 Filter by Status        │
│  ┌─────────────────────┐     ┌──────────────────┐       │
│  │ Search...           │     │ All ▼            │       │
│  └─────────────────────┘     └──────────────────┘       │
└──────────────────────────────────────────────────────────┘
    Glass effect, rounded 20px
    Focus: Blue glow
    Hover: Border color change
```

### Data Table
```
╔══════════════════════════════════════════════════════════╗
║ Name ↓   │ Contact          │ Company    │ Status      ║
╠══════════════════════════════════════════════════════════╣
║ John     │ 📧 john@co.com  │ TechCorp   │ [Meeting] ✏️║
║ Smith    │ 📱 555-0101     │            │           🗑️║
╟──────────────────────────────────────────────────────────╢
║ (Hover: Scale 1.01 + Gradient underline)                ║
╚══════════════════════════════════════════════════════════╝
    Gradient header
    Row animations
    Status pills with colors
```

### Modal Dialog
```
        ╔════════════════════════════════════╗
        ║  Add New Lead              [×]     ║
        ╠════════════════════════════════════╣
        ║                                    ║
        ║  Full Name *          Phone *      ║
        ║  ┌────────────┐      ┌─────────┐  ║
        ║  │            │      │         │  ║
        ║  └────────────┘      └─────────┘  ║
        ║                                    ║
        ║  [Create Lead]  [Cancel]           ║
        ║                                    ║
        ╚════════════════════════════════════╝
          Rounded 24px
          Gradient border top
          Blurred backdrop
          Slide-up animation
```

---

## 🎨 Color Reference

### Status Colors
```
Contacted   ●  #3498db  (Blue)
Followed Up ●  #9b59b6  (Purple)
On Hold     ●  #f39c12  (Orange)
Dropped     ●  #e74c3c  (Red)
Meeting     ●  #1abc9c  (Teal)
Done        ●  #27ae60  (Green)
```

### Brand Gradients
```
Primary:    ████████  (#667eea → #764ba2)
Success:    ████████  (#2ecc71 → #27ae60)
Accent:     ████████  (#3498db → #2c3e50)
```

### Backgrounds
```
Main:       ████████  Gradient (#667eea → #764ba2)
Cards:      ████████  White 95% + Blur
Overlay:    ████████  Gradient 40% + Blur
```

---

## 🎬 Animation Examples

### Button Hover
```
State:   [Button]
         ↓
Hover:   [Button] ← Lift 2px
         ↓        ← Shadow grows
         ↓        ← Shimmer passes
```

### Card Hover
```
State:   ┌─────────┐
         │  Card   │
         └─────────┘
         ↓
Hover:   ┌─────────┐  ← Lift 5px
         │  Card   │  ← Scale 1.02
         └─────────┘  ← Shadow increases
```

### Table Row Hover
```
State:   ─────────────────
         │  Row Data    │
         ─────────────────
         ↓
Hover:   ═════════════════  ← Gradient background
         │  Row Data    │  ← Scale 1.01
         ═════════════════  ← Gradient underline
```

---

## 📐 Spacing System

```
Micro:      0.5rem   (8px)   - Icon gaps
Small:      1rem     (16px)  - Element gaps
Medium:     1.5rem   (24px)  - Component gaps
Large:      2rem     (32px)  - Section gaps
XLarge:     2.5rem   (40px)  - Page sections
```

---

## 🔤 Typography Scale

```
Display:    2rem     32px    Header
Heading:    1.75rem  28px    Modal titles
Subhead:    1.5rem   24px    Card titles
Body:       1rem     16px    Normal text
Small:      0.85rem  13.6px  Labels
Tiny:       0.75rem  12px    Captions
```

---

## 🎯 Interactive States

### Button States
```
Default:   [Button]                    Background: Gradient
Hover:     [Button]  ↑ -2px            Shadow: Stronger
Active:    [Button]  ↓ 0px             Ripple effect
Focus:     [Button]  (Outline ring)    Blue glow
```

### Input States
```
Default:   [Input Field]              Border: Gray
Hover:     [Input Field]              Border: Purple
Focus:     [Input Field]  (Glow)      Border: Purple + Shadow
Error:     [Input Field]  (Red)       Border: Red + Message
```

### Card States
```
Default:   ┌─────────┐                Shadow: Medium
Hover:     ┌─────────┐  ↑             Shadow: Strong
                                       Scale: 1.02
```

---

## 🎨 Visual Effects

### Glass Morphism
```css
background: rgba(255, 255, 255, 0.95)
backdrop-filter: blur(10px)
border: 1px solid rgba(255, 255, 255, 0.3)
```

### Gradient Text
```css
background: linear-gradient(135deg, #667eea, #764ba2)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

### Floating Shadow
```css
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.1),
  0 4px 15px rgba(102, 126, 234, 0.4)
```

### Shimmer Effect
```css
::before {
  background: linear-gradient(90deg, 
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent)
  animation: shimmer 0.5s
}
```

---

## 📱 Breakpoints

```
Mobile:     < 768px     - Stack layouts
Tablet:     768-1024px  - 2-column grids
Desktop:    > 1024px    - Full layouts
Max Width:  1400px      - Content container
```

---

## 🎯 Accessibility

### Contrast Ratios
```
Text/Background:     ≥ 4.5:1  ✓
Large Text:          ≥ 3:1    ✓
Interactive:         ≥ 3:1    ✓
```

### Focus Indicators
```
Keyboard Focus:      Blue glow ring
Mouse Hover:         Border color
Active State:        Pressed effect
```

### Motion
```
Animations:          Smooth, purposeful
Duration:            0.3-0.6s
Reduced Motion:      Respects preferences
```

---

## 🌟 Key Design Principles

1. **Consistency** - Same patterns throughout
2. **Clarity** - Clear visual hierarchy
3. **Feedback** - Every action has response
4. **Performance** - 60fps smooth animations
5. **Beauty** - Delightful micro-interactions

---

## 🎨 Pro Tips

### Layering Depth
```
Level 1: Background gradient
Level 2: Radial overlays
Level 3: Glass cards
Level 4: Content
Level 5: Modals
```

### Animation Timing
```
Fast:    UI feedback (0.3s)
Medium:  State changes (0.4s)
Slow:    Entrances (0.6s)
```

### Shadow Usage
```
Flat:    No shadow (inline elements)
Low:     Subtle shadow (inputs)
Medium:  Card shadow (components)
High:    Elevated shadow (modals)
```

---

**This style guide ensures consistent, beautiful design across your entire application! 🎨**

Every component follows these rules for a cohesive, professional experience.
