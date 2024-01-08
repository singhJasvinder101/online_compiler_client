/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'body': [
        '-apple-system',
        'BlinkMacSystemFont',
        'San Francisco',
        'Helvetica Neue',
        'Lucida Grande',
        'Arial',
        'sans-serif',
      ],
      'sans': [
        '-apple-system',
        'San Francisco',
        'Helvetica Neue',
        'BlinkMacSystemFont',
        'Lucida Grande',
        'Arial',
        'sans-serif',
      ]
    },
    extend: {
      screens: {
        'xs': '420px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      }
    },
  },
  plugins: [],
}

