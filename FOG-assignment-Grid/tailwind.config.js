/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: { gridTemplateColumns: {
      30: 'repeat(30, minmax(0, 1fr))',
    },},
  },
  plugins: [],
}


