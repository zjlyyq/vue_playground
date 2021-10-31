import { isValidArrayIndex } from '../utils/index.js'
import { defineReavtive } from './Observer.js';
export function set(target, key, val) {
    if (Array.isArray(target) && isValidArrayIndex(key)) {
        target.length = Math.max(target.length, key);
        // 当我们使用splice 方法把val 设置到target 中的时 候，数组拦截器会侦测到target 发生了变化，并且会自动帮助我们把这个新增的val 转换成响应式的
        target.splice(key, 1, val)
        return val
    } 
    // key 已经存在于target 中, 这个key 已经被侦测了变化
    if (key in target && !(key in Object.prototype)) {
        target[key] = val;
        return val;
    }

    // 新增
    const ob = target.__ob__;
    // ob.vmCount  可以判断target 是不是根数据
    if (target.__isVue || (ob && ob.vmCount)) {
        process.env.NODE_ENV !== 'production' && warn(
            'Avoid adding reactive properties to a Vue instance or its root $data ' +
         'at runtime - declare it upfront in the data option.'
        );
        return val;
    }

    if (!ob) {
        target[key] = val;
        return val;
    }
    defineReavtive(target, key, val);
    ob.dep.notify();
    return val;
}