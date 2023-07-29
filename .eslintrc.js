module.exports = {
  plugins: [
    'react',
  ],
  extends: [
    'next/core-web-vitals',
    'next',
    'airbnb',
  ],
  overrides: [
    {
      files: ['**/*.?(m|c)ts?(x)'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: [
        '@typescript-eslint',
        'react',
      ],
      extends: [
        'next/core-web-vitals',
        'next',
        'airbnb',
        'airbnb-typescript',
      ],
    },
  ],
};
