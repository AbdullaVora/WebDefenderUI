/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
            primary_color: '#1D243D',
            secondaryColor: '#05F2F2'
        },
      },
    },
    plugins: [],
  }