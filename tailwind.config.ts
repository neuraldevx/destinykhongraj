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
        lavender: {
          DEFAULT: '#f6e8ea',
          100: '#451b21',
          200: '#8a3642',
          300: '#c15f6e',
          400: '#dca4ac',
          500: '#f6e8ea',
          600: '#f8edef',
          700: '#faf2f3',
          800: '#fcf6f7',
          900: '#fdfbfb'
        },
        brightpink: {
          DEFAULT: '#ef626c',
          100: '#3d060a',
          200: '#7b0c13',
          300: '#b8121d',
          400: '#e92431',
          500: '#ef626c',
          600: '#f38188',
          700: '#f6a0a6',
          800: '#f9c0c4',
          900: '#fcdfe1'
        },
        licorice: {
          DEFAULT: '#22181c',
          100: '#070505',
          200: '#0d090b',
          300: '#140e10',
          400: '#1a1316',
          500: '#22181c',
          600: '#563d47',
          700: '#8b6373',
          800: '#b495a1',
          900: '#d9cad0'
        },
        jet: {
          DEFAULT: '#312f2f',
          100: '#0a0909',
          200: '#141313',
          300: '#1e1c1c',
          400: '#282626',
          500: '#312f2f',
          600: '#5c5858',
          700: '#868181',
          800: '#aeabab',
          900: '#d7d5d5'
        },
        tiffany: {
          DEFAULT: '#84dccf',
          100: '#0f3731',
          200: '#1f6e62',
          300: '#2ea593',
          400: '#4dcdba',
          500: '#84dccf',
          600: '#9ce3d9',
          700: '#b5eae2',
          800: '#cef1ec',
          900: '#e6f8f5'
        }
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