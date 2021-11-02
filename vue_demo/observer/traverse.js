import { isObject } from '../utils/index.js';
const seenObjects = new Set();

export function traverse(val) {
    // console.log(val);
    _traverse(val, seenObjects)
    seenObjects.clear();
}

function _traverse(val, seen) {
    let keys;
    const isArray = Array.isArray(val);
    if ((!isArray && !isObject(val)) || Object.isFrozen(val)) {
        return;
    }
    if (val.__ob__) {
        const depId = val.__ob__.dep.id;
        if (seen.has(depId)) return;
        seen.add(depId);
    }
    if (isArray) {
        for(let item of val) {
            _traverse(item, seen);
        }
    } else {
        keys = Object.keys(val);
        for(let key of keys) {
            _traverse(val[key], seen);
        }
    }
}