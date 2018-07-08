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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vue__ = __webpack_require__(1);

new __WEBPACK_IMPORTED_MODULE_0__Vue__["a" /* default */]({
	el:'#app',
	data:{
		message:'vue实现双向数据绑定'
	}
})

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Observer__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Complier__ = __webpack_require__(4);


class Vue {
	constructor(options){
		this.$options=options
		this.$el=this.$options.el
		this._data=this.$options.data
		Object.keys(this._data).forEach(key=>{
			this._proxy(key)
		})
		new __WEBPACK_IMPORTED_MODULE_0__Observer__["a" /* default */](this._data)
		new __WEBPACK_IMPORTED_MODULE_1__Complier__["a" /* default */](this.$el,this)
	}
	_proxy(key){
		var self=this
		Object.defineProperty(this,key,{
			get(){
				return self._data[key]
			},
			set(value){
				self._data[key]=value
			}
		})
	}
}
/* harmony default export */ __webpack_exports__["a"] = (Vue);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(3);

class Observer {
	constructor(data){
		this.data=data
		Object.keys(this.data).forEach(key=>{
			this._bind(data,key,data[key])
		}) 
	} 
	_bind(data,key,val){
			var myDep=new __WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */]()
			Object.defineProperty(data,key,{
				get(){
					if(__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target) myDep.listen(__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target)
					return val 
				},
				set(newValue){
					if(newValue===val)return 
					val=newValue
					myDep.notify()
				}
			})
		}
}
/* harmony default export */ __webpack_exports__["a"] = (Observer);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//发布订阅模块
class Dep{
	constructor(){
		this.list=[]
	}
	listen(subs){
		this.list.push(subs)
	}
	notify(){
		for(var i=0;i<this.list.length;i++){
			this.list[i].update()
		}
	}
}
/* harmony default export */ __webpack_exports__["a"] = (Dep);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Watcher__ = __webpack_require__(5);

const Reg=/\{\{(.*)\}\}/
class Complier{
	constructor(el,vm){
		this.el=document.querySelector(el)
		this.vm=vm
		this.flag=this._createFragment()
		this.el.appendChild(this.flag)
	}
	_createFragment(){
		var flag=document.createDocumentFragment()
		var child
		while(child=this.el.firstChild){
			this._complie(child)
			flag.appendChild(child)
		}
		return flag
	}
	_complie(node){
		if(node.nodeType===1){
			var attr=node.attributes
			var self=this
			if(attr.hasOwnProperty('v-model')){
				var name=attr['v-model'].nodeValue
				node.addEventListener('input',function(e){
					self.vm[name]=e.target.value
				})
				node.value=this.vm[name]
			}	 
		}
		if(node.nodeType===3){
			if(Reg.test(node.nodeValue)){
				var name=RegExp.$1
				name=name.trim()
				new __WEBPACK_IMPORTED_MODULE_0__Watcher__["a" /* default */](node,name,this.vm)
			}
		}
	}
}
/* harmony default export */ __webpack_exports__["a"] = (Complier);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Dep__ = __webpack_require__(3);

class Watcher {
	constructor(node,name,vm){
		this.node=node
		this.name=name
		this.vm=vm
		__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target=this
		this.update()
		__WEBPACK_IMPORTED_MODULE_0__Dep__["a" /* default */].target=null
	}
	update(){
		this.node.nodeValue=this.vm[this.name]
	}
}
/* harmony default export */ __webpack_exports__["a"] = (Watcher);

/***/ })
/******/ ]);