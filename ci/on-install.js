const fs = require('fs');
const { spawn } = require('child_process');
const { prebuildName, legacyPrebuildName, detectLibc } = require('./prebuild-name');

async function main() {
  if (fs.existsSync('./build')) {
    process.stdout.write('-- node-rdkafka bindings already installed, skipping\n');
    return;
  }

  const libc = detectLibc();
  const candidates = [prebuildName(libc), legacyPrebuildName()]
    .filter((name, index, all) => all.indexOf(name) === index);

  const prebuildFileName = candidates.find((name) => fs.existsSync(`./prebuild/${name}.tar.gz`));

  if (!prebuildFileName) {
    throw new Error(`Missing node-rdkafka for arch "${process.arch}", libc "${libc || 'n/a'}" and ABI "${process.versions.modules}". Looked for: ${candidates.join(', ')}. Prebuild bindings first.`);
  }

  process.stdout.write(`-- Unpacking "./prebuild/${prebuildFileName}.tar.gz" archive...\n`);
  const tarCmd = spawn('tar', [
    'xzvf',
    `./prebuild/${prebuildFileName}.tar.gz`
  ]);
  tarCmd.stdout.pipe(process.stdout);
  tarCmd.stderr.pipe(process.stderr)
}

main().catch(err => console.error(err));
