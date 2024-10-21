/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        theme: "#1c1c1c",
      },
      borderColor: {
        container: "#3d3d3d",
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      padding: {
        container: "1rem",
      },
    },
  },
  plugins: [],
};
