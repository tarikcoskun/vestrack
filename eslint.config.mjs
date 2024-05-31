import config from "@antfu/eslint-config";

export default config({
  stylistic: {
    quotes: "double",
    semi: true,
  },
}, {
  rules: {
    "import/order": "off",
    "node/prefer-global/process": "off",
    "style/arrow-parens": ["error", "always"],
    "style/jsx-one-expression-per-line": "off",
  },
});
