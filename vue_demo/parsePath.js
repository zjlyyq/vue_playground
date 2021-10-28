const bailRE = /[^\w.$]/;

export default function parsePath(path) {
  if (bailRE.test(path)) return;
  const segments = path.split(".");
  return function (obj) {
    for (let i of segments) {
      if (!obj) return;
      obj = obj[i];
    }
    return obj;
  };
}
