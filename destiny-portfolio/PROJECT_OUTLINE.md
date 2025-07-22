# Destiny Khongraj Portfolio Site – Project Outline

Inspired by [jazminwong.vercel.app](https://jazminwong.vercel.app/)  
Reference code: `portfolio-effects/jazminwong`  
Key tools: Next.js, TypeScript, Tailwind CSS, GSAP, Matter.js, Zustand, etc.

---


---

## 2. Install Dependencies

```bash
npm install react@19 react-dom@19 next@15 @vercel/analytics \
  gsap @gsap/react lenis matter-js @number-flow/react \
  split-type zustand motion nodemailer @tabler/icons-react
```

---

## 3. Set Up Tailwind/PostCSS

- Configure `postcss.config.mjs` with `@tailwindcss/postcss`.
- Create `tailwind.config.js` and add your custom color palette (e.g., `#C43670`, `#F0CCDF`).
- Import Tailwind in `src/app/globals.css`.
- Apply base styles and custom keyframes (see `globals.css` in reference code).

---

## 4. Implement Global Layout

- Edit `src/app/layout.tsx`:
  - Wrap children with `<ReactLenis root>`.
  - Provide `FooterContext` and Zustand store (`FooterProvider`).
  - Import fonts via `next/font` and custom local fonts (see `src/fonts.ts` in reference).

---

## 5. Build Page Sections

### Header
- Navigation bar with animated links.

### Hero (`components/sections/Hero.tsx`)
- Use `motion.div` for animated entrance of images.
- Include an image slider (`Slider.tsx`) with auto-looping horizontally.

### About (`components/sections/About.tsx`)
- Display rotating “fun facts” with NumberFlow for the counter.

### Services (`components/sections/Services.tsx`)
- Render card components pinned and animated with `gsap/ScrollTrigger`.

### Footer (`components/sections/Footer.tsx`)
- Show social links.
- Add a physics playground using Matter.js (`PhysicsContactButtons`).

---

## 6. Create the Contact Modal

- Implement `ContactModal.tsx` with a `ContactForm` component.
- The form posts to `/api/contact/route.ts` using `fetch` and Nodemailer.

---

## 7. Add Hooks and Zustand Store

- Include custom hooks:
  - `useWindowSize`
  - `useDisableScroll`
  - `useDocumentTitle`
  - `useInstagramBrowser`
- State management via `useContactModalStore` toggles the modal.

---

## 8. Populate Static Data

- Place images under `public/images` and videos under `public/videos`.
- Define arrays in `src/data/` for:
  - Services
  - Fun facts
  - Form options
  - Social links

---

## 9. Configure Next.js

- Set allowed remote image hosts in `next.config.ts`.
- Add middleware (`src/middleware.ts`) to cache `.webm` files.

---

## 10. Run Locally

```bash
npm run dev
```

---

## 11. Reference Code

- Use the provided source code at `portfolio-effects/jazminwong` for seamless integration of components and effects.

---

## 12. Desired Section Structure

- **Header**
- **Hero**
- **About**
- **Services**
- **Footer**

--- 