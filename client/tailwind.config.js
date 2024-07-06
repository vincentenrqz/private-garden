/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    gradientColorStops: {
      "from-695740": "#695740",
      "to-68563e": "#68563e",
      "to-685640": "#685640",
      "to-6a5842": "#6a5842",
      "to-69573f": "#69573f",
      "to-695741": "#695741",
    },
    gradients: {
      gradient: {
        from: "from-695740",
        to: "to-69573f",
        stops: [
          { color: "var(--from-695740)", offset: 0 },
          { color: "var(--to-68563e)", offset: 16.666667 }, // 25%
          { color: "var(--to-685640)", offset: 33.333333 }, // 50%
          { color: "var(--to-6a5842)", offset: 50 }, // 75%
          { color: "var(--to-69573f)", offset: 66.666667 }, // 100%
          { color: "var(--to-695741)", offset: 83.333333 }, // 125%
          { color: "var(--to-69573f)", offset: 100 }, // 150%
        ],
      },
    },
  },
  plugins: [],
};
