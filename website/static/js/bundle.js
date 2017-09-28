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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../css/style.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

(function($){
	$(function () {
		var $main = $("#content");
		var $nav = $("nav");

		var $nav_a = $nav.find('a');

		var scrollexSettings = {
			mode : 'top',
			enter : function() { $nav.addClass('alt'); },
			leave : function() { $nav.removeClass('alt'); }
		};

		var clickHandler = function() {
		var $this = $(this);

		$nav_a
			.removeClass('active')
			.removeClass('active-locked');

		$this
			.removeClass('active')
			.removeClass('active-locked');
		};

		$main.scrollex(scrollexSettings);

		$nav_a
			.on('click', clickHandler)
			.each(function() {
				var $this = $(this);
				var $section = $($this.attr('href'));

				var enterHandler = function() {
				$section.removeClass('inactive');

				if($nav_a.filter('.active-locked').length === 0){
					$nav_a.removeClass('active');
					$this.addClass('active');

				} else if ($this.hasClass('active-locked')) {
					$this.removeClass('active-locked');
				}
			};

			var scrollexSettings = {
				mode : 'middle',
				enter : enterHandler,
			};

			$section.scrollex(scrollexSettings);
		});
	});
})(jQuery);


/***/ })
/******/ ]);