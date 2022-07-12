module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors : {

        backgroundAlpha: 'rgb(var(--color-primary) / 0.5',
        backgroundDark: '#282e34',
        elementDark: '#4A5A6A',
        backgroundLight: '#fff',
        secondaryDark: '#da56f9',
        buttonColor: '#4361ee'

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
