/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/page.tsx',
    './src/app/layout.tsx',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1C2331',
        'primary-blue': '#003049'
      }
    }
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-gradient-blue': {
          backgroundImage: 'linear-gradient(to bottom, #98b5eb, #cbd6e1)'
        }
      };
      addUtilities(newUtilities, {
        variants: ['responsive']
      });
    }
  ]
};
