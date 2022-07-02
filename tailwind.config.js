module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors : {

        backgroundAlpha: 'rgb(var(--color-primary) / 0.5',
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
