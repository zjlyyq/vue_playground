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

function moveFile(sourcePath, targetPath) {
    console.log(`mv ${sourcePath} ${targetPath}`)
    child_process.execSync(`mv ${sourcePath} ${targetPath}`);
}

/**
 * ffmpeg -ss 00:00:00 -t 8 -i 2021-10-19-11-02-49.mp4 1.gif
 * @param {String} videoPath 视频绝对路径
 * @param {String} startTime 视频截取起始点
 * @param {Number} duration gif持续时长
 * @param {String} outputName gif文件名
 */
function makeGif(videoPath, startTime = '00:00:00', duration=5, outputName='1.gif') {
    const ffmpeg_cmd = `ffmpeg -ss ${startTime} -t ${duration} -i ${videoPath} ${outputName}`;
    console.log(`制作Gif命令： ${ffmpeg_cmd}`)
    child_process.execSync(ffmpeg_cmd);
}
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

app.post('/handleVideoToGif', (req, res) => {
    const { files } = req;
    const paths = [];   // 保存视频路径
    res.setHeader('Access-Control-Allow-Origin', '*');
    for(let filename in files) {
        const file = files[filename];
        try {
            moveFile(
                file.path, 
                path.resolve(__dirname, './tmp/gif_source/' + file.name.replace(/ /g, '-')), 
            );
            paths.push(path.resolve(__dirname, './tmp/gif_source/' + file.name.replace(/ /g, '-')));
            try {
                const gifName =  Date.now().toString() + '.gif';
                makeGif(paths[0], '00:00:00', 5, path.resolve(__dirname, './tmp/output/gif/' + gifName));
                res.send('tmp/output/gif/' + gifName);
            } catch (error) {
                res.status('505');
                res.json({ errorText: error.toString()});
            }
        } catch (error) {
            res.status('505');
            res.json({ errorText: error.toString()});
            break;
        }
    }
})
app.get('/download', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log('处理视频下载： ' + path.resolve(__dirname, './' + downloadFile));
    res.setHeader('Content-Type', 'application/octet-stream');
    // 设置文件名
    res.setHeader('Content-Disposition', 'attachment;filename=' + downloadFile);
    if (downloadFile.length === 0) res.send('视频拼接失败！');
    else res.sendFile(path.resolve(__dirname, './tmp/output/' + downloadFile));
})
app.get('/downloadGif', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { filepath } = req.query;
    console.log('处理Gif下载： ' + path.resolve(__dirname, './' + filepath));
    res.setHeader('Content-Type', 'application/octet-stream');
    // 设置文件名
    res.setHeader('Content-Disposition', 'attachment;filename=' + filepath.split('gif/')[1]);
    if (filepath.length === 0) res.send('下载Gif失败');
    else res.sendFile(path.resolve(__dirname, './' + filepath));
})
app.listen(3333, () => {
    console.log('listening in port 3333');
})

// console.log(path.resolve(__dirname, '../../vue_demo'));
app.use(
    "/demo",
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); //自定义中间件，设置跨域需要的响应头。
        next();
    },
    express.static(path.resolve(__dirname, '../../../vue_demo'))
);