import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Josefin Slab', 'serif'],
        sans: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
} satisfies Config

