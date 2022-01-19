/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_IMG_3938_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_IMG_3938_jpg__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background: linear-gradient(0deg, rgba(50, 50, 50, 0.7), rgba(255, 255, 255, 0.7)), url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  margin: 0px;\n  font-family: \"Work Sans\", sans-serif;\n}\n\nbutton,\ninput {\n  font-family: \"Work Sans\", sans-serif;\n  margin: 10px;\n}\n\n.login-button:hover,\nbutton:hover {\n  background-color: #41a4de;\n  color: #FFF;\n  transition: 0.3s;\n}\n\nh1, h2 {\n  font-size: 25px;\n  margin: 0px 0px 10px 0px;\n}\n\nh2 {\n  font-size: 20px;\n}\n\n.nav-bar {\n  width: 100%;\n  position: fixed;\n  top: 0;\n  background-color: #16573b;\n  padding: 10px;\n  color: #FFF;\n  box-shadow: 0px 10px 20px #00000055;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.nav-buttons {\n  margin-right: 20px;\n}\n\n.header-logo {\n  font-size: 40px;\n  margin: 10px;\n  font-weight: 900;\n}\n\n.nav-button,\n.login-button {\n  background-color: #0069a5;\n  padding: 10px;\n  color: white;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  font-weight: 800;\n  box-shadow: 3px 3px 0px #00000055;\n  cursor: pointer;\n  border: solid 1px white;\n}\n\n.error {\n  color: #F00;\n}\n\n.error-spacer {\n  min-height: 16px;\n}\n\n.ux-background {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.ux-bounding-box,\n.currently-booked-room,\n.available-rooms-to-book,\n.booked-room-details {\n  background-color: #16573b;\n  color: #FFF;\n  padding: 50px;\n  border-radius: 5px;\n  box-shadow: 0px 10px 20px #00000055;\n  min-width: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n  min-height: 500px;\n  margin: 120px;\n  text-align: center;\n}\n\n.available-rooms-to-book {\n  text-align: left;\n}\n\n.book-listings,\n.bookings {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.results-filter {\n  margin: 20px;\n  padding: 10px;\n  border-radius: 5px;\n  display: flex;\n  flex-wrap: wrap;\n  background-color: #1d7b52;\n  box-shadow: 0px 10px 20px #00000055;\n  text-align: left;\n}\n\n.filterChoice {\n  padding: 0px 20px;\n}\n\n.currently-booked-room,\n.available-rooms-to-book,\n.booked-room-details {\n  background-color: #1d7b52;\n  padding: 20px;\n  margin: 20px;\n  min-height: 100px;\n  min-width: auto;\n}\n\n.bookingDetailsNavigation {\n  margin: 25px;\n}\n\n@media screen and (min-device-width: 0px) and (max-device-width: 800px) {\n  .nav-bar {\n    flex-direction: column;\n  }\n\n  .header-logo {\n    font-size: 30px;\n    margin: 10px 10px 10px 10px;\n  }\n\n  .nav-button,\n.login-button {\n    background-color: #0069a5;\n    padding: 10px;\n    color: white;\n    border-radius: 5px;\n    font-weight: 800;\n    margin: 7px;\n  }\n\n  .ux-bounding-box,\n.booked-room-details {\n    padding: 20px;\n    min-width: 80%;\n    min-height: 500px;\n    margin: 160px 20px 20px 20px;\n  }\n\n  .currently-booked-room,\n.available-rooms-to-book {\n    min-width: 60%;\n  }\n\n  .currently-booked-room,\n.available-rooms-to-book,\n.booked-room-details {\n    padding: 20px;\n    margin: 20px;\n    min-height: 50px;\n  }\n\n  .results-filter {\n    flex-direction: column;\n    margin: 10px;\n    padding: 10px;\n    min-width: 90%;\n  }\n\n  .bookingDetailsNavigation {\n    display: flex;\n    flex-direction: column;\n  }\n}\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss","webpack://./src/css/_typography.scss","webpack://./src/css/_variables.scss"],"names":[],"mappings":"AASA;EACE,2HAAA;EACA,4BAAA;EACA,4BAAA;EACA,sBAAA;EACA,WAAA;EACA,oCCfU;ADOZ;;AAWA;;EAEE,oCCpBU;EDqBV,YAAA;AARF;;AAUA;;EAEE,yBElB8B;EFmB9B,WElBwB;EFmBxB,gBAAA;AAPF;;AAUA;EACE,eAAA;EACA,wBAAA;AAPF;;AAUA;EACE,eAAA;AAPF;;AAUA;EACE,WAAA;EACA,eAAA;EACA,MAAA;EACA,yBE3Ce;EF4Cf,aAAA;EACA,WE1CW;EF2CX,mCAAA;EACA,aAAA;EACA,8BAAA;EACA,mBAAA;AAPF;;AAUA;EACE,kBAAA;AAPF;;AAUA;EACE,eAAA;EACA,YAAA;EACA,gBAAA;AAPF;;AAUA;;EAEE,yBE3DwB;EF4DxB,aAAA;EACA,YE5DkB;EF6DlB,YAAA;EACA,YAAA;EACA,kBAAA;EACA,gBAAA;EACA,iCAAA;EACA,eAAA;EACA,uBAAA;AAPF;;AAUA;EACE,WEzEiB;AFkEnB;;AAUA;EACE,gBAAA;AAPF;;AAUA;EAhFE,aAAA;EACA,uBAAA;EACA,mBAAA;AA0EF;;AAQA;;;;EAIE,yBE1FsB;EF2FtB,WE1FW;EF2FX,aAAA;EACA,kBAAA;EACA,mCAAA;EACA,cAAA;EA7FA,aAAA;EACA,uBAAA;EACA,mBAAA;EA6FA,sBAAA;EACA,iBAAA;EACA,aAAA;EACA,kBAAA;AAHF;;AAMA;EACE,gBAAA;AAHF;;AAMA;;EAzGE,aAAA;EACA,uBAAA;EACA,mBAAA;EA0GA,eAAA;AADF;;AAIA;EACE,YAAA;EACA,aAAA;EACA,kBAAA;EACA,aAAA;EACA,eAAA;EACA,yBExHU;EFyHV,mCAAA;EACA,gBAAA;AADF;;AAIA;EACE,iBAAA;AADF;;AAIA;;;EAGE,yBEpIU;EFqIV,aAAA;EACA,YAAA;EACA,iBAAA;EACA,eAAA;AADF;;AAIA;EACE,YAAA;AADF;;AAIA;EAGI;IACE,sBAAA;EAHJ;;EAKE;IACE,eAAA;IACA,2BAAA;EAFJ;;EAIE;;IAEE,yBEvJoB;IFwJpB,aAAA;IACA,YExJc;IFyJd,kBAAA;IACA,gBAAA;IACA,WAAA;EADJ;;EAGE;;IAEE,aAAA;IACA,cAAA;IACA,iBAAA;IACA,4BAAA;EAAJ;;EAEE;;IAEE,cAAA;EACJ;;EACE;;;IAGE,aAAA;IACA,YAAA;IACA,gBAAA;EAEJ;;EAAE;IACE,sBAAA;IACA,YAAA;IACA,aAAA;IACA,cAAA;EAGJ;;EADE;IACE,aAAA;IACA,sBAAA;EAIJ;AACF;AADA;EACE,aAAA;AAGF","sourcesContent":["@import '_variables';\n@import '_media-queries';\n@import '_typography';\n@mixin centered-flexbox {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\nbody {\n  background: linear-gradient(0deg, rgba(50, 50, 50, 0.7), rgba(255, 255, 255, 0.7)), url($photo-background);\n  background-repeat: no-repeat;\n  background-attachment: fixed;\n  background-size: cover;\n  margin: 0px;\n  font-family: $main-font;\n}\n\nbutton,\ninput {\n  font-family: $main-font;\n  margin: 10px;\n}\n.login-button:hover,\nbutton:hover {\n  background-color: $button-hover-background-color;\n  color: $button-hover-text-color;\n  transition: .3s;\n}\n\nh1, h2 {\n  font-size: 25px;\n  margin: 0px 0px 10px 0px;\n}\n\nh2 {\n  font-size: 20px;\n}\n\n.nav-bar {\n  width: 100%;\n  position: fixed;\n  top: 0;\n  background-color: $nav-background;\n  padding: 10px;\n  color: $text-color;\n  box-shadow: 0px 10px 20px #00000055;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.nav-buttons {\n  margin-right: 20px;\n}\n\n.header-logo {\n  font-size: 40px;\n  margin: 10px;\n  font-weight: 900;\n}\n\n.nav-button, \n.login-button {\n  background-color: $button-background-color;\n  padding: 10px;\n  color: $button-text-color;\n  color: white;\n  border: none;\n  border-radius: 5px;\n  font-weight: 800;\n  box-shadow: 3px 3px 0px #00000055;\n  cursor: pointer;\n  border: solid 1px white;\n}\n\n.error {\n  color: $error-text-color;\n}\n\n.error-spacer {\n  min-height: 16px;\n}\n\n.ux-background {\n  @include centered-flexbox;\n}\n\n.ux-bounding-box, \n.currently-booked-room,\n.available-rooms-to-book, \n.booked-room-details {\n  background-color: $view-background-color;\n  color: $text-color;\n  padding: 50px;\n  border-radius: 5px;\n  box-shadow: 0px 10px 20px #00000055;\n  min-width: 50%;\n  @include centered-flexbox;\n  flex-direction: column;\n  min-height: 500px;\n  margin: 120px;\n  text-align: center;\n}\n\n.available-rooms-to-book {\n  text-align: left;\n}\n\n.book-listings, \n.bookings {\n  @include centered-flexbox;\n  flex-wrap: wrap;\n}\n\n.results-filter {\n  margin: 20px;\n  padding: 10px;\n  border-radius: 5px;\n  display: flex;\n  flex-wrap: wrap;\n  background-color: $box-color;\n  box-shadow: 0px 10px 20px #00000055;\n  text-align: left;\n}\n\n.filterChoice {\n  padding: 0px 20px;\n}\n\n.currently-booked-room,\n.available-rooms-to-book,\n.booked-room-details {\n  background-color: $box-color;\n  padding: 20px;\n  margin: 20px;\n  min-height: 100px;\n  min-width: auto;\n}\n\n.bookingDetailsNavigation {\n  margin: 25px;\n}\n\n@media screen\n  and (min-device-width: 0px)\n  and (max-device-width: 800px) {\n    .nav-bar {\n      flex-direction: column;\n    }\n    .header-logo {\n      font-size: 30px;\n      margin: 10px 10px 10px 10px;\n    }\n    .nav-button, \n    .login-button {\n      background-color: $button-background-color;\n      padding: 10px;\n      color: $button-text-color;\n      border-radius: 5px;\n      font-weight: 800;\n      margin: 7px;\n    }\n    .ux-bounding-box, \n    .booked-room-details {\n      padding: 20px;\n      min-width: 80%;\n      min-height: 500px;\n      margin: 160px 20px 20px 20px;\n    }\n    .currently-booked-room,\n    .available-rooms-to-book, {\n      min-width: 60%;\n    }\n    .currently-booked-room,\n    .available-rooms-to-book,\n    .booked-room-details {\n      padding: 20px;\n      margin: 20px;\n      min-height: 50px;\n    }\n    .results-filter {\n      flex-direction: column;\n      margin: 10px;\n      padding: 10px;\n      min-width: 90%;\n    }\n    .bookingDetailsNavigation {\n      display: flex;\n      flex-direction: column;\n    }\n  }\n\n.hidden {\n  display:none;\n}","$main-font: 'Work Sans', sans-serif;","$nav-background: #16573b;\n$box-color: #1d7b52;\n$view-background-color: #16573b;\n$text-color: #FFF;\n$error-text-color: #F00;\n$button-background-color: #0069a5;\n$button-text-color: rgb(255, 255, 255);\n$button-hover-background-color: #41a4de;\n$button-hover-text-color: #FFF;"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/IMG_3938.jpg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Customers {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
  }
  totalCost(result, rooms) {
    let cost = result.reduce((acc, item) =>{
      let matchingRoom = rooms.find(room => item.roomNumber === room.number);
      acc += matchingRoom.costPerNight;
      return acc;
    }, 0)
    return cost;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Customers);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Bookings {
  constructor(booking) {
    this.id = booking.id;
    this.userID = booking.userID;
    this.date =  booking.date;
    this.roomNumber = booking.roomNumber;
    this.roomServiceCharges = booking.roomServiceCharges;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bookings);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Rooms {
  constructor(room) {
    this.number = room.number;
    this.roomType = room.roomType;
    this.bidet =  room.bidet;
    this.bedSize = room.bedSize;
    this.numBeds = room.numBeds;
    this.costPerNight = room.costPerNight;
  }
}
  
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Rooms);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customersAPI": () => (/* binding */ customersAPI),
/* harmony export */   "roomsAPI": () => (/* binding */ roomsAPI),
/* harmony export */   "bookingsAPI": () => (/* binding */ bookingsAPI),
/* harmony export */   "updateBookingsAPI": () => (/* binding */ updateBookingsAPI)
/* harmony export */ });
const customersAPI = fetch('http://localhost:3001/api/v1/customers').then(response => errorCheck(response)).catch(error => console.log(error));

