var comment = m$.getById('comment'),
    submitComment = m$.getById('submitComment');
m$.addEvent(comment, 'focus', function (e) {
    if (e.target.textContent == "留言") {
        e.target.textContent = "";
    }
});
m$.addEvent(submitComment, 'click', function (e) {
    m$.ajax({
        type: 'post',
        url: '/submitComment',
        data: '',
        success: function (response) {
            console.log(response)
        },
        error: function (response) {
            console.log(response)
        }
    });
});