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
      fontSize: {
        sm: '0.75rem',
        base: '0.9rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
    },
  },
  plugins: [],
};
