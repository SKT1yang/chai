import { defineConfig, OxfmtConfig } from "oxfmt";

export default defineConfig<OxfmtConfig>({
  endOfLine: "lf",
  printWidth: 120,
  singleQuote: true,
  tabWidth: 4,
  useTabs: true,
});
