## 一个月内读完深入浅出vue.js(Starting in 2023-03-16)
### 变化侦测
#### Object侦测
1. 如何追踪变化 —— 使用Object.defineProperty
2. 如何收集依赖 —— 在getter中收集依赖，在setter中触发依赖
3. 依赖收集在哪里 —— 依赖收集到Dep中
4. 依赖是谁？—— Watcher 用于集中处理所有用到数据的场景（如下），Dep通知也只需要通知Watcher
   1. 模板
   2. 用户写的watch
   3. ......
5. 递归侦听所有属性 —— `Observer` 类会附加到每一个被侦测的object上。