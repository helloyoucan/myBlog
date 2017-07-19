var comment = m$.getById('comment'),
    submitComment = m$.getById('submitComment');
m$.addEvent(comment, 'focus', function (e) {
    console.log(comment.value)
    if (e.target.value == "留言") {
        e.target.value = "";
    }
});
m$.addEvent(submitComment, 'click', function (e) {
    m$.post({
        url: '/submitComment',
        data: {
            comment: m$.getById('comment').value,
        },
        success: function (response) {
            console.log(response);
        },
        error: function (response) {
            console.log(response)
        }
    });
});