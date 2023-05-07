let html = '<div class="container" id="aopp"></div>';
// 开始标签正则部分
const ncname = '[a-zA-Z_][\\w\\-\\.]*'; // 以字母下划线开头，后跟任意字母数字下划线（\w） 小横线（\-） 点（\.）
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`);  // 开始标签正则： /^<((?:[a-zA-Z_][\w\-\.]*\:)?[a-zA-Z_][\w\-\.]*)/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>$`); 
// 标签属性部分
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// 开始标签结束正则
const startTagClose = /^\s*(\/?)>/;
// 注释
const comment = /^<!--/;
// 条件注释
const conditionalComment = /^<!\[/; // <![]>
const doctype = /^<!DOCTYPE [^>]+>/i;
const template = '';
parseHTML(html, {
  start(tag, attrs, unary) {
    // 每当解析到标签的开始位置时，触发该函数 
    let element = createASTElement(tag, attrs, currentParent)
  },
  end(tagName) {
    // 每当解析到标签的结束位置时，触发该函数
    console.log(tagName);
  }
  , chars(text) {
    text = text.trim(); // 方法会从一个字符串的两端删除空白字符
    if (text) {
      const children = currentParent.children;
      if (expression = parseText(text)) {
        children.puah({
          type: 2,
          expression,
          text
        })
      } else {
        children.puah({
          type: 3,
          text
        })
      }
    }
    // 每当解析到文本时，触发该函数 
    let element = {type: 3, text};

  },
  comment(text) {
    // 每当解析到注释时，触发该函数 
    let element = {type: 3, text, isComment: true}
  }
});

/**
 * 文本解析器。带变量文本被解析后返回一个expression
 * "Hello {{name}}" ---》 "Hello "+_s(name)
 */
function parseText(text) {
  const tagRE = /\{\{((?:.|\n)+?)\}\}/g;
  if (!tagRE.test(text)) {
    return;
  }
  const tokens = [];
  tagRE.lastIndex = 0;  // exec在全局模式下返回下一个匹配项, 前面已经使用该国一次test，这里重新从第一位匹配
  let match, index = 0, lastIndex = 0;
  while(match = tagRE.exec(text)) { // exec在全局模式下返回下一个匹配项
    index = match.index;
    // console.log(match);
    // 先把 {{ 前边的文本添加到tokens中
    if (index > lastIndex) {
      tokens.push(text.substring(lastIndex, index));
    }
    tokens.push(`_s(${match[1].trim()})`);
    // 设置lastIndex来保证下一轮循环时，正则表达式不再重复匹配已经解析过的文本
    lastIndex = index + match[0].length
  }
  // 当所有变量都处理完毕后，如果最后一个变量右边还有文本，就将文本添加到数组中
  if (lastIndex < text.length) {
    token.push(text.substring(lastIndex));
  }
  return tokens.join('+');
}
// parseText('hello {{a}}, {{v}}')
function parseHTML(html, options) {
  while(html) {
    if (!lastTag && !isPlainTextElement(lastTag)) {
      let textEnd = html.indexOf('<');
      // < 开头
      if (textEnd === 0) {
        // 注释
        if (comment.test(html)) {
          // 注释的处理逻辑
          continue;
        }

        // 条件注释
        if(conditionalComment.test(html)) {
          // 条件注释的处理逻辑
          continue;
        }

        // DOCTYPE
        const doctypeMatch = html.match(doctype)
        if (doctypeMatch) {
          // DOCTYPE的处理逻辑
          continue;
        }

        // 结束标签
        const endTagMatch = html.match(endTag)
        if(endTagMatch) {
          // 结束标签的处理逻辑
          continue;
        }

        // 开始标签
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          // 开始标签的处理逻辑
          continue;
        }
      }

      let text, rest, next;
      if(textEnd > 0) {
        // 解析文本
        rest = html.slice(textEnd);
        while(
          !endTag.test(rest) && 
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest) 
        ) {
          // 如果'<'在纯文本中，将它视为纯文本对待
          next = rest.indexOf('<', 1); // 注意这里要从下标 1 开始寻照
          if (next < 0) break
          textEnd += next
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        html = html.substring(textEnd);
      } 

      if(textEnd < 0) {
        // 没有 <,全是文本
        text = html;
        html = '';
      }
      if(options.char && text) {
        options.char(text);
      }
    } else {
      // 父元素为script、style、textarea的处理逻辑 
    }
  }
}

