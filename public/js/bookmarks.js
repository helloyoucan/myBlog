var domTree = document.getElementById('tree'),
	domCloseTree = document.getElementById('close-tree'),
	domTab = document.getElementById('tab');
//点击树节点
m$.addEvent(domTree, 'click', function(event) {
	var e = event || window.event;
	if(e.target.className.indexOf('tree-node') > -1) {
		var liDom = e.target.parentNode;
		var activeDoms = m$.getByClass('active', domTree);
		if(liDom.className.indexOf('active') >= 0) {
			//如果被点击的节点的父元素节点原来就有active
			m$.removeClass(activeDoms, 'active');
		} else {
			m$.removeClass(activeDoms, 'active');
			m$.addClass(liDom, 'active');
		}
		while(liDom.parentNode && liDom.parentNode.parentNode.nodeName == "LI") {
			liDom = liDom.parentNode.parentNode;
			m$.addClass(liDom, 'active');
		}
		console.log(e.target.innerText+'***');
	} else if(e.target.id == 'close-tree') {
		domTree.style.display = "none";
		domCloseTree.style.display = "none";
	}
});
//点击标签
m$.addEvent(domTab, 'click', function(e) {
	if(window.outerWidth <= 700) {
		domTree.style.display = "block";
		domCloseTree.style.display = "block";
	}
});
//监听resize事件
m$.addEvent(window, 'resize', function() {
	if(window.outerWidth <= 700 && domTree.style.display == 'block') {
		domTree.style.display = "none";
		domCloseTree.style.display = "none";
	} else if(window.outerWidth > 700 && domTree.style.display == "none") {
		domTree.style.display = "block";
		domCloseTree.style.display = "none";
	}
});