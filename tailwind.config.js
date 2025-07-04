export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        white: "hsl(0, 0%, 98%)",
        black: "hsl(0, 0%, 8%)",
        grey: {
          500: "hsl(0, 0%, 41%)",
        }
      }
    },
  },
}
