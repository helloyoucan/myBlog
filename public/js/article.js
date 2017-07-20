var comment = m$.getById('comment'),
    submitComment = m$.getById('submitComment'),
    comment_tip = m$.getById('comment-tip'),
    comments_list = m$.getByClass('comments-list')[0],
    comment_item = m$.getByClass('comment-item'),
    a_comments = m$.getByClass('a-comments'),
    setTimeoutId = null;
//去掉默认的留言二字
m$.addEvent(comment, 'focus', function (e) {
    console.log(comment.value)
    if (e.target.value == "留言") {
        e.target.value = "";
    }
});
//去掉评论为空的提示
m$.addEvent(comment, 'change', function (e) {
    if (e.target.value != "") {
        comment_tip.style.display = "none";
    }
});
//添加评论
m$.addEvent(submitComment, 'click', function (e) {
    if (m$.getById('comment').value == '') {
        comment_tip.innerText = "评论内容不能为空！";
        comment_tip.style.display = "block";
        clearTimeout(setTimeoutId);
        setTimeoutId = setTimeout(function () {
            comment_tip.style.display = "none";
        }, 5000);
    } else {
        m$.post({
            url: '/submitComment',
            data: {
                articleId: e.target.attributes['data-id'].value,
                content: m$.getById('comment').value,
            },
            success: function (response) {
                response = JSON.parse(response);
                if (response.isSuccess) {
                    var divDom = document.createElement('div');
                    divDom.className = 'comment-item';
                    var divStr = document.createTextNode(comment_item.length + 1 + '楼   ' + response.results.time.replace('T', ' ').slice(0, -5));
                    divDom.appendChild(divStr);
                    var pDom = document.createElement('p');
                    var pStr = document.createTextNode(response.results.content);
                    pDom.appendChild(pStr);
                    divDom.appendChild(pDom);
                    comments_list.appendChild(divDom);
                    comments_list.getElementsByTagName('h3')[0].innerText = comment_item.length + "条留言";
                    a_comments[0].innerText = "评论 : " + comment_item.length;
                    comment_tip.innerText = "评论成功";
                    comment_tip.style.display = "block";
                    comment.value = '';
                    clearTimeout(setTimeoutId);
                    setTimeoutId = setTimeout(function () {
                        comment_tip.style.display = "none";
                    }, 5000);
                }
            },
            error: function (response) {
                comment_tip.innerText = "评论失败";
                comment_tip.style.display = "block";
                clearTimeout(setTimeoutId);
                setTimeoutId = setTimeout(function () {
                    comment_tip.style.display = "none";
                }, 5000);
            }
        });
    }
});