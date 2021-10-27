const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const express = require('express');
const formidable = require('express-formidable')
const app = express();

app.use(formidable({
    // 文件大小限制 1G
    maxFileSize: 1000 * 1024 * 1024
}));

// 处理好的文件名
let downloadFile = '';
app.post('/handleVideo', (req, res) => {
    const { files } = req;
    const paths = [];
    res.setHeader('Access-Control-Allow-Origin', '*');
    for(let filename in files) {
        console.log(filename, typeof files[filename]);
        const file = files[filename];
        console.log(`mv ${file.path} ${path.resolve(__dirname, './tmp/' + file.name)}`);
        try {
            child_process.execSync(`mv ${file.path} ${path.resolve(__dirname, './tmp/' + file.name.replace(/ /g, '-'))}`);
            // res.send('finished');
            paths.push(path.resolve(__dirname, './tmp/' + file.name.replace(/ /g, '-')));
        } catch (error) {
            // console.log('error', error);
            res.status('505');
            res.json({ errorText: error.toString()});
            break;
        }
        // child_process.execSync(`mv ${file.path} ${path.resolve(__dirname, './tmp1/' + file.name.replace(/ /g, '-'))}`, (err) => {
        //     if (err) {
        //         console.log('error: ', err);
        //         res.status('505')
        //         res.json({ errorText: err});
        //         console.log({ errorText: err});
        //         return;
        //     } else {
        //         res.send('finished');
        //     }
        // });
    }
    let pathconcat = '';
    for(let p of paths) {
        pathconcat += p + '|';
    }
    // pathconcat = pathconcat.substring(0, pathconcat.length - 1);
    downloadFile = Date.now() + ".mp4";
    const ffmpeg_cmd = `ffmpeg -i "concat:${pathconcat}" -c copy ./tmp/output/${downloadFile}`;
    console.log(ffmpeg_cmd);
    try {
        child_process.execSync(ffmpeg_cmd);
        res.send(downloadFile);
    } catch (error) {
        res.status('505');
        res.json({ errorText: error.toString()});
    }
})

app.get('/download', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('处理视频下载： ' + path.resolve(__dirname, './' + downloadFile));
    res.setHeader('Content-Type', 'application/octet-stream');
    // 设置文件名
    res.setHeader('Content-Disposition', 'attachment;filename=' + downloadFile);
    if (downloadFile.length === 0) res.send('视频拼接失败！');
    else res.sendFile(path.resolve(__dirname, './' + downloadFile));
})
app.listen(3333, () => {
    console.log('listening in port 3333');
})