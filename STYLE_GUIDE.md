# Portfolio Style Guide

## New Sophisticated Color Palette

### Core Colors
- **Charcoal** (`#0F1419`) - Primary dark background
- **Slate** (`#2D3748`) - Secondary dark elements, surfaces
- **Stone** (`#4A5568`) - Medium gray for borders and dividers
- **Silver** (`#718096`) - Light gray for secondary text
- **Pearl** (`#E2E8F0`) - Light elements and primary text on dark
- **Accent** (`#4299E1`) - Subtle blue accent for highlights and CTAs

### Color Usage Guidelines

#### Backgrounds
- **Primary background**: `bg-charcoal`
- **Card/surface backgrounds**: `bg-slate` or `bg-slate/50` for transparency
- **Elevated surfaces**: `bg-slate` with `subtle-shadow` class

#### Text
- **Primary text**: `text-pearl`
- **Secondary text**: `text-silver`
- **Accent text**: `text-accent`

#### Borders
- **Subtle borders**: `border-stone/20` or `border-stone/30`
- **Accent borders**: `border-accent`

#### Interactive Elements
- **Primary buttons**: `bg-accent text-charcoal`
- **Secondary buttons**: `bg-slate text-pearl border-stone`
- **Hover states**: Increase opacity or scale slightly

## Typography Classes

### Headings
```css
.heading-primary {
  @apply text-4xl md:text-6xl lg:text-7xl font-light text-pearl leading-tight;
}

.heading-secondary {
  @apply text-2xl md:text-3xl lg:text-4xl font-light text-pearl;
}
```

### Body Text
```css
.text-body {
  @apply text-base md:text-lg text-silver leading-relaxed;
}

.text-accent {
  @apply text-accent font-medium;
}
```

## Component Classes

### Buttons
```css
.btn-primary {
  @apply bg-accent text-charcoal px-6 py-3 rounded-lg font-medium;
  @apply hover:bg-opacity-90 hover:scale-105 active:scale-95;
  @apply transition-all duration-200;
}

.btn-secondary {
  @apply bg-slate text-pearl px-6 py-3 rounded-lg font-medium;
  @apply hover:bg-stone border border-stone;
  @apply transition-all duration-200;
}
```

### Cards
```css
.card-modern {
  @apply bg-slate/50 backdrop-blur-md border border-stone/30 rounded-xl p-6;
  @apply shadow-lg hover:shadow-xl transition-all duration-300;
}
```

### Visual Effects
```css
.glass-effect {
  backdrop-filter: blur(20px);
  background: rgba(45, 55, 72, 0.8);
  border: 1px solid rgba(113, 128, 150, 0.1);
}

.gradient-border {
  background: linear-gradient(135deg, rgba(66, 153, 225, 0.1), rgba(113, 128, 150, 0.1));
  border: 1px solid rgba(113, 128, 150, 0.2);
}

.subtle-shadow {
  box-shadow: 0 4px 32px rgba(15, 20, 25, 0.3);
}

.text-gradient {
  background: linear-gradient(135deg, #E2E8F0, #718096);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Sections
```css
.section-modern {
  @apply py-20 lg:py-32 px-4 lg:px-8;
}
```

## Migration Guide

### Replace Old Colors
1. `bg-midnight` → `bg-charcoal`
2. `text-mist` → `text-pearl`
3. `text-aluminum` → `text-silver`
4. `bg-coral` → `bg-accent`
5. `text-coral` → `text-accent`
6. `border-rose` → `border-stone`

### Update Component Classes
1. Replace custom text styles with semantic classes:
   - `text-5xl lg:text-7xl font-light leading-tight text-mist` → `heading-primary`
   - `text-2xl font-medium text-mist` → `heading-secondary`
   - `text-lg font-light text-aluminum leading-relaxed` → `text-body`

2. Update card styling:
   - `bg-rose/10 backdrop-blur-sm rounded-2xl p-8 border border-rose/20 shadow-lg` → `glass-effect rounded-2xl p-8 subtle-shadow`

3. Update section styling:
   - `py-16 lg:py-24 px-4` → `section-modern`

## Best Practices

### Accessibility
- Maintain minimum 4.5:1 contrast ratio for text
- Use `text-silver` for secondary information
- Use `text-accent` sparingly for emphasis

### Performance
- Use transparency (`/50`, `/20`) for layered effects
- Leverage `backdrop-blur` for glass morphism
- Apply `will-change` only to animating elements

### Consistency
- Use semantic color names (charcoal, slate, etc.) instead of arbitrary hex values
- Apply consistent spacing using utility classes
- Use the predefined component classes for common patterns

### Animation
- Keep transitions subtle and professional (200-300ms duration)
- Use `ease-out` for entrances, `ease-in` for exits
- Respect `prefers-reduced-motion` user preferences

## Examples

### Before (Old Styling)
```jsx
<section className="bg-midnight text-mist py-16 lg:py-24 px-4">
  <h2 className="text-5xl lg:text-7xl font-light leading-tight text-mist">
    Digital storyteller
  </h2>
  <p className="text-lg font-light text-aluminum leading-relaxed">
    Where vision meets execution
  </p>
  <div className="bg-rose/10 backdrop-blur-sm rounded-2xl p-8 border border-rose/20">
    <div className="w-12 h-0.5 bg-coral rounded-full"></div>
  </div>
</section>
```

### After (New Styling)
```jsx
<section className="bg-charcoal text-pearl section-modern">
  <h2 className="heading-primary">
    Digital storyteller
  </h2>
  <p className="text-body">
    Where vision meets execution
  </p>
  <div className="glass-effect rounded-2xl p-8 subtle-shadow">
    <div className="w-12 h-0.5 bg-accent rounded-full"></div>
  </div>
</section>
```

This new color palette and styling system provides:
- Professional, non-flashy aesthetic
- Better contrast and readability
- Consistent visual hierarchy
- Modern glass morphism effects
- Scalable design system
- Improved accessibility