var isObject = function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
};

var mergeDeep = function mergeDeep(target) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  if (!sources.length) {
    return target;
  }

  var source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        var _Object$assign;

        if (!target[key]) Object.assign(target, (_Object$assign = {}, _Object$assign[key] = {}, _Object$assign));
        mergeDeep(target[key], source[key]);
      } else {
        var _Object$assign2;

        Object.assign(target, (_Object$assign2 = {}, _Object$assign2[key] = source[key], _Object$assign2));
      }
    }
  }

  return mergeDeep.apply(void 0, [target].concat(sources));
};

export default mergeDeep;