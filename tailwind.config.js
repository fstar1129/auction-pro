const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "elementor-1": "rgb(17, 19, 28);",
        "elementor-text-1": "#6EC1E4",
        "elementor-text-2": "#11131c",
        "elementor-text-3": "#D7CDBB",
        "elementor-bg-1": "#68fe9a",
        "elementor-bg-2": "#EFA8003B",
        "elementor-bg-3": "#FFE09796",
        red: "#82181A",
      },
      fontFamily: {
        display: ["MedievalSharp"],
        body: ['"Open Sans"'],
        display2: ['"Roboto"'],
        display3: ['"Domaine Display"'],
      },
      boxShadow: {
        "elementor-shadow-1": "0px 0px 5px 5px rgb(166 154 120 / 38%);",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      // prettier-ignore
      dmd: { 'max': '870px' },
      // => @media (max-width: 1280px) { ... }

      // prettier-ignore
      dsm: { 'max': '410px' },
      // => @media (max-width: 410px) { ... }

      // prettier-ignore
      mxsm: { "max": "640px" },
      // => @media (min-width: 640px) { ... }

      // prettier-ignore
      mxmd: {"max": "768px"},
      // => @media (min-width: 768px) { ... }

      // prettier-ignore
      mxlg: {"max": "1024px"},
      // => @media (min-width: 1024px) { ... }

      // prettier-ignore
      mxxl: {"max": "1280px"},
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require("tw-elements/dist/plugin"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
