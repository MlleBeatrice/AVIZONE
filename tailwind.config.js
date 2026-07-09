/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        // Palette AVIZONE — verts "croissance", jamais l'émeraude par défaut de Tailwind.
        forest: { DEFAULT: '#1F6F4C', dark: '#164F36', light: '#2E8F63', 50: '#EAF4EE' },
        sprout: { DEFAULT: '#E9F4EC', dark: '#D3E9D9' },
        sand: '#F6F7F5',
        ash: '#5B655F',
        ink: '#12201A',
        amber: { DEFAULT: '#C98A2E', light: '#F5E6CC' },
        rust: '#B4432F',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,32,26,0.04), 0 8px 24px -12px rgba(18,32,26,0.16)',
        pop: '0 12px 32px -8px rgba(31,111,76,0.35)',
      },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem' },
    },
  },
  plugins: [],
}
