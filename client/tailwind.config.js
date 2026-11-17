/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 2K MAKER – Studio Freight Inspired Dark Theme
        ink: {
          DEFAULT: '#0A0A0A',  // True black base
          900: '#111111',
          800: '#1A1A1A',
          700: '#222222',
          600: '#2E2E2E',
          500: '#3D3D3D',
          400: '#5A5A5A',
          300: '#888888',
          200: '#B0B0B0',
          100: '#D4D4D4',
          50:  '#F0F0F0',
        },
        brand: {
          DEFAULT: '#0A42A1',
          50:  '#EEF4FF',
          100: '#D9E8FF',
          200: '#B8D5FF',
          300: '#8EBCFF',
          400: '#6FA8FF',
          500: '#1E60D4',
          600: '#0A42A1',
          700: '#083582',
          800: '#223176',
          900: '#192458',
          950: '#0F1638',
        },
        // Keep legacy for admin
        primary: { DEFAULT: '#0A42A1', hover: '#083582', light: '#6FA8FF' },
        darkBlue: { DEFAULT: '#223176', hover: '#192458', deep: '#0F1638' },
        navy: { 800: '#223176', 900: '#192458', 950: '#0F1638' },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #223176 0%, #0A42A1 100%)',
        'gradient-accent': 'linear-gradient(135deg, #0A42A1 0%, #6FA8FF 100%)',
        'gradient-light': 'linear-gradient(180deg, #FFFFFF 0%, #EEF4FF 100%)',
        'gradient-hero': 'linear-gradient(180deg, #FFFFFF 0%, #F5F8FF 60%, #EEF4FF 100%)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'fluid-sm':   'clamp(0.875rem, 1.5vw, 1rem)',
        'fluid-base': 'clamp(1rem, 2vw, 1.25rem)',
        'fluid-lg':   'clamp(1.25rem, 2.5vw, 1.75rem)',
        'fluid-xl':   'clamp(1.75rem, 4vw, 3rem)',
        'fluid-2xl':  'clamp(2.5rem, 6vw, 5rem)',
        'fluid-3xl':  'clamp(3.5rem, 8vw, 7rem)',
        'fluid-4xl':  'clamp(4rem, 10vw, 9rem)',
        'fluid-hero': 'clamp(4.5rem, 12vw, 11rem)',
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'negative': '-0.03em',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(10, 66, 161, 0.08), 0 2px 6px -1px rgba(34, 49, 118, 0.04)',
        'card': '0 10px 30px -4px rgba(34, 49, 118, 0.08), 0 4px 6px -2px rgba(10, 66, 161, 0.03)',
        'card-hover': '0 20px 40px -10px rgba(10, 66, 161, 0.16), 0 8px 16px -4px rgba(34, 49, 118, 0.08)',
        'btn': '0 4px 14px 0 rgba(10, 66, 161, 0.3)',
        'btn-hover': '0 6px 20px rgba(10, 66, 161, 0.42)',
        'dark-card': '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(0,0,0,0.6)',
        'glow-blue': '0 0 40px rgba(10, 66, 161, 0.4)',
      },
      animation: {
        'line-reveal': 'lineReveal 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards',
        'marquee': 'marquee 25s linear infinite',
        'marquee-rev': 'marqueeRev 25s linear infinite',
      },
      keyframes: {
        lineReveal: {
          '0%':   { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRev: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
