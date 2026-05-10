/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C1810',
          light: '#3D251E',
          dark: '#1A0D08',
        },
        secondary: {
          DEFAULT: '#F5F1E9',
          light: '#FFFFFF',
          dark: '#E5DED0',
        },
        accent: {
          DEFAULT: '#D4A373',
          light: '#E2BA96',
          dark: '#B88B5A',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
