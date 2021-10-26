const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const express = require('express');
const formidable = require('express-formidable')
const app = express();

app.use(formidable());

app.post('/handleVideo', (req, res) => {
    // console.log(req);
    const { query, params, files } = req;
    // console.log(files);
    for(let filename in files) {
        console.log(filename, typeof files[filename]);
        const file = files[filename];
        console.log(`mv ${file.path} ${path.resolve(__dirname, './tmp/' + file.name)}`);
        child_process.exec(`mv ${file.path} ${path.resolve(__dirname, './tmp/' + file.name.replace(/ /g, '-'))}`, (err) => {
            console.log(err);
        });
        // fs.readFileSync(file.path);
        // fs.writeFile(path.resolve(__dirname, './tmp/' + file.name), file._writeStream);
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send('finished');
})

app.listen(3333, () => {
    console.log('listening in port 3333');
})