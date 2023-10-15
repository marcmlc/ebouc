module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'react/prop-types': 'off',
    'prettier/prettier': 'error',
  },
};
