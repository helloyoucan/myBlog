var domNav = document.getElementsByTagName('nav')[0];
m$.addEvent(window, 'scroll', function(e) {
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop > 200) {
		domBack_to_top.style.display = 'block';
		m$.addClass(domNav, 'show-bg')
	} else if(scrollTop < 200) {
		domBack_to_top.style.display = 'none';
		m$.removeClass(domNav, 'show-bg');
	}
});