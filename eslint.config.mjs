import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { ignores: ["deploy/", "node_modules/", "dist/"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      //"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      // "no-unused-vars": "warn",
      // [
      //   "warn",
      //   {
      //     vars: "all",
      //     args: "after-used",
      //    // ignoreRestSiblings: false,
      //     //caughtErrors: "all",
      //     // reportUsedIgnorePattern: false,
      //   },
      // ],
    },
  },
];
