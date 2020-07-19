module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "plugin:jest/recommended", 'plugin:react/recommended'],
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: "module",
  },
  plugins: ["jest", "prettier", "react"],
  rules: {
    "no-unused-vars": ["error", {argsIgnorePattern: "^_", varsIgnorePattern: "^_"}],
    "no-console": ["error", {allow: ["debug", "warn"]}],
  },
  settings: {
    react: {
      version: "detect",
    }
  }
};
