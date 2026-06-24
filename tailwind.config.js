/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Drawn from the brand mark
        plum: {
          DEFAULT: '#6C445C',
          50: '#F6EFF3',
          100: '#EADBE4',
          200: '#D6B8C9',
          300: '#BE92AC',
          400: '#9C6B86',
          500: '#6C445C',
          600: '#5C3A4E',
          700: '#4A2C3D', // Deep Wine
          800: '#3A2230',
          900: '#2A1923',
        },
        wine: '#4A2C3D',
        lilac: {
          DEFAULT: '#CDA8D0',
          soft: '#DDC2DE',
        },
        blush: '#E9D6E8',
        porcelain: '#FAF6F8',
        ink: '#2A1923',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.22em',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(74, 44, 61, 0.18)',
        card: '0 18px 50px -20px rgba(74, 44, 61, 0.28)',
        lift: '0 30px 70px -28px rgba(74, 44, 61, 0.42)',
        glow: '0 0 0 1px rgba(205, 168, 208, 0.4), 0 20px 60px -20px rgba(108, 68, 92, 0.45)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      backgroundImage: {
        'plum-grad': 'linear-gradient(135deg, #6C445C 0%, #4A2C3D 100%)',
        'blush-grad': 'linear-gradient(180deg, #FAF6F8 0%, #F3E7F1 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
