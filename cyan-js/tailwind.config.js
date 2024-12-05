/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          dark: '#0A0A0A',
          light: '#ffffff',
        },
        text: {
          DEFAULT: 'var(--text)',
          dark: '#ffffff',
          light: '#000000',
        },
        primary: {
          DEFAULT: '#3C46FF',
          hover: '#2832FF',
        },
        accent: {
          purple: '#9333EA',
          blue: '#3B82F6',
        }
      }
    },
  },
  plugins: [],
} 