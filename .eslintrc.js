module.exports = {
  root: true,
  env: {
    browser: true, // browser global variables
    es2021: true, // adds all ECMAScript 2021 globals and automatically sets the ecmaVersion parser option to 12.
  },
  globals: {
    _: 'readonly',
    echarts: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 12,
  },
  extends: [
    'plugin:vue/recommended', // ++
    'airbnb-base', // ++
    'plugin:prettier/recommended', // ++
  ],
  plugins: ['prettier'], // ++
  rules: {
    'prettier/prettier': 'error', // ++
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          ...// 保持airbnb-base中的规则不变
          '**vite**', // ++
          '**@vitejs**', // ++
        ],
        optionalDependencies: false,
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'context', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
          'staticContext', // for ReactRouter context
          'state', // for vuex state ++
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
