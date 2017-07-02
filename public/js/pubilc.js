var domBack_to_top = m$.getById('back-to-top');
var domBody = document.getElementsByTagName('body')[0];
m$.addEvent(window, 'scroll', function(e) {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop > 200) {
		domBack_to_top.style.display = 'block';
	} else if(scrollTop < 200) {
		domBack_to_top.style.display = 'none';
	}
});
//返回顶部
m$.addEvent(domBack_to_top, 'click', function() {
	var id = setInterval(function() {
		document.documentElement.scrollTop -= 10;
		document.body.scrollTop -= 10;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(scrollTop <= 0) {
			clearInterval(id);
		}
	}, 1);
})