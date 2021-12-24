const html = `<p class="greeting" id="xxx">Hello World!</p>`

function htmlParser(template) {

    const ncname = '[a-zA-Z_][\\w\-\\.]*';  // \w 任意字母数字下划线
    const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
    const startTagOpen = new RegExp(`^<${qnameCapture}`);
    
    const start = template.match(startTagOpen);
    
    const match = {
        tagname: start[1],
        attrs: []
    }
    // /^\s*([^\s"'<>\/=]+)   (?:\s* (=) \s* (?:"([^"]*)"+|'([^']*) '+| ([^\s"'=<>`]+)) )?/
    // 解析标签属性
    const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
    // let html = ' disabled= "true"" id="app"></div>';
    let html = template.substring(start[0].length);

    let end, attr;
    const startTagClose = /^\s*(\/?)>/;
    while(!(end=html.match(startTagClose)) && (attr = html.match(attribute))) {
        html = html.substring(attr[0].length)
        match.attrs.push(attr);
    }
    console.log(html);
    console.log(parseStartTagEnd(html));
}

// 解析开始标签结尾
function parseStartTagEnd(html) {
    const startTagClose = /^\s*(\/?)>/;
    const end = html.match(startTagClose);
    const match = {};

    if (end) {
        match.unarySlash = end[1];
        html = html.substring(end[0].length);
    }
    return match;
}

// htmlParser(html);

async function asyncFn() {
    const rand = Math.random();
    if (rand > 0.9) return true;
    else {
        throw new Error('rand < 0.5');
    }
}
function asyncFn2() {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        if (rand > 0.5) resolve({});
        else {
            reject('rand < 0.5')
        }
    });
}
asyncFn().then(() => {
    console.log(true);
}).catch(error => {
    console.log(error);
})
// (async () => {
//     try {
//         await asyncFn2();
//     } catch (error) {
//         console.log(error);
//     }
// })();