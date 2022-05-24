const fs = require('fs/promises');
const path = require('path');

(async function () {
  await fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true});
  let template = await fs.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const components = await fs.readdir(path.join(__dirname, 'components'));
  for (const component of components) {
    const data = await fs.readFile(path.join(__dirname, 'components', component), 'utf-8');
    template = template.replace(`{{${component.split('.')[0]}}}`, data);
  }
  await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);

  const files = await fs.readdir(path.join(__dirname, 'styles'));
  for (const file of files) {
    if (path.extname(file) !== '.css') {
      continue;
    } 
    await fs.appendFile(
      path.join(__dirname, 'project-dist', 'style.css'),
      await fs.readFile(path.join(__dirname, 'styles', file), 'utf-8')
    );
  }

  const assets = await fs.readdir(path.join(__dirname, 'assets'));
  await fs.rm(path.join(__dirname, 'project-dist', 'assets'), {recursive: true, force: true});
  await fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {recursive: true});
  for (const dir of assets) {
    await fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir), {recursive: true});
    const d = await fs.readdir(path.join(__dirname, 'assets', dir));
    for (const file of d) {
      await fs.copyFile(path.join(__dirname, 'assets', dir, file), path.join(__dirname, 'project-dist', 'assets', dir, file));
    }
  }
  console.log('build done');
})();
