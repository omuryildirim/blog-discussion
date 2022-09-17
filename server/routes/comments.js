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

  router.post('/comment/:id/upvote', (req, res) => {
    Comment.findOneAndUpdate({_id: req.params.id}, { $push: { upvotes: req.body.upvoter} }, {new: true}, (error, comment) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }

      res.status(200).send(comment);
    });
  });

  router.get('/comments', (req, res) => {
    Comment.find({}, (error, comments) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }

      res.status(200).send(comments);
    });
  });
};
