/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#4F46E5",
        border: "#CBD5E1",
        "chat-bg": "#F8FAFC",
        "dark-text": "#475569",
        "light-text": "#94A3B8",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
