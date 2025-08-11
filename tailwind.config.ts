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
        midnight: '#071013',
        coral: '#EB5160',
        rose: '#B7999C',
        aluminum: '#AAAAAA',
        mist: '#DFE0E2',
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