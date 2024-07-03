[npm]: https://img.shields.io/npm/v/rollup-plugin-dts-mapper
[npm-url]: https://www.npmjs.com/package/rollup-plugin-dts-mapper
[size]: https://packagephobia.now.sh/badge?p=rollup-plugin-dts-mapper
[size-url]: https://packagephobia.now.sh/result?p=rollup-plugin-dts-mapper

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# rollup-plugin-dts-mapper

🍣 A Rollup plugin which creates dummy .d.ts files that map back to the src ts file.

## Why?

Building TS definition files is slow and needs to be handled separately when using tools like SWC or Esbuild for speedy compilation. This plugin solves the issue by creating a `.d.ts` file for each entrypoint (just like when you build for production) but the contents map back to the source `ts` file. This makes it very quick to create TS definition files without the need to run a typescript compiler alongside Rollup.

The alternative to using this plugin is to set your package.json `types` definition to point to `src/index.ts` and at publish time swap that out for the dist definition file. This means relying on yarn or pnpm `publishConfig` overrides or custom scripting to duplicate and/or edit the package.json file.

## Requirements

This plugin requires an [LTS](https://github.com/nodejs/Release) Node version (v14.0.0+) and Rollup v1.20.0+.

## Install

Using npm:

```console
npm install rollup-plugin-dts-mapper --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin.

> [!CAUTION]
> This plugin should only ever be used during development builds.

```js
const isDevelopment = process.env.NODE_ENV !== "production";

export default {
  input: "src/index.js",
  output: {
    dir: "output",
    format: "cjs",
  },
  plugins: [
    isDevelopment && (await import("rollup-plugin-dts-mapper")).default(),
  ],
};
```

Then call `rollup` either via the [CLI](https://www.rollupjs.org/guide/en/#command-line-reference) or the [API](https://www.rollupjs.org/guide/en/#javascript-api).

## Options

There are currently no options available for this plugin.

<!-- ### `optionA`

Type: `String`<br>
Default: `null`

A description of what optionA does. -->

## Meta

[CONTRIBUTING](./CONTRIBUTING.md)
[CODE OF CONDUCT]('./CODE_OF_CONDUCT.md')
[LICENSE (MIT)](/LICENSE)
