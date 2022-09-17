const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

const generateNewComment = (commentDetails) => {
  return new Comment({...commentDetails, upvotes: [], timestamp: new Date().getTime()});
}

module.exports = (router) => {
  router.post('/comment', (req, res) => {
    const comment = generateNewComment(req.body);
    comment.save()
      .then(doc => {
        res.status(200).send(doc);
      })
      .catch(error => {
        console.error(error);
        if (error.code === 11000) {
          res.status(406).send(JSON.stringify(error));
        } else {
          res.status(500).send(JSON.stringify(error));
        }
      });
  });
};
