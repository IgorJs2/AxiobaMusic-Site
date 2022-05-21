module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    {
      pattern: /./
    },
  ],
  theme: {
    extend: {},
    colors: {
      'blue': '#6093C1',
      'light_blue': '#79BBF9',
      'dark_blue': '#5380AA',
      'green': '#66D9BD',
      'red': '#D1557A',
      'yellow': '#EAC15A',
      'dark_green': '#5EC7AD',
      'dark_red': '#BA4D6D',
      'white': "#FFFFFF"
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
  },
  plugins: [require("daisyui")],
}
