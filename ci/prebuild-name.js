function detectLibc() {
  if (process.platform !== 'linux') {
    return null;
  }

  const report = typeof process.report.getReport === 'function' ? process.report.getReport() : null;
  const header = report && report.header;

  return header && header.glibcVersionRuntime ? 'glibc' : 'musl';
}

function legacyPrebuildName() {
  return `platform-${process.arch}-ABI-${process.versions.modules}`;
}

function prebuildName(libc) {
  const resolved = libc === undefined ? detectLibc() : libc;

  if (!resolved) {
    return legacyPrebuildName();
  }

  return `platform-${process.arch}-${resolved}-ABI-${process.versions.modules}`;
}

module.exports = { detectLibc, prebuildName, legacyPrebuildName };
