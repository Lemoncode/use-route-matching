const path = require("path");

const rootPath = path.resolve(__dirname, "../..");
const resolveFromRootPath = (...args) => path.join(rootPath, ...args);
const capitalizeString = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const camelCaseString = (dashedName) =>
  dashedName
    .split("-")
    .map((s, i) => (i > 0 ? capitalizeString(s) : s))
    .join("");
const removeScopeInBundleName = (scopedName) => scopedName.replace(/@.+\//g, "");

const bundleName = removeScopeInBundleName(process.env.npm_package_name);
const bundleNameCamelCase = camelCaseString(bundleName);
const versionName = JSON.stringify(process.env.npm_package_version).replace(/"/g, "");
const getFileName = (min) => `${bundleName}-${versionName}${min ? ".min" : ""}.js`;

exports.srcPath = resolveFromRootPath("src");
exports.demoPath = resolveFromRootPath("demo");
exports.buildPath = resolveFromRootPath("build");
exports.buildDemoPath = resolveFromRootPath("build-demo");
exports.distPath = resolveFromRootPath("build", "dist");
exports.bundleName = bundleName;
exports.bundleNameCamelCase = bundleNameCamelCase;
exports.versionName = versionName;
exports.getFileName = getFileName;
