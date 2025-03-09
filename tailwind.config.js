/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9b8557', // The gold/bronze color from the original site
          light: '#b8a37e',
          dark: '#7d6b46',
        },
        secondary: {
          DEFAULT: '#2a2a2a', // Dark text color
          light: '#4a4a4a',
        },
        background: {
          DEFAULT: '#f8f8f8', // Light background color
          alt: '#ffffff',
          dark: '#121212', // Dark mode background
          darkAlt: '#1e1e1e', // Dark mode alternative background
        }
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'depth-pulse': 'depthPulse 8s ease-in-out infinite',
        'circle-expand': 'circleExpand 5s ease-out infinite',
        'float-in': 'floatIn 1.5s ease-out forwards',
      },
      keyframes: {
        depthPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.2)', opacity: '0.6' },
        },
        circleExpand: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(30)', opacity: '0' },
        },
        floatIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [],
} 