import { basename, dirname, relative, join, extname } from "path";

export default function dtsMapper() {
  return {
    name: "dts-mapper",
    async generateBundle(options, bundle) {
      const outputDir = options.dir ? options.dir : "";
      for (const [fileName, file] of Object.entries(bundle)) {
        if (file.isEntry) {
          const fileDir = dirname(join(outputDir, fileName));
          const sourcePath = relative(fileDir, file.facadeModuleId);
          const dtsFileName = basename(fileName, extname(fileName)) + ".d.ts";
          this.emitFile({
            type: "asset",
            fileName: dtsFileName,
            source: `export * from '${sourcePath}'`,
          });
        }
      }
    },
  };
}
