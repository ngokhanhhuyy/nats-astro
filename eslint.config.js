import eslintPluginAstro from "eslint-plugin-astro";
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";


export default [
  ...eslintPluginAstro.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,astro}"],
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      semi: ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];