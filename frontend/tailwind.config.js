/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 5s linear infinite", // for the circle
        "spring-spin": "spring-rotate 1s ease-in-out infinite", // for the leaf
      },
      keyframes: {
        "spring-rotate": {
          "0%": { transform: "rotate(0deg)" },
          "30%": { transform: "rotate(25deg)" },
          "50%": { transform: "rotate(-15deg)" },
          "70%": { transform: "rotate(10deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
