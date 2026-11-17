const fs = require('fs');
const path = require('path');

// 1. Patch Metro DependencyGraph to prevent crashes when change event is missing 'changes'
const depGraphPath = path.join(__dirname, '../node_modules/metro/src/node-haste/DependencyGraph.js');
if (fs.existsSync(depGraphPath)) {
  let content = fs.readFileSync(depGraphPath, 'utf8');
  if (content.includes('_onHasteChange({ changes, rootDir })')) {
    content = content.replace(
      '_onHasteChange({ changes, rootDir }) {',
      `_onHasteChange(changeEvent) {
    if (!changeEvent || !changeEvent.changes) {
      this._resolutionCache = new Map();
      this._createModuleResolver();
      this.emit("change");
      return;
    }
    const { changes, rootDir } = changeEvent;`
    );
    content = content.replace(
      'this.#packageCache.invalidate(\n        _nodePath.default.join(rootDir, canonicalPath),\n      ),',
      'this.#packageCache.invalidate(\n        _nodePath.default.join(rootDir || "", canonicalPath),\n      ),'
    );
    content = content.replace(
      'this.#packageCache.invalidate(\r\n        _nodePath.default.join(rootDir, canonicalPath),\r\n      ),',
      'this.#packageCache.invalidate(\r\n        _nodePath.default.join(rootDir || "", canonicalPath),\r\n      ),'
    );
    fs.writeFileSync(depGraphPath, content, 'utf8');
    console.log('[patch-metro] Successfully patched Metro DependencyGraph.js');
  } else {
    console.log('[patch-metro] Metro DependencyGraph.js is already patched');
  }
}

// 2. Patch react-native-css-interop to prevent assertion crashes in emitHasteFileChange
const interopPath = path.join(__dirname, '../node_modules/react-native-css-interop/dist/metro/index.js');
if (fs.existsSync(interopPath)) {
  let content = fs.readFileSync(interopPath, 'utf8');
  if (content.includes('(0, assert_1.default)(haste != null);')) {
    content = content.replace(
      `(0, assert_1.default)(haste != null);
    try {
        const modifiedTime = Date.now();
        const rootDirEntry = fileSystem?.lookup("");
        (0, assert_1.default)(rootDirEntry?.exists && typeof rootDirEntry.realPath === "string");
        const rootDir = rootDirEntry.realPath;`,
      `if (!haste) return;
    try {
        const modifiedTime = Date.now();
        const rootDirEntry = fileSystem?.lookup("");
        const rootDir = (rootDirEntry?.exists && typeof rootDirEntry.realPath === "string")
            ? rootDirEntry.realPath
            : (haste?.getRootDir ? haste.getRootDir() : process.cwd());`
    );
    fs.writeFileSync(interopPath, content, 'utf8');
    console.log('[patch-metro] Successfully patched react-native-css-interop metro/index.js');
  } else {
    console.log('[patch-metro] react-native-css-interop is already patched');
  }
}

