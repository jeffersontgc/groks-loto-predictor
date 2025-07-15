/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  rules: {
    "no-console": "off",
    "next/no-html-link-for-pages": "off",
  },
};
