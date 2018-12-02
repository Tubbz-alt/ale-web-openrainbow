/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Factories/RainbowServiceFactory.ts":
/*!************************************************!*\
  !*** ./src/Factories/RainbowServiceFactory.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst RainbowService_1 = __webpack_require__(/*! ../Services/RainbowService */ \"./src/Services/RainbowService.ts\");\r\nclass RainbowServiceFactory {\r\n    constructor() {\r\n        this._appId = '';\r\n        this._appSecret = '';\r\n        this._verbose = false;\r\n    }\r\n    get appId() { return this._appId; }\r\n    set appId(appId) { this._appId = appId; }\r\n    get appSecret() { return this._appSecret; }\r\n    set appSecret(appSecret) { this._appSecret = appSecret; }\r\n    set verbose(verbose) { this._verbose = verbose; }\r\n    make() {\r\n        return new RainbowService_1.RainbowService(this._appId, this._appSecret);\r\n    }\r\n}\r\nexports.RainbowServiceFactory = RainbowServiceFactory;\r\n\n\n//# sourceURL=webpack:///./src/Factories/RainbowServiceFactory.ts?");

/***/ }),

/***/ "./src/Helpers/DomHelper.ts":
/*!**********************************!*\
  !*** ./src/Helpers/DomHelper.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass DomHelper {\r\n    getBrowser() {\r\n        if (navigator.userAgent.indexOf(\"Chrome\") != -1) {\r\n            return \"Chrome\";\r\n        }\r\n        else if (navigator.userAgent.indexOf(\"Opera\") != -1) {\r\n            return \"Opera\";\r\n        }\r\n        else if (navigator.userAgent.indexOf(\"MSIE\") != -1) {\r\n            return \"IE\";\r\n        }\r\n        else if (navigator.userAgent.indexOf(\"Firefox\") != -1) {\r\n            return \"Firefox\";\r\n        }\r\n        else {\r\n            return \"unknown\";\r\n        }\r\n    }\r\n    isChrome() {\r\n        return this.getBrowser() == \"Chrome\";\r\n    }\r\n    isFirefox() {\r\n        return this.getBrowser() == \"Firefox\";\r\n    }\r\n}\r\nexports.DomHelper = DomHelper;\r\n\n\n//# sourceURL=webpack:///./src/Helpers/DomHelper.ts?");

/***/ }),

/***/ "./src/Services/DatabaseService.ts":
/*!*****************************************!*\
  !*** ./src/Services/DatabaseService.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass DatabaseService {\r\n    getItem(key) {\r\n        return localStorage.getItem(key);\r\n    }\r\n    getItemJSON(key) {\r\n        let obj = this.getItem(key);\r\n        if (obj) {\r\n            return JSON.parse(obj);\r\n        }\r\n        return null;\r\n    }\r\n    setItem(key, dados) {\r\n        localStorage.setItem(key, dados);\r\n    }\r\n    setItemJSON(key, dados) {\r\n        this.setItem(key, JSON.stringify(dados));\r\n    }\r\n    removeItem(key) {\r\n        localStorage.removeItem(key);\r\n    }\r\n}\r\nexports.DatabaseService = DatabaseService;\r\n\n\n//# sourceURL=webpack:///./src/Services/DatabaseService.ts?");

/***/ }),

/***/ "./src/Services/HttpService.ts":
/*!*************************************!*\
  !*** ./src/Services/HttpService.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nclass HttpService {\r\n    _handleErrors(res) {\r\n        if (!res.ok)\r\n            throw new Error(res.statusText);\r\n        return res;\r\n    }\r\n    get(url) {\r\n        return fetch(url)\r\n            .then(res => this._handleErrors(res));\r\n    }\r\n    getJSON(url) {\r\n        return fetch(url)\r\n            .then(res => this._handleErrors(res))\r\n            .then(res => res.json());\r\n    }\r\n    post(url, data, options) {\r\n        let optionsPost = {\r\n            method: 'POST',\r\n            body: data\r\n        };\r\n        if (options) {\r\n            optionsPost = Object.assign(optionsPost, options);\r\n        }\r\n        return fetch(url, optionsPost)\r\n            .then(res => this._handleErrors(res));\r\n    }\r\n    postJSON(url, data, options) {\r\n        return this.post(url, data, options)\r\n            .then(res => {\r\n            debugger;\r\n            return res.json();\r\n        });\r\n    }\r\n}\r\nexports.HttpService = HttpService;\r\n//window.HttpService = HttpService;\r\n\n\n//# sourceURL=webpack:///./src/Services/HttpService.ts?");

/***/ }),