const roomsAPI = fetch('http://localhost:3001/api/v1/rooms').then(response => errorCheck(response)).catch(error => console.log(error));

const bookingsAPI = fetch('http://localhost:3001/api/v1/bookings').then(response => errorCheck(response)).catch(error => console.log(error));

const updateBookingsAPI = (userId, pickedDate, pickedRoomNumber) => {
  return fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userID: userId, date: pickedDate, roomNumber: pickedRoomNumber })
  }).then(response => errorCheck(response)).catch(error => console.log(error));
}

const errorCheck = (response) => {
  if (!response.ok) {
    throw new Error('An error has occurred.');
  } else {
    return response.json();
  }
}



/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "resultsFilter": () => (/* binding */ resultsFilter),
/* harmony export */   "viewHome": () => (/* binding */ viewHome),
/* harmony export */   "viewCustomerDashboard": () => (/* binding */ viewCustomerDashboard),
/* harmony export */   "viewNewBooking": () => (/* binding */ viewNewBooking),
/* harmony export */   "viewSuccessfullyBookedRoom": () => (/* binding */ viewSuccessfullyBookedRoom),
/* harmony export */   "buttonHome": () => (/* binding */ buttonHome),
/* harmony export */   "buttonCurrentBookings": () => (/* binding */ buttonCurrentBookings),
/* harmony export */   "buttonNewBooking": () => (/* binding */ buttonNewBooking),
/* harmony export */   "bookedRoomOverview": () => (/* binding */ bookedRoomOverview),
/* harmony export */   "loginErrorMessage": () => (/* binding */ loginErrorMessage),
/* harmony export */   "errorSpacer": () => (/* binding */ errorSpacer),
/* harmony export */   "listingsHeaderMessage": () => (/* binding */ listingsHeaderMessage),
/* harmony export */   "availableRoomsToBook": () => (/* binding */ availableRoomsToBook),
/* harmony export */   "userBookings": () => (/* binding */ userBookings),
/* harmony export */   "totalSpent": () => (/* binding */ totalSpent),
/* harmony export */   "hide": () => (/* binding */ hide),
/* harmony export */   "show": () => (/* binding */ show),
/* harmony export */   "showViewHome": () => (/* binding */ showViewHome),
/* harmony export */   "showViewNewBooking": () => (/* binding */ showViewNewBooking),
/* harmony export */   "generateResult": () => (/* binding */ generateResult),
/* harmony export */   "showViewSuccessfullyBookedRoom": () => (/* binding */ showViewSuccessfullyBookedRoom),
/* harmony export */   "generateBookedRoomOverview": () => (/* binding */ generateBookedRoomOverview),
/* harmony export */   "showBookingDetails": () => (/* binding */ showBookingDetails),
/* harmony export */   "showResult": () => (/* binding */ showResult),
/* harmony export */   "showCustomerDashboard": () => (/* binding */ showCustomerDashboard),
/* harmony export */   "showLoginErrorMessage": () => (/* binding */ showLoginErrorMessage),
/* harmony export */   "clearUserBookingResults": () => (/* binding */ clearUserBookingResults),
/* harmony export */   "displayTotalSpent": () => (/* binding */ displayTotalSpent),
/* harmony export */   "clearAvailableRoomsToBook": () => (/* binding */ clearAvailableRoomsToBook),
/* harmony export */   "showListingsMessageAndAvailableRoomsToBookView": () => (/* binding */ showListingsMessageAndAvailableRoomsToBookView),
/* harmony export */   "showErrorListingsMessage": () => (/* binding */ showErrorListingsMessage),
/* harmony export */   "showListingsMessageAndAvailableRoomsToBook": () => (/* binding */ showListingsMessageAndAvailableRoomsToBook),
/* harmony export */   "showRoom": () => (/* binding */ showRoom),
/* harmony export */   "uppercaseFirstLetter": () => (/* binding */ uppercaseFirstLetter)
/* harmony export */ });
const viewHome = document.getElementById('viewHome');
const viewCustomerDashboard = document.getElementById('viewCustomerDashboard');
const viewNewBooking = document.getElementById('viewNewBooking');
const viewSuccessfullyBookedRoom = document.getElementById('viewSuccessfullyBookedRoom');
const resultsFilter = document.getElementById('resultsFilter');
const buttonHome = document.getElementById('buttonHome');
const buttonCurrentBookings = document.getElementById('buttonCurrentBookings');
const buttonNewBooking = document.getElementById('buttonNewBooking');
const bookedRoomOverview = document.getElementById('bookedRoomOverview');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const errorSpacer = document.getElementById('errorSpacer');
const listingsHeaderMessage = document.getElementById('listingsHeaderMessage');
const availableRoomsToBook = document.getElementById('availableRoomsToBook');
let userBookings = document.getElementById('userBookings');
let totalSpent = document.getElementById('totalSpent');

