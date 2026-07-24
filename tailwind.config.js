/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f432d", // Forest Green
        secondary: "#765843", // Earth Brown
        tertiary: "#533700",
        background: "#fbf9f5", // Warm Off White
        surface: "#fbf9f5",
        "surface-container": "#efeeea",
        "surface-container-low": "#f5f3ef",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",
        "on-surface": "#1b1c1a",
        "on-surface-variant": "#414842",
        "on-primary": "#ffffff",
        "on-secondary": "#ffffff",
        "outline-variant": "#c1c8c0",
        outline: "#727972",
        "primary-container": "#365b43",
        "secondary-container": "#fdd5bb",
        "on-secondary-container": "#785b46",
        "primary-fixed-dim": "#a7d0b2",
        "primary-fixed": "#c3edcd",
        "tertiary-fixed-dim": "#edbf7a",
        "tertiary-fixed": "#ffdeae",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "16px",
        "3xl": "20px",
      },
      spacing: {
        gutter: "32px",
        "stack-lg": "32px",
        "stack-md": "16px",
        "stack-sm": "8px",
        "container-max": "1280px",
        "section-padding-mobile": "64px",
        "section-padding-desktop": "120px"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Outfit", "Inter", "sans-serif"],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
