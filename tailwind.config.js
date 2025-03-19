/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "e-white": "#FFFFFF",
        "e-background": {
          50: "#F7F7F7",
          100: "#EBEBEB",
          200: "#D3D3D3", // Base color
          300: "#BCBCBC",
          400: "#A4A4A4",
          500: "#8D8D8D",
          600: "#757575",
          700: "#5E5E5E",
          800: "#464646",
          dark: "#1a1a1a",
        },
        "e-brown": {
          50: "#F5F2F1",
          100: "#E5DCD9",
          200: "#C7B5AF",
          300: "#B09891",
          400: "#927064", // Base color
          500: "#7A5D53",
          600: "#624B43",
          700: "#4A3832",
          800: "#322622",
        },
        "e-blue": {
          50: "#E3F2FD",
          100: "#BBDEFB",
          500: "#2196F3",
          800: "#1565C0",
        },
        "e-green": {
          50: "#E8F5E9",
          100: "#C8E6C9",
          500: "#4CAF50",
          600: "#43A047",
        },
      },
      boxShadow: {
        header: "0 2px 4px rgba(146, 112, 100, 0.15)",
      },
      borderRadius: {
        header: "0 0 3rem 3rem",
      },
    },
  },
  plugins: [],
};
