import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Site palette (aligned with globals.css @theme)
        cream: '#FFFDEF',           // Background
        heading: '#A7292F',         // Primary headings
        subheading: '#290102',      // Body + subheadings
        gold: '#A68621',            // Accents

        // Legacy neutrals retained for compatibility
        charcoal: '#0F1419',
        slate: '#2D3748',
        stone: '#4A5568',
        silver: '#718096',
        pearl: '#E2E8F0',
        accent: '#A68621',          // Map accent -> gold
        midnight: '#0F1419',
        coral: '#A68621',
        rose: '#718096',
        aluminum: '#718096',
        mist: '#E2E8F0',
      },
      fontFamily: {
        'inter': ['var(--font-inter)'],
        'crimson': ['var(--font-crimson)'],
      },
    },
  },
  plugins: [],
}
export default config
