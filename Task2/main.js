const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/number', (req, res) => {
    res.send('Go to /number/:num to check if :num is/isn’t a palindrome');
})

app.get('/number/:num', (req, res) => {
    const num = req.params.num;
    if (num<1){
        return res.send('Number is negative');
    }
    const rev = num.split('').reverse().join('');
    if (num === rev) {
       return res.send(`${num} is a palindrome`);
    } else {
       return res.send(`${num} isn't a palindrome`);
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})