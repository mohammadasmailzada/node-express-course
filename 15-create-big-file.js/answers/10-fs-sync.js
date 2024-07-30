const fs = require('fs')
fs.writeFileSync('./temporary/fileA.txt', 'First line\n');
fs.writeFileSync('./temporary/fileA.txt', 'Second line\n', { flag: 'a' });
fs.writeFileSync('./temporary/fileA.txt', 'Third line\n', { flag: 'a' });
const fileContent = fs.readFileSync('./temporary/fileA.txt', 'utf8');
console.log(fileContent);
