/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        gilroy: ["var(--font-gilroy)"],
        geist: ["var(--font-geist-mono)"],
        agancy: ["var(--font-agancy)"],
        cairo: ["var(--font-cairo)"],
      },
      colors: {
        customOrange: "#E58411",
        customOrangeBg: "#221506",
        customGreenS: "#1EC815",
        customGreenW: "#DAFFDB",
        customBlue: "#0F2764",
        customLightBg: "#FFF9F1",
        customControlBg: "#D7D7D7",
      },
    },
  },
  plugins: [],
};
