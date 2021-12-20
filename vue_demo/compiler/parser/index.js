const html = `<div><p class="greeting">Hello World!</p></div>`

function htmlParser(template) {

    const ncname = '[a-zA-Z_][\\w\-\\.]*';  // \w 任意字母数字下划线
    const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
    const startTagOpen = new RegExp(`^<${qnameCapture}`);
    
    const start = template.match(startTagOpen);
    
    const match = {
        tagname: start[1],
        attrs: []
    }

    const attribute = /^\s*/
}

htmlParser(html);