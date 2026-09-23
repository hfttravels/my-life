import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // External downloaded repositories (not part of this project):
    "react-native-main/**",
    "react-static-master/**",
    "superpowers-main/**",
    "eslint-main/**",
    "awesome-design-md-main/**",
    "transformers-main/**",
  ]),
]);

export default eslintConfig;
