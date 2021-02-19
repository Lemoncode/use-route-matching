// This is a temporary plugin to disable certain webpack warnings about "export X not found in Y".
// This is an issue that happens with ts-loader but also with babel-loader. Now that babel can
// transpile TS by itself, it does it by removing TS annotation. It may happen, when exporting
// an interface or a type, that they are removed as they are just TS entities (they do not exists
// in JS) but then, another TS file may be requiring them (like an index.ts), and it just warns.

// https://github.com/TypeStrong/ts-loader/issues/653#issuecomment-390889335

const ModuleDependencyWarning = require("webpack/lib/ModuleDependencyWarning");

// ↓ Based on https://github.com/sindresorhus/escape-string-regexp
const escapeStringForRegExp = (string) => string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");

module.exports = class IgnoreNotFoundExportPlugin {
  constructor(exportsToIgnore) {
    this.exportsToIgnore = exportsToIgnore || [];
  }

  getMessageRegExp() {
    if (this.exportsToIgnore.length > 0) {
      const exportsPattern = "(" + this.exportsToIgnore.map(escapeStringForRegExp).join("|") + ")";

      return new RegExp(`export '${this.exportsToIgnore}'( \\(reexported as '.*'\\))? was not found in`);
    } else {
      return /export '.*'( \(reexported as '.*'\))? was not found in/;
    }
  }

  apply(compiler) {
    const messageRegExp = this.getMessageRegExp();

    const doneHook = (stats) => {
      stats.compilation.warnings = stats.compilation.warnings.filter((warn) => {
        if (warn instanceof ModuleDependencyWarning && messageRegExp.test(warn.message)) {
          return false;
        }
        return true;
      });
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap("IgnoreNotFoundExportPlugin", doneHook);
    } else {
      compiler.plugin("done", doneHook);
    }
  }
};
