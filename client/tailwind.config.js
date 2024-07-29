/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-page": "linear-gradient(#695740, #695741, #695741, #69573f)",
      },
    },
    gradients: {},
  },
  plugins: [],
};
