import path from "path";
import { fileURLToPath } from "url";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import imp from "eslint-plugin-import";
import sonarjs from "eslint-plugin-sonarjs";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import typescript from "typescript-eslint";

const config = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...typescript.configs.recommended,
  prettier,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: path.dirname(fileURLToPath(import.meta.url)),
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      import: imp,
      "unused-imports": unusedImports,
    },
    settings: {
      "import/parsers": {
        espree: [".js", ".cjs", ".mjs", ".jsx"],
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-invalid-void-type": "error",
      "sonarjs/no-nested-switch": "off",
      "sonarjs/no-nested-template-literals": "off",
      "sonarjs/no-small-switch": "off",
      "import/named": "error",
      "import/namespace": "error",
      "import/default": "error",
      "import/export": "error",
      "import/no-duplicates": "warn",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "parent", "sibling", "index"],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: false,
          },
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "off",
    },
  },
];
export default config;
