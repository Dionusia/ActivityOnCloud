/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
    "../public/index.html",
    "../node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'serif'],
        'helvetica': ['Helvetica', 'sans-serif'],
        'myriad': ['Myriad Pro', 'sans-serif']
      },
      colors: {
        'customGreen': '#04B1A7',
        'customHoverGreen': '#03857D'
      },
    },
  },

  plugins: [require("flowbite/plugin")],

  // darkMode: 'media',
};
