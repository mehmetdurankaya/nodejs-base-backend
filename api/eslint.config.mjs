import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], 
    languageOptions: { 
      sourceType: "commonjs" 
    },
    rules: {
      "no-unused-vars": "off" // Bu kuralı devre dışı bırak
    }
  },
  pluginJs.configs.recommended, // Önce kendi kurallarınız sonra önerilen kurallar
  {
    languageOptions: { 
      globals: globals.browser 
    },
  }
];
