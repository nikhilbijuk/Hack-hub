/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0A', // Deep Ink Black
        surface: '#0F0F0F', // Dark Slate
        primary: '#DFFF00', // Electric Volt
        secondary: '#0057FF', // Signal Blue
        accent: '#FF3B00', // Warning Orange
        card: '#161616',
        border: '#262626',
        white: '#FAFAFA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'], // Or Space Grotesk if available
        mono: ['JetBrains Mono', 'monospace'],
        hand: ['"Architects Daughter"', 'cursive'], // For sparse annotations
      },
      fontSize: {
        '2xs': '0.625rem',
        'display': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
      },
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'industrial': '0 0 0 1px rgba(255, 255, 255, 0.05), 0 20px 40px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'grain': 'noise 0.2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'matrix-rain': 'matrix-rain 3s linear infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        noise: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-1%,-1%)' },
          '20%': { transform: 'translate(-2%,1%)' },
          '30%': { transform: 'translate(1%,-2%)' },
          '40%': { transform: 'translate(-1%,1%)' },
          '50%': { transform: 'translate(-2%,-2%)' },
          '60%': { transform: 'translate(1%,1%)' },
          '70%': { transform: 'translate(2%,1%)' },
          '80%': { transform: 'translate(1%,-1%)' },
          '90%': { transform: 'translate(-1%,2%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '10%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' }
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
