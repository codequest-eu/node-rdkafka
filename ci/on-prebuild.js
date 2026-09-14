const { spawn } = require('child_process');
const { prebuildName, detectLibc } = require('./prebuild-name');

async function main() {
  const prebuildFileName = prebuildName();

  process.stdout.write(`Detected libc: ${detectLibc()}\n`);
  process.stdout.write(`Preparing "./prebuild/${prebuildFileName}.tar.gz" archive...\n`);
  const tarCmd = spawn('tar', [
    'czvf',
    `./prebuild/${prebuildFileName}.tar.gz`,
    './build',
  ]);
  tarCmd.stdout.pipe(process.stdout);
  tarCmd.stderr.pipe(process.stderr)
}

main().catch(err => console.error(err));
