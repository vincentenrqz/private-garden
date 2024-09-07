/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-page": "linear-gradient(#695740, #695741, #695741, #69573f)",
        "drawer-left-page":
          "linear-gradient(to right, #e9eadd, #eaecdf, #ded4bf)",
        "drawer-middle-page": "linear-gradient(to right, #ebf0eb, #e7eadd)",
        "drawer-right-page":
          "linear-gradient(to right, #e4e5d7, #e4e5d7, #e3e5d7)",
        "grid-lines-vertical":
          "repeating-linear-gradient(to right, #d1d5db, #d1d5db 2px, transparent 2px, transparent 20px)",
        "grid-lines-horizontal":
          "repeating-linear-gradient(to bottom, #d1d5db, #d1d5db 2px, transparent 2px, transparent 20px)",
      },
      fontFamily: {
        "minion-bold-condensed-caption": [
          '"Minion Bold Condensed Caption"',
          "sans-serif",
        ],
      },
      keyframes: {
        "fade-in-out": {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 3s ease-in-out infinite",
      },
    },
    gradients: {},
  },
  plugins: [],
};