/***/ "./src/Services/RainbowService.ts":
/*!****************************************!*\
  !*** ./src/Services/RainbowService.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst polyfill_1 = __webpack_require__(/*! ../polyfill */ \"./src/polyfill.ts\");\r\nconst DomHelper_1 = __webpack_require__(/*! ../Helpers/DomHelper */ \"./src/Helpers/DomHelper.ts\");\r\nclass RainbowService {\r\n    constructor(_appId, _appSecret) {\r\n        this._appId = _appId;\r\n        this._appSecret = _appSecret;\r\n        this._isLogged = false;\r\n        this._isStarted = false;\r\n        this._verbose = false;\r\n        this.domHelper = new DomHelper_1.DomHelper();\r\n        this._listener = null;\r\n    }\r\n    get isLogged() { return this._isLogged; }\r\n    set isLogged(isLogged) { this._isLogged = isLogged; }\r\n    get isStarted() { return this._isStarted; }\r\n    set isStarted(isStarted) { this._isStarted = isStarted; }\r\n    set verbose(verbose) { this._verbose = verbose; }\r\n    init() {\r\n        // Listen to the SDK event RAINBOW_ONREADY \r\n        $(document).on(rainbowSDK.RAINBOW_ONREADY, this._onReady.bind(this));\r\n        // Listen to the SDK event RAINBOW_ONLOADED \r\n        $(document).on(rainbowSDK.RAINBOW_ONLOADED, this._onLoaded.bind(this));\r\n        // Listen when the SDK is signed\r\n        $(document).on(rainbowSDK.connection.RAINBOW_ONSIGNED, this._onSigned.bind(this));\r\n        // Listen when the SDK is started\r\n        $(document).on(rainbowSDK.connection.RAINBOW_ONSTARTED, this._onStarted.bind(this));\r\n        //Subscribe to Rainbow connection change\r\n        $(document).on(rainbowSDK.connection.RAINBOW_ONCONNECTIONSTATECHANGED, this._onConnectionStateChangeEvent.bind(this));\r\n        // Subscribe to WebRTC call change\r\n        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCCALLSTATECHANGED, this._onWebRTCCallChanged.bind(this));\r\n        $(document).on(rainbowSDK.webRTC.RAINBOW_ONWEBRTCERRORHANDLED, (__event, error) => {\r\n            console.error(\"[ServiceRainbow][rainbowSDK][RAINBOW_ONWEBRTCERRORHANDLED] - \", __event, error);\r\n        });\r\n        _onStarted(event, account);\r\n        {\r\n            console.log('[ServiceRainbow][_onStarted]', account);\r\n        }\r\n        ;\r\n        /**\r\n         * Callback for handling the event 'RAINBOW_ONREADY'\r\n         */\r\n        _onReady();\r\n        {\r\n            console.log('[ServiceRainbow][_onReady] :: On SDK Ready !');\r\n            this.isStarted = true;\r\n            let acesso = this._serviceDatabase.getAcesso();\r\n            if (acesso) {\r\n                this.signout();\r\n            }\r\n            this.login('user@vstelecom.com.br', '@Vstelecom2018');\r\n        }\r\n        /**\r\n         * Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED'\r\n         */\r\n        _onLoaded();\r\n        {\r\n            console.log('[ServiceRainbow][_onLoaded] :: On SDK Loaded !');\r\n            // Activate full SDK log\r\n            rainbowSDK.setVerboseLog(true);\r\n            rainbowSDK\r\n                .initialize(this._applicationID, this._applicationSecret)\r\n                .then(function () {\r\n                console.log('[ServiceRainbow][_onLoaded][rainbowSDK - initialize] :: Rainbow SDK is initialized!');\r\n            })\r\n                .catch(function (err) {\r\n                console.log('[ServiceRainbow][_onLoaded][rainbowSDK - initialize] :: Something went wrong with the SDK...');\r\n                console.error('[ERROR] :: Something went wrong with the SDK...', err);\r\n            });\r\n        }\r\n        _onSigned(event, account);\r\n        {\r\n            console.log('[ServiceRainbow][_onSigned]', account);\r\n        }\r\n        _onConnectionStateChangeEvent(event, status);\r\n        {\r\n            switch (status) {\r\n                case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:\r\n                    // The state of the connection has changed to \"connected\" which means that your application is now connected to Rainbow\r\n                    console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONCONNECTED]');\r\n                    break;\r\n                case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:\r\n                    // The state of the connection is now in progress which means that your application try to connect to Rainbow\r\n                    console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONINPROGRESS]');\r\n                    break;\r\n                case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:\r\n                    // The state of the connection changed to \"disconnected\" which means that your application is no more connected to Rainbow\r\n                    console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONDISCONNECTED]');\r\n                    break;\r\n                default:\r\n                    break;\r\n            }\r\n            ;\r\n        }\r\n    }\r\n    _onStarted(event, account) {\r\n        this.logInfo('[ServiceRainbow][_onStarted]', account);\r\n        if (this._listener != null)\r\n            this._listener.onStarted(event, account);\r\n    }\r\n    /**\r\n     * Callback for handling the event 'RAINBOW_ONREADY'\r\n     */\r\n    _onReady() {\r\n        console.log('[ServiceRainbow][_onReady] :: On SDK Ready !');\r\n        this.isStarted = true;\r\n        let acesso = this._serviceDatabase.getAcesso();\r\n        if (acesso) {\r\n            this.signout();\r\n        }\r\n        this.login('user@vstelecom.com.br', '@Vstelecom2018');\r\n    }\r\n    /**\r\n     * Callback for handling the event 'RAINBOW_ONCONNECTIONSTATECHANGED'\r\n     */\r\n    _onLoaded() {\r\n        console.log('[ServiceRainbow][_onLoaded] :: On SDK Loaded !');\r\n        // Activate full SDK log\r\n        rainbowSDK.setVerboseLog(true);\r\n        rainbowSDK\r\n            .initialize(this._applicationID, this._applicationSecret)\r\n            .then(function () {\r\n            console.log('[ServiceRainbow][_onLoaded][rainbowSDK - initialize] :: Rainbow SDK is initialized!');\r\n        })\r\n            .catch(function (err) {\r\n            console.log('[ServiceRainbow][_onLoaded][rainbowSDK - initialize] :: Something went wrong with the SDK...');\r\n            console.error('[ERROR] :: Something went wrong with the SDK...', err);\r\n        });\r\n    }\r\n    _onSigned(event, account) {\r\n        console.log('[ServiceRainbow][_onSigned]', account);\r\n    }\r\n    _onConnectionStateChangeEvent(event, status) {\r\n        switch (status) {\r\n            case rainbowSDK.connection.RAINBOW_CONNECTIONCONNECTED:\r\n                // The state of the connection has changed to \"connected\" which means that your application is now connected to Rainbow\r\n                console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONCONNECTED]');\r\n                break;\r\n            case rainbowSDK.connection.RAINBOW_CONNECTIONINPROGRESS:\r\n                // The state of the connection is now in progress which means that your application try to connect to Rainbow\r\n                console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONINPROGRESS]');\r\n                break;\r\n            case rainbowSDK.connection.RAINBOW_CONNECTIONDISCONNECTED:\r\n                // The state of the connection changed to \"disconnected\" which means that your application is no more connected to Rainbow\r\n                console.log('[ServiceRainbow][_onConnectionStateChangeEvent][RAINBOW_CONNECTIONDISCONNECTED]');\r\n                break;\r\n            default:\r\n                break;\r\n        }\r\n        ;\r\n    }\r\n    logInfo(title, msg) {\r\n        let msgExibir = `${title}`;\r\n        if (typeof msg == \"undefined\") {\r\n            console.info(msgExibir);\r\n            return;\r\n        }\r\n        if (polyfill_1.is_scalar(msg)) {\r\n            msgExibir = `${msgExibir} - ${msg}`;\r\n            console.info(msgExibir);\r\n        }\r\n        else {\r\n            console.info(title, msg);\r\n        }\r\n    }\r\n}\r\nexports.RainbowService = RainbowService;\r\n\n\n//# sourceURL=webpack:///./src/Services/RainbowService.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nfunction __export(m) {\r\n    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];\r\n}\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\n__export(__webpack_require__(/*! ./polyfill */ \"./src/polyfill.ts\"));\r\nconst HttpService_1 = __webpack_require__(/*! ./Services/HttpService */ \"./src/Services/HttpService.ts\");\r\nconst DatabaseService_1 = __webpack_require__(/*! ./Services/DatabaseService */ \"./src/Services/DatabaseService.ts\");\r\nconst RainbowServiceFactory_1 = __webpack_require__(/*! ./Factories/RainbowServiceFactory */ \"./src/Factories/RainbowServiceFactory.ts\");\r\nwindow['HttpService'] = HttpService_1.HttpService;\r\nwindow['DatabaseService'] = DatabaseService_1.DatabaseService;\r\nwindow['RainbowServiceFactory'] = RainbowServiceFactory_1.RainbowServiceFactory;\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/polyfill.ts":
/*!*************************!*\
  !*** ./src/polyfill.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nfunction is_scalar(mixedVar) {\r\n    //  discuss at: http://locutus.io/php/is_scalar/\r\n    // original by: Paulo Freitas\r\n    //   example 1: is_scalar(186.31)\r\n    //   returns 1: true\r\n    //   example 2: is_scalar({0: 'Kevin van Zonneveld'})\r\n    //   returns 2: false\r\n    return (/boolean|number|string/).test(typeof mixedVar);\r\n}\r\nexports.is_scalar = is_scalar;\r\n//Polyfill\r\nif (!Array.isArray) {\r\n    Array.prototype['isArray'] = function (arg) {\r\n        return Object.prototype.toString.call(arg) === '[object Array]';\r\n    };\r\n}\r\n\n\n//# sourceURL=webpack:///./src/polyfill.ts?");

/***/ })

/******/ });