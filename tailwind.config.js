/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        theme: "#111111",
      },
      borderColor: {
        container: "#343434",
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      padding: {
        container: "1rem",
      },
      textColor: {
        font: "#fafafa",
      },
    },
  },
  plugins: [],
};
