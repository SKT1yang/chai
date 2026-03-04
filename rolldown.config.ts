import { defineConfig, type RolldownOptions } from "rolldown";
// import { globSync } from "tinyglobby";

const input: RolldownOptions["input"] = ["src/extension.ts"];

const output: RolldownOptions["output"] = {
  sourcemap: true,
  format: "cjs",
  banner: `"use strict";\n`,
  minify: true,
  cleanDir: true,
  file: "out/main.js",
};

export default defineConfig({
  input,
  output,
  external: ["vscode"],
  platform: "node",
  transform: {
    target: "node16",
  },
});
