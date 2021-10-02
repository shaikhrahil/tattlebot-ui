module.exports = {
  prefix: 'tw-',
  mode: 'jit',
  purge: ['./apps/**/*.{js,ts,jsx,tsx}', './libs/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary: 'var(--primary)',
      'primary-muted': 'var(--primary-muted)',
      surface: 'var(--surface)',
      color: 'var(--color)',
      info: 'var(--info)',
      warn: 'var(--warn)',
      error: 'var(--error)',
      success: 'var(--success)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
