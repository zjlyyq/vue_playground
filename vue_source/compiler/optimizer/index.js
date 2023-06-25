export function optimize(root) {
  if (!root) return;
  // 第一步：标记所有静态节点
  markStatic(root);
  // 第二步：标记所有静态根节点
  markStaticRoots(root);
}

function markStatic(node) {
  node.static = isStatic(node)
  if (node.type === 1) {
    for (let i = 0, l = node.children.length; i < l; i++) {
      const child = node.children[i];
      markStatic(child);
    }
  }
}

function isStatic(node) {
  if (node.type === 2) { // 带变量的动态文本节点
    return false
  }
  if (node.type === 3) { // 不带变量的纯文本节点
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // 没有动态绑定
    !node.if && !node.for && // 没有v-if或v-for或v-else
    !isBuiltInTag(node.tag) && // 不是内置标签
    isPlatformReservedTag(node.tag) && // 不是组件
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}