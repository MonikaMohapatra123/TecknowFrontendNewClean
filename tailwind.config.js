module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--white)",
        blue: {
          light: '#85d7ff',
          DEFAULT: '#0076FE',
          dark: '#009eeb',
        },
      },
    },
  },
  plugins: [],
};
