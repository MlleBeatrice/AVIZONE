/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        // Palette AVIZONE v2 — conforme section 8 du cahier des charges.
        // Les noms de tokens restent stables (forest, sprout, sand, ash, ink,
        // amber, rust) afin de ne pas casser les classes déjà posées dans les
        // vues existantes ; seules les valeurs changent pour coller à la charte.
        forest: { DEFAULT: '#1B6B3A', dark: '#124D29', light: '#4CAF50', 50: '#E8F3EA' },
        sprout: { DEFAULT: '#EAF4EC', dark: '#D3E9D9' },
        sand: '#FDF9F0',
        pearl: '#F5F2EB',
        ash: '#6B6459',
        ink: '#2D2A24',
        amber: { DEFAULT: '#F9A826', light: '#FDEBD0' },
        gold: '#FFD54F',
        rust: '#C0392B',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
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
