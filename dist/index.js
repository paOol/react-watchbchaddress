"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

require("@babel/polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  visibility: hidden;\n  min-width: 250px;\n  margin-left: 0;\n  box-sizing: border-box;\n  font-weight: 400;\n  border-radius: 6px;\n  -webkit-box-shadow: 2px 2px 10px 2px hsla(0, 0%, 60%, 0.2);\n  box-shadow: 2px 2px 10px 2px hsla(0, 0%, 60%, 0.2);\n  background-color: #fff;\n  color: #808080;\n  text-align: center;\n  padding: 1rem 0.3rem;\n  position: fixed;\n  z-index: 1111;\n  top: 2rem;\n  font-size: 1rem;\n\n  &.on {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n  }\n\n  @-webkit-keyframes fadein {\n    from {\n      top: 0;\n      opacity: 0;\n    }\n    to {\n      top: 2rem;\n      opacity: 1;\n    }\n  }\n\n  @keyframes fadein {\n    from {\n      top: 0;\n      opacity: 0;\n    }\n    to {\n      top: 2rem;\n      opacity: 1;\n    }\n  }\n\n  @-webkit-keyframes fadeout {\n    from {\n      top: 2rem;\n      opacity: 1;\n    }\n    to {\n      top: 0;\n      opacity: 0;\n    }\n  }\n\n  @keyframes fadeout {\n    from {\n      top: 2rem;\n      opacity: 1;\n    }\n    to {\n      top: 0;\n      opacity: 0;\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  p {\n    word-break: break-word;\n    hyphens: auto;\n    overflow-wrap: break-word;\n  }\n  span {\n    font-weight: 700;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BITBOXSDK = require('bitbox-sdk/lib/bitbox-sdk').default;

var BITBOX = new BITBOXSDK();

var EventSource = require('eventsource');

var WatchAddress =
/*#__PURE__*/
function (_React$Component) {
  _inherits(WatchAddress, _React$Component);

  function WatchAddress() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, WatchAddress);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(WatchAddress)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      bchAddress: '',
      UTXOs: '',
      satoshis: '',
      amount: '',
      visible: false,
      err: ''
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getUTXOs",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(output) {
        var result, satoshis;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('in get utxos outputs', output);
                result = output.find(function (x) {
                  return x.e.a === _this.state.bchAddress;
                });
                console.log('results', result, _typeof(result));

                if (result && result.e) {
                  satoshis = result.e.v;

                  _this.setState({
                    visible: true,
                    satoshis: satoshis
                  });
                }

                return _context.abrupt("return");

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sanitizeAddress",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(string) {
        var valid, sanitized;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return BITBOX.Address.isMainnetAddress(string);

              case 3:
                valid = _context2.sent;
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);

                _this.setState({
                  err: 'Not a valid Bitcoin Cash address.'
                });

              case 9:
                if (!valid) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 12;
                return BITBOX.Address.toCashAddress(string, false);

              case 12:
                sanitized = _context2.sent;

                _this.setState({
                  bchAddress: sanitized
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "reveal",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", _this.setState({
                visible: true
              }));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hide", function () {
      return setTimeout(function () {
        _this.setState({
          visible: false
        });
      }, 3000);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "toggle",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _this.reveal();

            case 2:
              _context4.next = 4;
              return _this.hide();

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidUpdate",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(prevProps, prevState) {
        var UTXOs;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(prevState.UTXOs !== _this.state.UTXOs)) {
                  _context5.next = 7;
                  break;
                }

                console.log('state changed  ', _this.state.UTXOs);
                _context5.next = 4;
                return _this.getUTXOs(_this.state.UTXOs);

              case 4:
                UTXOs = _context5.sent;

                if (_this.state.satoshis) {
                  _this.getValue(_this.state.satoshis);
                }

                _this.toggle();

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      return function (_x3, _x4) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var query, bitsocket;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this.sanitizeAddress(_this.props.address);

            case 2:
              //var query = { v: 3, q: { find: {} } };
              query = {
                v: 3,
                q: {
                  find: {
                    'out.e.a': _this.state.bchAddress
                  }
                }
              };
              query = btoa(JSON.stringify(query));
              bitsocket = new EventSource("https://bitsocket.org/s/".concat(query));

              bitsocket.onmessage = function (e) {
                var resp = JSON.parse(e.data);

                if (resp.data.length >= 1) {
                  console.log('resp', resp);

                  if (resp.type == 'mempool') {
                    _this.setState({
                      UTXOs: resp.data[0].out
                    });
                  } // resp.type == block for confirmed txs

                }
              };

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    })));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getValue",
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(satoshis) {
        var val;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(satoshis >= 1000000)) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 3;
                return BITBOX.BitcoinCash.toBitcoinCash(satoshis);

              case 3:
                val = _context7.sent;
                console.log('in val', val, _typeof(val));
                val = "".concat(val, " BCH");
                _context7.next = 10;
                break;

              case 8:
                satoshis = satoshis.toLocaleString();
                val = "".concat(satoshis, " satoshis");

              case 10:
                _this.setState({
                  amount: val
                }); // let price = await BITBOX.Price.current('usd');
                // console.log('price here', price);


              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function (_x5) {
        return _ref7.apply(this, arguments);
      };
    }());

    return _this;
  }

  _createClass(WatchAddress, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      bitsocket.close();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          err = _this$state.err,
          visible = _this$state.visible,
          satoshis = _this$state.satoshis,
          amount = _this$state.amount;
      return _react.default.createElement("div", null, err ? err : '', _react.default.createElement(PopupDiv, {
        className: visible ? 'on' : 'off'
      }, amount && _react.default.createElement(Message, {
        amount: amount,
        text: this.props.text
      })), _react.default.createElement("button", {
        onClick: this.toggle
      }, "click me"));
    }
  }]);

  return WatchAddress;
}(_react.default.Component);

var Message = function Message(props) {
  return _react.default.createElement(Msg, {
    className: "features"
  }, _react.default.createElement("p", null, props.text, " ", _react.default.createElement("span", null, props.amount)));
};

var Msg = _styledComponents.default.div(_templateObject());

var PopupDiv = _styledComponents.default.div(_templateObject2());

var _default = WatchAddress;
exports.default = _default;