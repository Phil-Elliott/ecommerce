/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "4rem",
        "2xl": "6rem",
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
      maxHeight: {
        "filter-height": "calc(100vh - 12rem)",
      },

      fontSize: {
        "fluid-xs": "clamp(0.75rem, 1.5vw, 0.875rem)", // 12px to 14px
        "fluid-sm": "clamp(0.875rem, 2vw, 1rem)", // 14px to 16px
        "fluid-base": "clamp(1rem, 2.25vw, 1.125rem)", // 16px to 18px
        "fluid-lg": "clamp(1.125rem, 2.5vw, 1.25rem)", // 18px to 20px
        "fluid-xl": "clamp(1.25rem, 3vw, 1.5rem)", // 20px to 24px
        "fluid-2xl": "clamp(1.5rem, 3.5vw, 1.75rem)", // 24px to 28px
        "fluid-3xl": "clamp(1.875rem, 4vw, 2.25rem)", // 30px to 36px
        "fluid-4xl": "clamp(2.25rem, 5vw, 2.5rem)", // 36px to 40px
        "fluid-5xl": "clamp(3rem, 6vw, 3.5rem)", // 48px to 56px
      },

      colors: {
        Primary: "#FFFFFF",
        Secondary: "#FF4B5C",
        Tertiary: "#EC0030",
        Border: "rgba(26, 28, 26, 0.9)",
        LightWhite: "#F5F5F5",
      },

      backgroundImage: {
        "gradient-bg": "linear-gradient(45deg, #EC0030 0%, #FF4B5C 100%)",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["hover", "focus"],
    },
  },
  plugins: [],
};
