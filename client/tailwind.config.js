import formsPlugin from "@tailwindcss/forms";
import { textColors, bgColors } from "./src/app/constants";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      padding: "2rem",
      center: true,
    },
    extend: {
      fontFamily: ["Roboto", "sans-serif"],
    },
  },
  plugins: [formsPlugin, "prettier-plugin-tailwindcss"],
  safelist: [...textColors, ...bgColors],
};
