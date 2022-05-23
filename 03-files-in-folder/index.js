const fs = require('fs/promises');
const path = require('path');

const folder = path.join(__dirname, 'secret-folder');

(async function (folder) {
  try {
    const files = await fs.readdir(folder);
    for (const file of files) {
      const f = await fs.stat(path.join(folder, file));
      if (f.isDirectory()) {
        continue;
      }
      console.log(file.split('.')[0], ' - ', path.extname(file), ' - ', f.size + 'b');
    } 
  } catch (error) {
    console.log(error);
  }
})(folder);
