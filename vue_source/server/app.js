const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.resolve(__dirname, '../')));

app.listen(2333, _ => {
    console.log('Server run in port 2333: url: http://localhost:2333');
})