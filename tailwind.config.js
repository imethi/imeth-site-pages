/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Use 'media' for auto based on system preference
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#022c22',
        },
      },
    },
  },
  plugins: [],
}
