import _toPath from "lodash/toPath";
import { Map, Iterable, List, fromJS as _fromJS } from 'immutable';
import deepEqual from './deepEqual';
import keys from './keys';
import setIn from './setIn';
import splice from './splice';
import plainGetIn from '../plain/getIn';
import plainMergeDeep from '../plain/mergeDeep';
var emptyList = List();
var structure = {
  allowsArrayErrors: false,
  empty: Map(),
  emptyList: emptyList,
  getIn: function getIn(state, field) {
    return Iterable.isIterable(state) ? state.getIn(_toPath(field)) : plainGetIn(state, field);
  },
  setIn: setIn,
  deepEqual: deepEqual,
  deleteIn: function deleteIn(state, field) {
    return state.deleteIn(_toPath(field));
  },
  forEach: function forEach(items, callback) {
    items.forEach(callback);
  },
  fromJS: function fromJS(jsValue) {
    return _fromJS(jsValue, function (key, value) {
      return Iterable.isIndexed(value) ? value.toList() : value.toMap();
    });
  },
  keys: keys,
  size: function size(list) {
    return list ? list.size : 0;
  },
  some: function some(items, callback) {
    return items.some(callback);
  },
  splice: splice,
  equals: function equals(a, b) {
    return b.equals(a) ? true : b.toSet().equals(a.toSet());
  },
  orderChanged: function orderChanged(a, b) {
    return b.some(function (val, index) {
      return val !== a.get(index);
    });
  },
  mergeDeep: function mergeDeep(target) {
    for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    return Iterable.isIterable(target) ? target.mergeDeep(sources[0]) : plainMergeDeep(target, sources);
  },
  toJS: function toJS(value) {
    return Iterable.isIterable(value) ? value.toJS() : value;
  }
};
export default structure;