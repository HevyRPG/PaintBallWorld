/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#06CCFE',
      secondary: '#96DA2B',
      bgm: '#091320',
      bgs: '#111A27',
      }
    },
  },
  plugins: [],
}