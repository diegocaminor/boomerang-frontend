module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      blue: "blue",
      black: "#000",
      white: "#fff",
      green: "#61F2E2",
      purple: "#8B7FD8",
      "purple-dark": "#8B7Fff",
      "purple-darker": "#373266",
      gray: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#3EA0FE",
        700: "#3E3C68",
        800: "#262450",
        900: "#19173D",
      },
      "gray-lighter": "#D2D3D3",
      red: "#C50D02",
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    variants: {
      extend: {
        display: ["group-hover"],
      },
    },
  },
  plugins: [],
};
