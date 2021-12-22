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
    console.log(end);

}

htmlParser(html);