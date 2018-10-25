'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n  display: fixed;\n\n  }\n'], ['\n  display: fixed;\n\n  }\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventSource = require('eventsource');
var query = {
  v: 3,
  q: { find: {} }
};
var b64 = btoa(JSON.stringify(query));
var bitsocket = new EventSource('https://bitsocket.org/s/' + b64);
bitsocket.onmessage = function (e) {
  console.log(e.data);
};

var WatchAddress = function (_React$Component) {
  _inherits(WatchAddress, _React$Component);

  function WatchAddress(props) {
    _classCallCheck(this, WatchAddress);

    var _this = _possibleConstructorReturn(this, (WatchAddress.__proto__ || Object.getPrototypeOf(WatchAddress)).call(this, props));

    _this.state = { bchAddress: '' };
    return _this;
  }

  _createClass(WatchAddress, [{
    key: 'getTransaction',
    value: function getTransaction() {
      alert('asdf');
      var query = '\n      "v": 3,\n      "q": {\n        "find": {\n          "out.e.a": "qq4kp3w3yhhvy4gm4jgeza4vus8vpxgrwc90n8rhxe"\n        }\n      }';
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        PopupDiv,
        null,
        _react2.default.createElement(
          'div',
          { onClick: this.getTransaction },
          'asdf'
        )
      );
    }
  }]);

  return WatchAddress;
}(_react2.default.Component);

var PopupDiv = _styledComponents2.default.div(_templateObject);
exports.default = WatchAddress;