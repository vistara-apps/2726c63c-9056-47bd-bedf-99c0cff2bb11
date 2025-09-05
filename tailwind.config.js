/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 36%, 96%)',
        accent: 'hsl(160, 70%, 45%)',
        primary: 'hsl(210, 70%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(210, 30%, 15%)',
        'text-secondary': 'hsl(210, 30%, 35%)',
        dark: {
          bg: 'hsl(220, 30%, 8%)',
          surface: 'hsl(220, 25%, 12%)',
          'surface-light': 'hsl(220, 20%, 16%)',
          text: 'hsl(210, 20%, 85%)',
          'text-secondary': 'hsl(210, 15%, 65%)',
        }
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 36%, 15%, 0.1)',
        'modal': '0 16px 48px hsla(210, 36%, 15%, 0.16)',
        'dark-card': '0 4px 12px hsla(220, 30%, 5%, 0.3)',
        'dark-modal': '0 16px 48px hsla(220, 30%, 5%, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
