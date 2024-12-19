/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Elegant Serif font
        script: ['"Satisfy"', 'cursive'],
        atma: ['"Atma"', 'sans-serif'],
        // Handwritten Script font
        // sans: ['"Poppins"', 'sans-serif'],     // Clean Sans-Serif font
      },
    },
      
  },
  plugins: [],
}

