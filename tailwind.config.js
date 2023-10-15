/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{html,jsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill-200px': 'repeat(auto-fill, 200px)',
      },
      colors: {
        main: {
          50: '#DAEEE8',
          100: '#ADD9CD',
          200: '#86C7B5',
          300: '#65B8A1',
          400: '#428E79',
          500: '#377664',
          600: '#2D6253',
          700: '#265145',
          800: '#1F4339',
          900: '#1A3830',
        },
      },
    },
  },
  plugins: [],
};
