module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "prefer-const": "off",
    "no-empty": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-constant-condition": "off",
    "@typescript-eslint/no-empty-function": "off"
  },
};
