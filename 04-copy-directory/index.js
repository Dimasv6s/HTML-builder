const fs = require('fs/promises');
const path = require('path');
const fromDir = path.join(__dirname, 'files');
const toDir = path.join(__dirname, 'files-copy');

fs.mkdir(toDir, { recursive: true });

(async function (from, to) {
  const files = await fs.readdir(from);
  for (const file of files) {
    await fs.copyFile(path.join(from, file), path.join(to, file));
  } 
  console.log('copy done');
})(fromDir, toDir);
