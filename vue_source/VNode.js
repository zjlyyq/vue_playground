export default class VNode {
  constructor(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
    this.tag = tag   // 元素节点判断
    this.data = data // 
    this.children = children // 子节点指向
    this.text = text    // 文本节点和注释节点使用
    this.elm = elm     // 挂载的DOM元素
    this.ns = undefined
    this.context = context
    this.functionalContext = undefined
    this.functionalOptions = undefined
    this.functionalScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  get child() {
    return this.componentInstance
  }
}

// 文本节点创建以及相关方法
const textNode = document.createTextNode('我是一个文本节点');
textNode.textContent = '我是一个文本几点啊啊啊'

// 注释节点创建以及相关方法
const commentNode = document.createComment('我是一个注释节点');
console.log(commentNode.textContent);

// 使用文本节点更新旧节点
const headerEl = document.createElement('header', {});
const divEl = document.createElement('div', {});
divEl.appendChild(textNode);
headerEl.appendChild(divEl);
console.log(headerEl);

document.body.appendChild(headerEl);
console.log(headerEl.tagName);
setTimeout(() => {
  headerEl.textContent = 'xxx';
  console.log(headerEl.tagName);
}, 1000)