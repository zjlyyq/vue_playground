let html = `<p class="greeting" id="xxx">Hello <span>World</span>!</p>`
const ncname = '[a-zA-Z_][\\w\-\\.]*';  // \w 任意字母数字下划线
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;

function parseStartTag(template) {

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
    console.log(parseStartTagEnd(html));
    return html.substring(end[0].length);
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

html = parseStartTag(html);

// 解析结束标签
function parseEndTag(html) {
    const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
    const match = html.match(endTag);
    return  match;
}

// 解析注释
function parseComment(html, options) {
    const comment = /^<!--/;
    if (comment.test(html)) {
        const commentEnd = html.indexOf('-->');
        if (commentEnd > 0) {
            // 注释的钩子函数可以通过选项来配置， 只有options.shouldKeepComment 为真时，才会触发钩子函数，否则只截取 模板，不触发钩子函数
            if (options.shouldKeepComment) {
                options.comment(html.substring(4, commentEnd));
            }   
            html = html.substring(commentEnd + 3);
        }
    }
    // 条件注释 <![if IE 6]>
    const conditionalComment = /^<!\[/;
    if (conditionalComment.test(html)) {
        const conditionalEnd = html.indexOf(']>');
        html = html.substring(conditionalEnd + 2)
    }

}

parseEndTag('</div>')
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
// asyncFn().then(() => {
//     console.log(true);
// }).catch(error => {
//     console.log(error);
// })
// (async () => {
//     try {
//         await asyncFn2();
//     } catch (error) {
//         console.log(error);
//     }
// })();