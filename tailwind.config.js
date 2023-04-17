/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "2rem",
        xl: "5rem",
        "2xl": "12rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1700px",
    },

    extend: {
      colors: {
        Primary: "#0FF",
        Secondary: "#39FF14",
        Tertiary: "#FF1493",
        Quaternary: "#7D26CD",
        Border: "rgba(26, 28, 26, 0.9)",
        Black: "#1d1d1b",
      },
    },
  },
  plugins: [],
};
