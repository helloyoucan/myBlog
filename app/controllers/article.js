exports.article = function (req, res) {
    res.render('article', {
        title: '文章名',
        article: {
            title: '文章标题',
            tags: ['文章标签1', '文章标签'],
            update: '2016.05.12 05:56',
            read: 56,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex quidem porro numquam sapiente nobis aliquid neque et vel quis eos debitis excepturi. Distinctio nam qui vero eligendi perferendis facilis.',
            comments: [
                {
                    time: '2017.05.21 12:25',
                    content: '留言内容1'
                },
                {
                    time: '2017.05.21 12:25',
                    content: '留言内容2'
                }],
            related_articles: [
                {
                    id: '001',
                    title: '推荐文章推荐文章推荐文章推荐文章推荐文章推荐文章推荐文章',
                }, {
                    id: '001',
                    title: '推荐文章',
                }],
        },
    });
}