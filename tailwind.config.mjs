/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0A',
          50: '#F7F6F2',
          100: '#EAE8E0',
          200: '#C9C6BB',
          300: '#8A8780',
          400: '#5A5854',
          500: '#2A2826',
          900: '#0A0A0A',
        },
        cream: '#F7F6F2',
        accent: '#FF4D1A', // coral-vermelho ousado
        accentSoft: '#FFE4D6',
        ok: '#1D9E75',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Geist"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'mega': ['clamp(3rem, 10vw, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        'hero': ['clamp(2.25rem, 6vw, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'blink': 'blink 1.2s steps(2) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
