# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (recommended)
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 portfolio website built with the App Router architecture. The project structure follows:

```
src/
├── app/
│   ├── layout.tsx    - Root layout with metadata and basic styling
│   ├── page.tsx      - Homepage with hero, about, and services sections
│   └── globals.css   - Global styles
```

### Technology Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 (configured but not yet fully implemented)
- **Linting**: ESLint with Next.js config

### Planned Features (from PROJECT_OUTLINE.md)

The project is planned to be transformed into an interactive portfolio inspired by jazminwong.vercel.app, featuring:

- **Animation Libraries**: GSAP, Motion, Lenis for smooth scrolling
- **Physics**: Matter.js for interactive elements
- **UI Components**: NumberFlow for counters, Split-type for text animations
- **State Management**: Zustand
- **Backend**: Nodemailer for contact forms
- **Icons**: Tabler icons

### Current State

The project is in early development with:
- Basic Next.js setup with TypeScript and Tailwind CSS
- Placeholder layout and page components with inline styles
- TODO comments indicating where major sections will be implemented

### Key Development Notes

- Path aliases configured: `@/*` maps to `./src/*`
- Uses Geist fonts from Google Fonts
- Currently using inline styles but Tailwind is configured for future use
- Contact modal and API routes planned for `/api/contact/route.ts`
- Images and videos will be stored in `public/images` and `public/videos`
- Static data will be organized in `src/data/` directory

### Dependencies to Install (Planned)

Based on PROJECT_OUTLINE.md, the following packages need to be installed:
```bash
npm install gsap @gsap/react lenis matter-js @number-flow/react split-type zustand motion nodemailer @tabler/icons-react @vercel/analytics
```

### Code Commenting Guidelines

- When writing comments be sure to not use whitespaces, an example would be to write your comments as follows "#comment", instead of "# comment"

### Development Optimization Guidelines

- When optimizing and making the website, always first look at the code section for the part that we're working on from /Users/jakechristensen/portfolio-os-destiny/jazminwong and make sure to use the same packages and dependencies as well

## GSAP Animation Library Reference

### React Integration with useGSAP Hook

GSAP provides a React hook for seamless integration with React components:

```javascript
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

function AnimatedComponent() {
  const container = useRef();

  useGSAP(() => {
    //GSAP animations here - automatically cleaned up
    gsap.to('.box', { rotation: 180, x: 100 });
  }, { scope: container }); //scope animations to container

  return (
    <div ref={container}>
      <div className="box">Animated Element</div>
    </div>
  );
}
```

### ScrollTrigger Plugin

ScrollTrigger enables scroll-based animations. Register and use as follows:

```javascript
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

//Basic ScrollTrigger
gsap.to('.element', {
  x: 500,
  scrollTrigger: {
    trigger: '.element',
    start: 'top center',
    end: 'bottom center',
    scrub: true, //links animation to scroll position
    markers: true //for debugging
  }
});

//Advanced timeline with ScrollTrigger
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.container',
    pin: true, //pins element during animation
    start: 'top top',
    end: '+=500',
    scrub: 1, //smooth scrubbing with 1s delay
    snap: {
      snapTo: 'labels',
      duration: { min: 0.2, max: 3 }
    }
  }
});

tl.addLabel('start')
  .from('.box p', { scale: 0.3, rotation: 45, autoAlpha: 0 })
  .addLabel('color')
  .from('.box', { backgroundColor: '#28a92b' })
  .addLabel('spin')
  .to('.box', { rotation: 360 })
  .addLabel('end');
```

### Context-Safe Animations

For animations created outside the initial hook (e.g., event handlers), use contextSafe:

```javascript
const { contextSafe } = useGSAP({ scope: container });

//Safe animation that will be cleaned up
const onClickHandler = contextSafe(() => {
  gsap.to('.element', { y: 100 });
});
```

### Key ScrollTrigger Properties

- `trigger`: Element that triggers the animation
- `start`: Start point (e.g., "top center", "100px 80%")
- `end`: End point (e.g., "bottom center", "+=500")
- `scrub`: Links animation progress to scroll (boolean or number for delay)
- `pin`: Locks element in place during animation
- `markers`: Shows visual markers for debugging
- `onEnter/onLeave/onUpdate`: Callback functions

### Performance Best Practices

- Use `useGSAP` hook for automatic cleanup
- Scope animations to containers when possible
- Use `gsap.registerPlugin()` for all plugins
- Leverage `ScrollTrigger.refresh()` after DOM changes
- Use numerical scrub values (e.g., `scrub: 1`) for smooth animations