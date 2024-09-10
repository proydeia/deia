import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      primary: 'rgb(var(--color-primary) / <alpha-value>)',
      primary_light: 'rgb(var(--color-primary_light) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      third: 'rgb(var(--color-third) / <alpha-value>)',
      red: 'rgb(var(--color-red) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
export default config;
