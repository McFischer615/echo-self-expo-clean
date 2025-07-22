import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node, // RN runs in JSCore, no browser DOM globals
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);

