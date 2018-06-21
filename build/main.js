require('source-map-support/register')
module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_session2__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_session2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_koa_session2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_bodyparser__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa_logger__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_koa_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__routers__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__koa_cors__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__koa_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__koa_cors__);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2() {
    var _this = this;

    var app, host, port, router, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
            host = process.env.HOST || '127.0.0.1';
            port = process.env.PORT || 3000;

            // session必须在路由前注册

            app.use(__WEBPACK_IMPORTED_MODULE_3_koa_session2___default()({
              key: '12345',
              overwrite: true
            }));
            // 配置控制台日志中间件
            app.use(__WEBPACK_IMPORTED_MODULE_6_koa_logger___default()());
            app.use(__WEBPACK_IMPORTED_MODULE_8__koa_cors___default()());
            app.use(__WEBPACK_IMPORTED_MODULE_4_koa_bodyparser___default()());

            router = new __WEBPACK_IMPORTED_MODULE_5_koa_router___default.a();

            router.use('', __WEBPACK_IMPORTED_MODULE_7__routers__["a" /* default */].routes());
            app.use(router.routes()).use(router.allowedMethods());

            // Import and Set Nuxt.js options
            config = __webpack_require__(4);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context2.next = 17;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_2_nuxt__["Builder"](nuxt);
            _context2.next = 17;
            return builder.build();

          case 17:

            app.use(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return next();

                      case 2:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        ctx.req.session = ctx.session; // 必须将session添加进request中，否则nuxt的req获取不到session
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                          ctx.res.on('close', resolve);
                          ctx.res.on('finish', resolve);
                          nuxt.render(ctx.req, ctx.res, function (promise) {
                            // nuxt.render passes a rejected promise into callback on error.
                            promise.then(resolve).catch(reject);
                          });
                        }));

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());

            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

          case 20:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }










start();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-temp',
    meta: [{ charset: 'utf-8' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  css: [{ src: '~assets/css/main.css' }, { src: 'iview/dist/styles/iview.css' }],
  plugins: [{ src: '~plugins/flexible.js', ssr: false }, { src: '~plugins/iview.js', ssr: true }],
  loading: './components/loading.vue',
  cache: {
    max: 1000,
    maxAge: 900000
  },
  router: {
    middleware: 'route' // 在每页渲染前运行 middleware/route.js 中间件的逻辑
  },
  build: {
    vendor: ['axios', 'iview', './plugins/iview.js'],
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-session2");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller_user__ = __webpack_require__(11);


var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

router.get('/api/user', __WEBPACK_IMPORTED_MODULE_1__controller_user__["c" /* userinfo */]);
router.post('/api/login', __WEBPACK_IMPORTED_MODULE_1__controller_user__["a" /* login */]);
router.post('/api/logout', __WEBPACK_IMPORTED_MODULE_1__controller_user__["b" /* logout */]);
router.get('/api/logout', __WEBPACK_IMPORTED_MODULE_1__controller_user__["b" /* logout */]);

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return userinfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return logout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios_mock_adapter__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_axios_mock_adapter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_axios_mock_adapter__);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





var mock = new __WEBPACK_IMPORTED_MODULE_3_axios_mock_adapter___default.a(__WEBPACK_IMPORTED_MODULE_1_axios___default.a);
mock.onPost(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].base_url + '/api/v1.user/login').reply(function (config) {
  return [200, { 'ret': 200, 'msg': '请求成功', 'data': { 'code': 0, 'message': '登录成功', 'token': 'PhU0Sd9zwUSwOQgXnJpj7pgSwdA7YD80', 'id': 1, 'mobile': '13770267077', 'name': '大鹏', 'sex': 1, 'status': 1, 'role_id': 1, 'depart_id': 1, 'leader_id': 0 } }];
});

var userinfo = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
    var token;
    return __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = ctx.session.user.token || '';
            return _context.abrupt('return', ctx.body = {
              ret: 200,
              msg: '获取成功',
              data: { token: token }
            });

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function userinfo(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var login = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
    var _ctx$request$body, mobile, psd, _url, req, ret, msg, code, message, token, signkey, info, session;

    return __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ctx$request$body = ctx.request.body, mobile = _ctx$request$body.mobile, psd = _ctx$request$body.psd;

            if (!(!mobile || !psd)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt('return', ctx.body = {
              ret: 303,
              msg: '缺少请求参数',
              data: {}
            });

          case 3:

            // 发起请求
            _url = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].base_url + '/api/v1.user/login';
            _context2.next = 6;
            return __WEBPACK_IMPORTED_MODULE_1_axios___default.a.post(_url, {
              mobile: mobile,
              psd: psd,
              sign: ''
            });

          case 6:
            req = _context2.sent;

            if (!(req.status !== 200)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt('return', ctx.body = {
              ret: 400,
              msg: '网络通讯异常',
              data: {}
            });

          case 9:
            if (!(req.data.ret !== 200)) {
              _context2.next = 13;
              break;
            }

            ret = req.data.ret || 400;
            msg = req.data.msg || '失败';
            return _context2.abrupt('return', ctx.body = {
              ret: ret,
              msg: msg,
              data: {}
            });

          case 13:
            if (!(req.data.data.code !== 0)) {
              _context2.next = 17;
              break;
            }

            code = req.data.data.code || -1;
            message = req.data.data.message || '登录失败';
            return _context2.abrupt('return', ctx.body = {
              ret: 200,
              msg: '请求成功',
              data: {
                code: code,
                message: message
              }
            });

          case 17:

            // 登陆成功
            token = req.data.data.token;
            signkey = __WEBPACK_IMPORTED_MODULE_2__config__["a" /* default */].sign_key;
            info = {
              id: req.data.data.id,
              mobile: req.data.data.mobile,
              name: req.data.data.name,
              sex: req.data.data.sex,
              status: req.data.data.status,
              role_id: req.data.data.role_id,
              depart_id: req.data.data.depart_id,
              deader_id: req.data.data.deader_id
            };
            session = ctx.session;

            session.user = {
              token: token,
              sign_key: signkey,
              info: info
            };
            ctx.session = session;

            return _context2.abrupt('return', ctx.body = {
              ret: 200,
              msg: '请求成功',
              data: {
                code: 0,
                message: '登录成功',
                token: token,
                info: info
              }
            });

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function login(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var logout = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.mark(function _callee3(ctx, next) {
    return __WEBPACK_IMPORTED_MODULE_0_E_node_nuxt_demo_node_modules_babel_runtime_6_26_0_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            ctx.session.user = null;
            return _context3.abrupt('return', ctx.body = {
              ret: 200,
              msg: '请求成功',
              data: {
                code: 0,
                message: '退出成功'
              }
            });

          case 5:
            _context3.prev = 5;
            _context3.t0 = _context3['catch'](0);
            return _context3.abrupt('return', ctx.body = {
              ret: 200,
              msg: '请求成功',
              data: {
                code: -1,
                message: '退出失败'
              }
            });

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[0, 5]]);
  }));

  return function logout(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var config = {
  base_url: 'https://crmback.tiaoweilian.com',
  sign_key: 'RFHIJUGVCFTRQKJMJKNHGBIOJUHGBNFG'
};

/* harmony default export */ __webpack_exports__["a"] = (config);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("axios-mock-adapter");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("@koa/cors");

/***/ })
/******/ ]);
//# sourceMappingURL=main.map