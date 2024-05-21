/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      fontFamily: {
        'roboto-slab': ['Roboto Slab', 'serif'],
        'roboto-slab-extra-light': ['Roboto Slab', 'serif'],
        'roboto-slab-thin': ['Roboto Slab Thin', 'serif'],
        'helvetica': ['Helvetica', 'sans-serif'],
        'varela-round': ['Varela Round', 'sans-serif'],
      },
      colors: {
        'customGreen': '#04B1A7',
        'customHoverGreen': '#03857D'
      },
      fontWeight: {
        'extra-light': 200,
      },
    },
  },

  plugins: [require("flowbite/plugin")],

  // darkMode: 'media',
};
