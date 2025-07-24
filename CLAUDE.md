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