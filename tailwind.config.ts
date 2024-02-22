import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: '#0077C2',
          200: '#59a5f5',
          300: '#c8ffff',
          dark: {
            100: '#0085ff',
            200: '#69b4ff',
            300: '#e0ffff',
          },
        },
        accent: {
          100: '#00BFFF',
          200: '#00619a',
          dark: {
            100: '#006fff',
            200: '#e1ffff',
          },
        },
        text: {
          100: '#333333',
          200: '#5c5c5c',
          dark: {
            100: '#FFFFFF',
            200: '#9e9e9e',
          },
        },
        bg: {
          100: '#FFFFFF',
          200: '#f5f5f5',
          300: '#cccccc',
          dark: {
            100: '#1E1E1E',
            200: '#2d2d2d',
            300: '#454545',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
