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
      },
      keyframes: {
        'slow-move': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-5%)' }
        },
        'slow-move-reverse': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5%)' }
        }
      },
      animation: {
        'slow-move': 'slow-move 8s ease-in-out infinite',
        'slow-move-reverse': 'slow-move-reverse 8s ease-in-out infinite'
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
} 