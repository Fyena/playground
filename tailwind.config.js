/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/Menu.vue',
    './src/views/Game.vue',
  ],
  theme: {
    fontFamily: {
      '1': ['"Roboto"', 'Georgia'],
      '2': ['"Press Start 2P"', 'Georgia'],
    },
    extend: {},
  },
  plugins: [],
}
