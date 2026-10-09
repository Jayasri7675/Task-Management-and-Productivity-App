/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F6FD',
          100: '#E1EEFB',
          200: '#BDDDFC', // Light accent from palette
          300: '#A1CEF7',
          400: '#88BDF2', // Primary bright sky from palette
          500: '#6A89A7', // Primary dark / slate blue from palette
          600: '#526F8B',
          700: '#384959', // Dark navy from palette
          800: '#263442',
          900: '#17222C',
          950: '#0E161D',
        },
        slatebg: {
          light: '#F5F9FD',
          surface: '#FFFFFF',
          dark: '#131C26',
          darkcard: '#1B2735',
          darkborder: '#293C4E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(56, 73, 89, 0.06), 0 1px 2px rgba(56, 73, 89, 0.04)',
        card: '0 4px 20px -2px rgba(56, 73, 89, 0.07)',
        'card-hover': '0 12px 30px -4px rgba(56, 73, 89, 0.12)',
        glow: '0 0 25px -4px rgba(136, 189, 242, 0.35)',
        'glow-dark': '0 0 25px -4px rgba(106, 137, 167, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.75' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
