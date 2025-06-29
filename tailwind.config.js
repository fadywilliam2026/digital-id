/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 0px 88px 16px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
  important: true,
  // corePlugins: {
  //   preflight: false,
  // },
}
