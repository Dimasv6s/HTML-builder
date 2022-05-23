const fs = require('fs');
const path = require('path');

fs.writeFile(path.resolve(__dirname, 'text.txt'), '', (error) => {
  if (error) console.log(error);
});

console.log('Введите текст');

process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('Пока');
    process.exit();
  }
  fs.appendFile(
    path.join(__dirname, 'text.txt'),
    data.toString(),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

process.on('SIGINT', () => {
  console.log('Пока');
  process.exit();
});