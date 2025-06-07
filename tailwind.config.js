import colors from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // enable class-based dark mode
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary: colors.teal,
        accent: colors.indigo,
      },
    },
  },
  plugins: [],
}