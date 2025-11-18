/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff8a4c',
          blue: '#1c4b82',
          yellow: '#ffce52',
          slate: '#1f2937',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 25px -12px rgba(15, 23, 42, 0.3)',
      },
    },
  },
  plugins: [],
}
