const commentsController = require('../controllers/comments');

module.exports = (router) => {
    router.post('/comment', commentsController.addComment);
    router.post('/comment/:id/upvote', commentsController.upvoteComment);
    router.post('/comment/:id/reply', commentsController.addReply);
    router.get('/comments', commentsController.getComments);
    router.get('/replies', commentsController.getReplies);
};
