/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ['Raleway', 'sans-serif'],
        'primary-alt': ['"Montserrat Alternates"', 'sans-serif'],
        'secondary': ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