function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag,
    attrsList: attrs,
    parent,
    children: []
  }
}


// <div class="container" id="aopp"></div>
// let html = ' class="container" id="aopp"></div>';
// parseHTML(html);
function advance(n) {
  html = html.substring(n);
}

// 解析结束标签
function parseEndTag() {
  const endTagMatch = html.match(endTag);
  if (endTagMatch) {
    advance(endTagMatch[0].length);
    // 触发end沟子函数
    options.end(endTagMatch[1])
  }
}
// 解析开始标签
function parseStartTag() {
  // 解析标签名，判断模板是否符合开始标签的特征
  const start = html.match(startTagOpen);
  if(start) {
    const match = {
      tagName: start[1],
      attrs: []
    }
    advance(start[0].length);

    // 解析标签属性
    let ast = [];
    let end, attr;
    while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
      match.attrs.push(attr);
      advance(attr[0].length);
    }
    // 判断该标签是否是自闭合标签
    if (end) {
      console.log(end);
      match.unarySlash = end[1];
      advance(end[0].length);
      return match;
    }
  }
}
// 解析注释
function parseComment() {
  if (comment.test(html)) {
    const commentEnd = html.indexOf('-->');
    if (commentEnd >= 0) {
      if (options.shouldKeepComment) {
        options.comment(html.substring(4, commentEnd));
      }
      html = html.substring(commentEnd + 3);
    }
  }
}
// 解析条件注释
function parseConditionalComment() {
  if (conditionalComment.test(html)) {
    const conditionalEnd = html.indexOf(']>');
    if (conditionalEnd >= 0) {
      html = html.substring(conditionalEnd + 2)
    }
  }
}
// 解析dectype
function parseDectype() {
  const doctypeMatch = html.match(doctype);
  if (doctypeMatch) {
    html = html.substring(doctypeMatch[0].length)
  }
}

// 截取文本
function parseText() {
  let text, rest, next;
  let textEnd = html.indexOf('<');
  if (textEnd >= 0) {
    rest = html.slice(textEnd);
    while(
      !endTag.test(rest) && 
      !startTagOpen.test(rest) &&
      !comment.test(rest) &&
      !conditionalComment.test(rest) 
    ) {
      // 如果'<'在纯文本中，将它视为纯文本对待
      next = rest.indexOf('<', 1); // 注意这里要从下标 1 开始寻照
      if (next < 0) break
      textEnd += next
      rest = html.slice(textEnd);
    }
    text = html.substring(0, textEnd);
    html = html.substring(textEnd);
  }

  // 如果模板中找不到 <，就说明整个模板都是文本
  if (textEnd < 0) {
    text = html;
    html = '';
  }

  if (options.char && text) {
    options.char(text);
  }
}

// 处理纯文本内容
function parsePureText() {
  while(html) {
    if (!lastTag || !isPlainTextElement(lastTag)) {
      // 父元素为正常元素的处理逻辑 
    } else {
      // 父元素为script、style、textarea的处理逻辑
      const stackedTag = lastTag.toLowerCase();
      const reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      const rest = html.replace(reStackedTag, function (all, text) {
        if (options.char) {
          options.char(text);
        }
        return '';
      });
      html = rest;
      options.end(stackedTag);
    }
  }
}
// console.log(html, match);
function parseStartTagEnd (html) {
  const startTagClose = /^\s*(\/?)>/;
  const end = html.match(startTagClose);
  const match = {};
  if (end) {
    match.unarySlash = end[1];
    html = html.substring(end[0].length);
    return match;
  }
}