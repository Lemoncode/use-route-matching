const helpers = require("./helpers");
const IgnoreNotFoundExportPlugin = require("./IgnoreNotFoundExportPlugin.js");

module.exports = (env, argv) => {
  const minimizeBundle = Boolean(argv["optimize-minimize"]);

  return {
    mode: "production",
    devtool: "none",
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    entry: "./src/index.ts",
    output: {
      path: helpers.distPath,
      filename: helpers.getFileName(minimizeBundle),
      library: helpers.bundleNameCamelCase,
      libraryTarget: "umd",
      auxiliaryComment: {
        root: "Root Export",
        commonjs: "CommonJS Export",
        commonjs2: "CommonJS2 Export",
        amd: "AMD Export",
      },
    },
    externals: {
      react: "react",
      "react-dom": "react-dom",
    },
    optimization: {
      minimize: minimizeBundle,
    },
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    plugins: [new IgnoreNotFoundExportPlugin()],
  };
};
