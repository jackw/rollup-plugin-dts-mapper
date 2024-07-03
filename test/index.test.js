import fs from "fs/promises";
import { tmpdir } from "os";
import path from "path";
import { rollup } from "rollup";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import dtsMapper from "../src/index.js";

describe("addFilePlugin", () => {
  const testDir = path.join(tmpdir(), "dtsmapper-test");
  const outputDir = path.join(testDir, "dist");
  const srcDir = path.join(testDir, "src");
  const inputs = [`${srcDir}/index.ts`, `${srcDir}/utils.ts`];

  beforeEach(async () => {
    // Clean up the output directory before each test
    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.mkdir(srcDir, { recursive: true });
    inputs.map((path) => {
      fs.writeFile(path, `export default function test() {}`);
    });
  });

  afterEach(async () => {
    // Clean up the output directory after each test
    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.rm(srcDir, { recursive: true, force: true });
  });

  it("should generate .d.ts files for each entry point", async () => {
    const bundle = await rollup({
      input: inputs,
      plugins: [dtsMapper()],
    });

    await bundle.write({
      format: "es",
      dir: outputDir,
    });

    // Verify .txt files for each entry point
    for (const input of inputs) {
      const inputFileName = path.basename(input, ".ts");
      const txtFilePath = path.join(outputDir, `${inputFileName}.d.ts`);
      const expectedContent = `export * from '${path.relative(
        outputDir,
        input
      )}'`;

      const content = await fs.readFile(txtFilePath, "utf-8");
      expect(content).toBe(expectedContent);
    }
  });
});
