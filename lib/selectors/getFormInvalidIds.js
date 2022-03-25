'use strict'

exports.__esModule = true
exports['default'] = void 0

var createGetFormInvalidIds = function createGetFormInvalidIds(_ref) {
  var getIn = _ref.getIn,
    empty = _ref.empty
  return function(form, getFormState) {
    return function(state) {
      var nonNullGetFormState =
        getFormState ||
        function(state) {
          return getIn(state, 'form')
        }

      return getIn(nonNullGetFormState(state), form + '.invalidIds') || empty
    }
  }
}

var _default = createGetFormInvalidIds
exports['default'] = _default
