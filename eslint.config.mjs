import globals from "globals";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: ["node_modules/", "dist/", "coverage/"], // Arquivos ignorados
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Aplicar regras apenas nestes arquivos
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // Certifique-se que esse arquivo existe e inclui todos os arquivos do projeto
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.node,
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "no-console": "warn",
      "prettier/prettier": "error",
      "no-underscore-dangle": "off",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          "ts": "never",
          "js": "always"
        }
      ],
    },
  },
  prettierConfig,
];
