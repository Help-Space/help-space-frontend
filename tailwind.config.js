/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
    "./user/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxl: { max: "1600px"},
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      mdd: { max: "967px" },
      md: { max: "767px" },
      sm: { max: "639px" },
      xs: { max: "439px" },
  },
    colors: {
      'primaryPink': '#FF6969',
      'secondaryPink': '#FFCBCB',
      'mediumDark': '#353535',
      'lightDark': '#606060',
      'white': '#fff',
    },
    
    fontFamily: {
      "quicksand": ['Quicksand'],
    },
    plugins: [],
  }
}