const hide = (array) => {
  array.forEach(element => element.classList.add('hidden'));
};
  
const show = (array) => {
  array.forEach(element => element.classList.remove('hidden'));
};

const showViewHome = () => {
  hide([viewCustomerDashboard, viewNewBooking, resultsFilter, viewSuccessfullyBookedRoom, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  show([viewHome, errorSpacer]);
};

const showCustomerDashboard = () => {
  hide([viewHome, viewNewBooking, resultsFilter, viewSuccessfullyBookedRoom, buttonCurrentBookings, loginErrorMessage]);
  show([viewCustomerDashboard, buttonHome, buttonNewBooking]);
};

const showViewNewBooking = () => {
  hide([listingsHeaderMessage, availableRoomsToBook, viewCustomerDashboard, viewHome, resultsFilter, viewSuccessfullyBookedRoom, buttonNewBooking]);
  show([viewNewBooking, buttonHome, buttonCurrentBookings, ]);
};

const showViewSuccessfullyBookedRoom = () => {
  hide([viewNewBooking, viewCustomerDashboard, viewHome, resultsFilter, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  show([viewSuccessfullyBookedRoom, buttonHome, buttonCurrentBookings, buttonNewBooking]);
  bookedRoomOverview.innerHTML = ``
};

const generateBookedRoomOverview = (pickedRoomNumber, pickedDate) => {
  bookedRoomOverview.innerHTML = showBookingDetails(pickedRoomNumber, pickedDate);
}

const uppercaseFirstLetter = (item) => {
  let phrase = item.split(" ").map((letter) => letter.charAt(0).toUpperCase() + letter.substring(1)).join(' ');
  return phrase;
};

const generateResult = (item) => {
  userBookings.innerHTML += showResult(item);
}; 

const showBookingDetails = (pickedRoomNumber, pickedDate) => {
  return `<h1>Congrats on booking your stay!</h1>
    <h2>Room Details:</h2>
    <section class="booked-room-details">
        Room Number: ${pickedRoomNumber}<br/>
        Booked Date: ${pickedDate}
    </section>
    <div class="bookingDetailsNavigation">
        <button class="nav-button" id="buttonSeeCurrentBookings">See All Current Bookings</button>
        <button class="nav-button" id="buttonCreateAnotherNewBooking">Create Another Booking</button>
    </div>`
};

const showResult = (item) => {
  return `<section class="currently-booked-room"> Date: ${item.date}<br/>
    Room Number: ${item.roomNumber}</section>`;
};

const showLoginErrorMessage = () => {
  show([loginErrorMessage]);
  hide([errorSpacer])
};

const clearUserBookingResults = () => {
  totalSpent.innerHTML = '';
  userBookings.innerHTML = '';
};

const displayTotalSpent = (totalCost) => {
  totalSpent.innerHTML = `Total Spent: $${totalCost.toFixed(2)}`
};

const clearAvailableRoomsToBook = () => {
  availableRoomsToBook.innerHTML = '';
};

const showRoom = (item, date, user) => {
  return `
    <section class="available-rooms-to-book">
    Room Number: ${item.number}<br/>
    Type: ${uppercaseFirstLetter(item.roomType)}<br/>
    Bed Size: ${uppercaseFirstLetter(item.bedSize)}<br/>
    Number of Beds: ${item.numBeds}<br/>
    Cost Per Night: $${item.costPerNight.toFixed(2)}<br/>
    Bidet: ${item.bidet ? "Yes" : "No"}<br/>
    <button data-user-id="${user.id}" data-picked-date="${date}" data-picked-room-number="${item.number}" class="nav-button" buttonBookStay>Book Room</button>
    </section>`
};

const showListingsMessageAndAvailableRoomsToBookView = () => {
  show([listingsHeaderMessage, availableRoomsToBook])
};

const showErrorListingsMessage = () => {
  listingsHeaderMessage.innerHTML = `I'm sorry, but there are no rooms available for that date. Please search another date.`
  availableRoomsToBook.innerHTML = '';
};

const showListingsMessageAndAvailableRoomsToBook = (room, date, user) => {
  show([resultsFilter]);
  listingsHeaderMessage.innerHTML = `Available Rooms To Book For The Selected Day:<br/>`
  availableRoomsToBook.innerHTML += showRoom(room, date, user);
};



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _images_IMG_3938_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _classes_Customers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _classes_Bookings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _classes_Rooms_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);








let customers;
let rooms;
let bookings;

Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_5__.customersAPI, _apiCalls__WEBPACK_IMPORTED_MODULE_5__.roomsAPI, _apiCalls__WEBPACK_IMPORTED_MODULE_5__.bookingsAPI]).then(data => {
  customers = data[0].customers.map(customer => new _classes_Customers_js__WEBPACK_IMPORTED_MODULE_2__.default(customer))
  rooms = data[1].rooms.map(room => new _classes_Rooms_js__WEBPACK_IMPORTED_MODULE_4__.default(room))
  bookings = data[2].bookings.map(booking => new _classes_Bookings_js__WEBPACK_IMPORTED_MODULE_3__.default(booking))
}).catch(error => console.log(error));

const buttonLogin = document.getElementById('buttonLogin');
const calendar = document.getElementById('calendar');
let user;
let currentDate = new Date().toJSON().slice(0, 10);
document.getElementById('calendar').setAttribute('value', currentDate);
document.getElementById('calendar').setAttribute('min', currentDate)


const loginUser = () => {
  let usernameInput = document.getElementById('username').value;
  let passwordInput = document.getElementById('password').value;
  let customerPhrase = usernameInput.substring(0, 8);
  let customerNumber = parseInt(usernameInput.substring(8, 10))
  if (customerPhrase === 'customer' && customerNumber > 0 && customerNumber < 51 && passwordInput === 'overlook2021') {
    user = customers[customerNumber - 1]
    showViewCustomerDashboard();
  } else {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.showLoginErrorMessage)();
  }
};

