module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors : {

        backgroundAlpha: 'rgb(var(--color-primary) / 0.5',
        'background-dark': '#282e34',
        'element-dark': '#4A5A6A',
        'background-light': '#fff',
        'secondary-dark': '#4361ee',
        'button-color': '#4361ee',
        'font-dark': '#fff',
        'font-light': '#282e34',
        'font-title-dark': '#fff',
        'font-title-light': '#282e34'

      },
      screens: {
        'sm-short': {
          'raw': '(max-height: 745px)'
        }
      }
    },
  },
  plugins: [],
}
