import fetch from 'node-fetch';

if (process.argv[2] === '--help'){
    console.log('Usage: node cli.mjs --expenses to display ll expenses');
}
if (process.argv[2] === '--expenses'){
    fetch('http://localhost:3000/expenses')
    .then(response => response.json())
    .then(data => console.log(data));
}