const bookRoom = (event) => {
  let userId = parseInt(event.target.dataset.userId, 10);
  let pickedDate = event.target.dataset.pickedDate.replace('-', '/').replace('-', '/');
  let pickedRoomNumber = parseInt(event.target.dataset.pickedRoomNumber, 10);
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_5__.updateBookingsAPI)(userId, pickedDate, pickedRoomNumber).then(data => {
    bookings.push(new _classes_Bookings_js__WEBPACK_IMPORTED_MODULE_3__.default(data.newBooking))
    ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.showViewSuccessfullyBookedRoom)();
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.generateBookedRoomOverview)(pickedRoomNumber, pickedDate);
    const buttonSeeCurrentBookings = document.getElementById('buttonSeeCurrentBookings');
    const buttonCreateAnotherNewBooking = document.getElementById('buttonCreateAnotherNewBooking');
    buttonSeeCurrentBookings.addEventListener('click', showViewCustomerDashboard);
    buttonCreateAnotherNewBooking.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_6__.showViewNewBooking);
  });
};

const showViewCustomerDashboard = () => {
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.showCustomerDashboard)();
  showBookings();
};

const newBookingsAPI = () => {
  return fetch('http://localhost:3001/api/v1/bookings').then(response => response.json());
};

const showBookings = () => {
  newBookingsAPI().then(response => {
    bookings = response.bookings.map(booking => new _classes_Bookings_js__WEBPACK_IMPORTED_MODULE_3__.default(booking))
    let userBookings = document.getElementById('userBookings');
    let totalSpent = document.getElementById('totalSpent');
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.clearUserBookingResults)();
    let result = bookings.filter(booking => booking.userID === user.id);
    result.sort((a, b) => a.date.localeCompare(b.date))
    result.forEach(item => {
      ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.generateResult)(item);
    })
    let totalUserCost = user.totalCost(result, rooms)
    ;(0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.displayTotalSpent)(totalUserCost);
  }).catch(error => console.log(error));
}

