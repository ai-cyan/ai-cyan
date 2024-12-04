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
          dark: '#000000',
          light: '#ffffff',
        },
        text: {
          DEFAULT: 'var(--text)',
          dark: '#ffffff',
          light: '#000000',
        }
      }
    },
  },
  plugins: [],
} 