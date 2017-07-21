var domNav = document.getElementsByTagName('nav')[0],
    btn_get_more = m$.getById('btn-get-more'),
    articles_list = m$.getByClass('articles-list');
m$.addEvent(window, 'scroll', function (e) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 200) {
        domBack_to_top.style.display = 'block';
        m$.addClass(domNav, 'show-bg')
    } else if (scrollTop < 200) {
        domBack_to_top.style.display = 'none';
        m$.removeClass(domNav, 'show-bg');
    }
});
m$.addEvent(btn_get_more, 'click', function (e) {
    m$.post({
        url: '/article/list',
        data: {
            keyword: "",
            currentPage: 2,//当前页
            currentNum: 10,//每页数量
        },
        success: function (response) {
            response = JSON.parse(response);
            if (response.isSuccess) {
                var htmlStr = '';
                response.articlesList.forEach(function (value, index, array) {
                    console.log(value)
                    htmlStr += '<li><div class="article"><div class="a-title">' +
                        '<a href="/article/' + value._id + '">' + value.title + '</a>' +
                        '</div><div class="a-update-time">更新时间&nbsp;:&nbsp;' + value.meta.updateAt.toLocaleString() +
                        '</div><div class="a-content"><p class="multi-line">' + value.preview +
                        '</p></div><div class="a-bottom">';
                    value.tags.forEach(function (value, index, array) {
                        htmlStr += '<span class="a-tag">' + value + '</span>';
                    });
                    htmlStr += '<span class="a-read">' + value.read + '</span>' + '</div></div></li>';
                });
                articles_list[0].getElementsByTagName('ul')[0].insertAdjacentHTML('beforeend', htmlStr);
                if (response.articlesList.length < 10) {
                    btn_get_more.disabled = 'disabled';
                    btn_get_more.innerText = '已加载全部(' + response.list.total + '/' + response.list.total + ')'
                } else {
                    btn_get_more.innerText = '已加载全部(' + articles_list[0].getElementsByTagName('li').length + '/' + response.list.total + ')';
                }
            }
        },
        error: function (response) {
        }
    });
});