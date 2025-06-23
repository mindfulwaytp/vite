// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'], // 👈 makes Outfit the default
        nunito: ['Nunito', 'sans-serif'],
        figtree: ['Figtree', 'sans-serif'],
        cal: ['"Cal-Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f5f9fa',
          100: '#e1f1f1',
          200: '#b6e3e5',
          300: '#87cfd1',
          400: '#64b3ba',
          500: '#478aa6',
          600: '#5e5ab3',
          700: '#493e90',
          800: '#342f61',
          900: '#20203c',
          green: '#63c173',
        },
      },
    },
  },
  plugins: [],
};
