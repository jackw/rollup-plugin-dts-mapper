import pkg from "./package.json" assert { type: "json" };

export default {
  input: "src/index.js",
  external: ["path"],
  output: [
    {
      format: "cjs",
      file: pkg.main,
      exports: "default",
    },
    {
      format: "es",
      file: pkg.module,
    },
  ],
};
