/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand — Deep Green
        brand: {
          50: '#eef6f3',
          100: '#d9ebe5',
          200: '#b8d8ce',
          300: '#8bbdae',
          400: '#5f9b8c',
          500: '#2F5D50',
          600: '#284f44',
          700: '#214238',
          800: '#1c352f',
          900: '#162b26',
        },
        // Neutral — Light Cream
        sand: {
          50: '#FDFBF7',
          100: '#f8f3ea',
          200: '#efe6d8',
          300: '#dfd2c0',
          400: '#bcae99',
          500: '#8f8270',
          600: '#6B7280',
          700: '#4b5563',
          800: '#2f343d',
          900: '#1A1A1A',
        },
        // Dark — Footer Green
        espresso: {
          500: '#4c6f65',
          600: '#38584f',
          700: '#2d4a42',
          800: '#253f38',
          900: '#1F3D35',
        },
        // Accent — Gold
        gold: {
          300: '#ead17b',
          400: '#dfbf54',
          500: '#D4AF37',
          600: '#b89025',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        md: '10px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(42,37,32,0.04)',
        sm: '0 2px 8px rgba(42,37,32,0.06)',
        md: '0 4px 16px rgba(42,37,32,0.08)',
        lg: '0 8px 32px rgba(42,37,32,0.10)',
        xl: '0 16px 48px rgba(42,37,32,0.12)',
        'glow-brand': '0 0 24px rgba(47,93,80,0.15)',
        'glow-gold': '0 0 24px rgba(212,175,55,0.18)',
        inner: 'inset 0 2px 4px rgba(42,37,32,0.04)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1F3D35 0%, #2F5D50 100%)',
        'cta-gradient': 'linear-gradient(90deg, #2F5D50 0%, #1F3D35 100%)',
        'gold-gradient': 'linear-gradient(135deg, #b89025 0%, #D4AF37 100%)',
        'section-dark': 'linear-gradient(180deg, #1F3D35 0%, #162b26 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4,0,0.2,1) forwards',
        'fade-in-down': 'fadeInDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4,0,0.2,1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
