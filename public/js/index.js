var domNav = document.getElementsByTagName('nav')[0],
    btn_get_more = m$.getById('btn-get-more'),
    articles_list = m$.getByClass('articles-list'),
    searchVal = m$.getById('searchVal'),
    searchAct = m$.getById('searchAct'),
    per_info = m$.getByClass('per-info')[0],
    tag_all = m$.getById('tag-all'),
    loading = m$.getById('loading'),
    page = {
        keyword: '',
        currentPage: 1,//当前页
        currentNum: 10,//每页数量
    };
m$.addEvent(window, 'scroll', function () {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 210) {
        domBack_to_top.style.display = 'block';
        per_info.style.position = 'fixed';
        per_info.style.top = '70px';
        m$.addClass(domNav, 'show-bg');
    } else if (scrollTop < 210) {
        domBack_to_top.style.display = 'none';
        per_info.style.position = 'relative';
        per_info.style.top = '0px';
        m$.removeClass(domNav, 'show-bg');
    }
});
m$.addEvent(btn_get_more, 'click', function () {
    page.currentPage++;
    getArticle();
});
m$.addEvent(tag_all, 'click', function () {
    searchVal.value = '';
    searchArticle();
});
m$.addEvent(searchVal,'keypress',function (e) {
    e = e||window.event;
    if(event.keyCode == 13){
        searchArticle();
    }
});
m$.addEvent(searchAct, 'click', searchArticle);
function searchArticle() {
    page = {
        keyword: searchVal.value,
        currentPage: 1,
        currentNum: 10,
    };
    getArticle(false);
}
function getArticle(isAppend) {
    isAppend = isAppend == undefined ? true : isAppend;
    if (!isAppend) {
        articles_list[0].getElementsByTagName('ul')[0].innerHTML = '';
    }
    loading.style.display = 'block';
    m$.post({
        url: '/article/list',
        data: page,
        success: function (response) {
            response = JSON.parse(response);
            if (response.isSuccess) {
                var htmlStr = '';
                response.articlesList.forEach(function (value, index, array) {
                    htmlStr += '<li><div class="article"><div class="a-title">' +
                        '<a href="/article/' + value._id + '">' + value.title + '</a>' +
                        '</div><div class="a-update-time">更新时间&nbsp;:&nbsp;' + value.meta.updateAt.toLocaleString().replace('T', ' ').slice(0, -5) +
                        '</div><div class="a-content"><p class="multi-line">' + value.preview +
                        '</p></div><div class="a-bottom">';
                    value.tags.forEach(function (value, index, array) {
                        htmlStr += '<span class="a-tag">' + value + '</span>';
                    });
                    htmlStr += '<span class="a-read">' + value.read + '</span>' + '</div></div></li>';
                });
                loading.style.display = 'none';
                articles_list[0].getElementsByTagName('ul')[0].insertAdjacentHTML('beforeend', htmlStr);
                if (response.articlesList.length < 10) {
                    btn_get_more.disabled = 'disabled';
                    btn_get_more.innerText = '已加载全部(' + response.list.total + '/' + response.list.total + ')'
                } else {
                    btn_get_more.disabled = false;
                    btn_get_more.innerText = '加载更多(' + articles_list[0].getElementsByTagName('li').length + '/' + response.list.total + ')';
                }
            }
        },
        error: function (response) {
            alert('获取文章失败！');
        }
    });
}