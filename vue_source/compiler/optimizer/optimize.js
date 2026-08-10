export default function optimize(root) {
  if (!root) return;
  // 第一步标记静态节点
  makeStatic(root);
  // 第二步标记静态根节点
  makeStaticRoot(root);
}

function makeStatic(node) {
  root.static = isStatic(node);
  if (node.type === 1) {
    for(let child of node.children) {
      makeStatic(child);
      if (!child.static) root.static = false;
    }
  }
}

function makeStaticRoot(node) {
  
}

function isStaic(node) {
  if (node.type === 2) { // 带变量的文本节点
    return false;
  }
  if (node.type === 3) { // 不带变量的文本节点
    return true;
  }
  // type === 1 元素节点
  return !!(
    node.pre || (
      !node.hasBindings && // 没有动态绑定
      !node.if && !node.for && // 没有v-if v-for
      !isBuildInTag(node) && // 不是内会标签
      isPlatformReservedTag(node.tag)  &&// 不是组件
      !isDirectChildOfTemplateFor(node) &&
      Object.keys(node).every(isStaticKey)
    )
  )
}