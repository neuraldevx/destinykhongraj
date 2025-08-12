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
        // New sophisticated color palette
        charcoal: '#0F1419',        // Deep charcoal - primary dark background
        slate: '#2D3748',           // Slate - secondary dark elements
        stone: '#4A5568',           // Stone - medium gray for borders/dividers
        silver: '#718096',          // Silver - light gray for secondary text
        pearl: '#E2E8F0',           // Pearl - light elements and primary text
        accent: '#4299E1',          // Subtle blue accent - professional
        
        // Legacy color mappings for gradual transition
        midnight: '#0F1419',        // Updated to charcoal
        coral: '#4299E1',           // Updated to accent blue
        rose: '#718096',            // Updated to silver
        aluminum: '#718096',        // Updated to silver
        mist: '#E2E8F0',            // Updated to pearl
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