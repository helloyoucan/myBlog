var m$ = {
	getById: function(id, parent) {
		parent = parent || document;
		return parent.getElementById(id);
	},
	getByClass: function(className, parent) {
		parent = parent || document;
		if(parent.getElementsByClassName) {
			return parent.getElementsByClassName(className);
		} else {
			var tag = parent.getElementsByTagName('*'); //获取指定元素
			var tagAll = []; //用于存储符合条件的元素
			for(var i = 0; i < tag.length; i++) { //遍历获得的元素
				for(var j = 0, n = tag[i].className.split(' '); j < n.length; j++) { //遍历此元素中所有class的值，如果包含指定的类名，就赋值给tagnameAll
					if(n[j] == className) {
						tagAll.push(tag[i]);
						break;
					}
				}
			}
			return tagAll;
		}
	},
	addClass: function(dom, className) {
		if(dom && dom.length) {
			for(var i = dom.length - 1; i >= 0; i--) {
				(function(i) {
					var oldClass = dom[i].className;
					if(oldClass.indexOf(className) < 0) {
						dom[i].className = (oldClass + ' ' + className).replace("  ", "").replace(/(^\s*)|(\s*$)/g, '');
					}
				})(i)
			}
		} else {
			var oldClass = dom.className || '';
			if(oldClass.indexOf(className) < 0) {
				dom.className = (oldClass + ' ' + className).replace("  ", "").replace(/(^\s*)|(\s*$)/g, '');;
			}
		}

	},
	removeClass: function(dom, className) {
		if(dom && dom.length) {
			for(var i = dom.length - 1; i >= 0; i--) {
				(function(i) {
					var oldClass = dom[i].className;
					var index = oldClass.indexOf(className);
					if(index > -1) {
						dom[i].className = oldClass.replace(className, '').replace("  ", "").replace(/(^\s*)|(\s*$)/g, '');
					}
				})(i)
			}
		} else {
			var oldClass = dom.className || '';
			var index = oldClass.indexOf(className);
			if(index > -1) {
				dom.className = oldClass.replace(className, '').replace("  ", "").replace(/(^\s*)|(\s*$)/g, '');
			}
		}
	},
	addEvent: function(dom, type, fn) {
		if(dom && dom.length) {
			var i = 0;
			if(dom[0].addEventListener) {
				for(i = dom.length; i >= 0; i--) {
					(function(i) {
						dom[i].addEventListener(type, fn, false); /*DOM2级事件处理*/
					})(i)
				}
			} else if(dom[0].attachEvent) {
				for(i = dom.length; i >= 0; i--) {
					(function(i) {
						dom[i].attachEvent('on' + type, fn); /*IE事件处理*/
					})(i)
				}

			} else {
				for(i = dom.length; i >= 0; i--) {
					(function(i) {
						dom[i]['on' + type] = fn;
					})(i)
				}

			}

		} else {
			if(dom.addEventListener) {
				dom.addEventListener(type, fn, false); /*DOM2级事件处理*/
			} else if(dom.attachEvent) {
				dom.attachEvent('on' + type, fn); /*IE事件处理*/
			} else {
				dom['on' + type] = fn;
			}

		}

	},
	removeEvent: function(dom, type, fn) {
		if(dom && dom.length) {
			var i = 0;
			if(dom[0].removeEventListener) {
				for(i = dom.length; i >= 0; i--) {
					(function(i) {
						dom[i].removeEventListener(type, fn, false); /*DOM2级事件处理*/
					})(i)
				}
			} else if(dom[0].detchEvent) {
				for(i = dom.length; i >= 0; i--) {
					(function(i) {
						dom[i].detchEvent('on' + type, fn); /*IE事件处理*/
					})(i)
				}

			} else {
				for(i = dom.length; i >= 0; i--) {
					(function(i) {
						dom[i]['on' + type] = fn;
					})(i)
				}

			}

		} else {
			if(dom.removeEventListener) {
				dom.removeEventListener(type, fn, false); /*DOM2级事件处理*/
			} else if(dom.detchEvent) {
				dom.detchEvent('on' + type, fn); /*IE事件处理*/
			} else {
				dom['on' + type] = fn;
			}

		}

	},
	/**
	 * type:String,"get"/"post",default:"get"
	 * url:String,
	 * dataType:string,"json"/"string",default:json
	 * data:JSON/"String"
	 * asyn:boolen,true/false,default:true
	 * contentType:"text/html; chartset=iso-8859-1"
	 * success:Function
	 * error:Function
	 * */
	ajax: function(opts) {
		var _opts = {
			type: "get",
			dataType: "josn",
			asyn: true
		}
		for(o in opts) {
			_opts[o] = opts[o];
		}
		_opts.type = _opts.type.toLowerCase();
		_opts.dataType = _opts.dataType.toLowerCase();
		if(_opts.dataType = 'json') {
			_opts.data = JOSN.stringify(_opts.data)
		}
		console.log(_opts)
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
					_opts.success || _opts.success(xhr.responseText);
				} else {
					console.error(xhr.status);
					_opts.error || _opts.error(xhr);
				}
			}
		}
		xhr.open(_opts.type, _opts.url, _opts.asyn);
		if(_opts.contentType) {
			xhr.setRequestHeader("Content-type", _opts.contentType);
		}
		xhr.send(_opts.data);
	},
	stopBubble: function(event, fn) { //阻止事件冒泡
		var e = event || window.event;
		if(e && e.stopPropagation) {
			e.stopPropagation();
			fn();
		} else { //IE
			e.cancelBubble = true;
			fn();
		}
	},
	stopDefault: function(e, fn) { //阻止事件默认行为
		var e = event || window.event;
		// 阻止默认浏览器动作(W3C)
		if(e && e.preventDefault) {
			e.preventDefault();
			fn();
		} else {
			// IE中阻止函数器默认动作的方式
			window.event.returnValue = false;
			fn();
		}
		return false;

	}
}