const fs = require('fs/promises');
const path = require('path');
const fromDir = path.join(__dirname, 'styles');
const toDir = path.join(__dirname, 'project-dist');

(async function (from, to) {
  await fs.writeFile(path.join(to, 'bundle.css'), '');

  const files = await fs.readdir(from);
  for (const file of files) {
    if (path.extname(file) !== '.css') {
      continue;
    } 
    await fs.appendFile(
      path.join(to, 'bundle.css'),
      await fs.readFile(path.join(from, file), 'utf-8')
    );
  }
  console.log('merge done');
})(fromDir, toDir);
