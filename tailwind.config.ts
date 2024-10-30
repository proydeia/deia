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
      fondo_light: 'rgb(var(--color-fondo_light) / <alpha-value>)',
      secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      third: 'rgb(var(--color-third) / <alpha-value>)',
      red: 'rgb(var(--color-red) / <alpha-value>)',
      white: 'rgb(var(--color-white) / <alpha-value>)',
      transparent: 'rgb(var(--color-transparent) / <alpha-value>)',
      dark: 'rgb(var(--color-dark) / <alpha-value>)',
      fourth: 'rgb(var(--color-fourth) / <alpha-value>)',
    },
    fontFamily:{
      titulo: (['Inter', 'sans-serif']),
      subtitulo:(['LATO', 'sans-serif'])
    }
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
export default config;
