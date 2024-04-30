/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,jsx,ts,tsx}",
    "../public/index.html",
    "../node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        'customGreen': '#04B1A7',
        'customHoverGreen': '#03857D'
      },
    },
  },

  plugins: [require("flowbite/plugin")],

  // darkMode: 'media',
};
