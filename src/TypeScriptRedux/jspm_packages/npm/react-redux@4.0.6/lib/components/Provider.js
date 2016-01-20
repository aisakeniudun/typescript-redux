/* */ 
'use strict';
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }});
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var _require = require('react');
var Component = _require.Component;
var PropTypes = _require.PropTypes;
var Children = _require.Children;
var storeShape = require('../utils/storeShape');
var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;
  console.error('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/rackt/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}
var Provider = (function(_Component) {
  _inherits(Provider, _Component);
  Provider.prototype.getChildContext = function getChildContext() {
    return {store: this.store};
  };
  function Provider(props, context) {
    _classCallCheck(this, Provider);
    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
    _this.store = props.store;
    return _this;
  }
  Provider.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var store = this.store;
    var nextStore = nextProps.store;
    if (store !== nextStore) {
      warnAboutReceivingStore();
    }
  };
  Provider.prototype.render = function render() {
    var children = this.props.children;
    return Children.only(children);
  };
  return Provider;
})(Component);
Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
};
Provider.childContextTypes = {store: storeShape.isRequired};
module.exports = Provider;