const selectDate = () => {
  let pickedUserDate = document.getElementById('calendar').value;
  let date = pickedUserDate.replace('-', '/').replace('-', '/');
  let resultsFilter = document.getElementById('resultsFilter');
  let filterSelector = resultsFilter.querySelector('input:checked');
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.clearAvailableRoomsToBook)();
  let result = rooms.filter(room => {
    let takenRooms = bookings.filter(booking => booking.roomNumber === room.number);
    return !takenRooms.find(room => {
      return room.date === date;
    });
  });
  if (filterSelector.value) {
    result = result.filter(room => {
      return room.roomType === filterSelector.value
    });
  }
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.showListingsMessageAndAvailableRoomsToBookView)();
  if (result.length === 0) {
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.showErrorListingsMessage)();
  } else {
    result.forEach(room => {
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_6__.showListingsMessageAndAvailableRoomsToBook)(room, date, user);
    });
  }
};

_domUpdates__WEBPACK_IMPORTED_MODULE_6__.buttonHome.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_6__.showViewHome);
_domUpdates__WEBPACK_IMPORTED_MODULE_6__.buttonCurrentBookings.addEventListener('click', showViewCustomerDashboard);
_domUpdates__WEBPACK_IMPORTED_MODULE_6__.buttonNewBooking.addEventListener('click', _domUpdates__WEBPACK_IMPORTED_MODULE_6__.showViewNewBooking);
buttonLogin.addEventListener('click', loginUser);
calendar.addEventListener('input', selectDate);
_domUpdates__WEBPACK_IMPORTED_MODULE_6__.resultsFilter.addEventListener('input', selectDate);
_domUpdates__WEBPACK_IMPORTED_MODULE_6__.availableRoomsToBook.addEventListener('click', bookRoom)

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map