const fs = require('fs');
const file = fs.readFileSync('text.txt', 'utf8');
const str = process.argv[2]
console.log(file.includes(str));