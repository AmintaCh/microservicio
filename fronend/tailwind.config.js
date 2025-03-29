/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.{hbs,html, js}', './public/**/*.{html,hbs,js}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

