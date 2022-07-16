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
        'element-dark': 'rgb(59 71 83)',
        'element-light': '#e9ecef',
        'background-light': '#fff',
        'secondary-dark': '#4361ee',
        'button-color': '#4361ee',
        'copy-dark': '#fff',
        'copy-light': 'rgb(109 109 109)',
        'copy-title-dark': '#fff',
        'copy-title-light': '#282e34',
        'border-light': '#e5e7eb'
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
