/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}", "./pages/**/*.{html,js}"],
  theme: {
    extend: {
      maxWidth: {
        'icon': '200px'
      },
      zIndex: {
        '0': 0,
        '25': 25,
        '50': 50,
        '75': 75,
        '100': 100,
        'auto': "auto",
      },
      fontSize: {
        sm: "0.750rem",
        base: "1rem",
        xl: "1.333rem",
        "2xl": "1.777rem",
        "3xl": "2.369rem",
        "4xl": "3.158rem",
        "5xl": "4.210rem",
      },
      fontFamily: {
        heading: ["Clash Display", "sans-serif"],
        body: ["Hanken Grotesk", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};
