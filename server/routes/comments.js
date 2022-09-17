const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');

const generateNewComment = (commentDetails, isReply) => {
  return new Comment({...commentDetails, upvotes: [], timestamp: new Date().getTime(), isReply: isReply || false});
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

  router.post('/comment/:id/reply', (req, res) => {
    const comment = generateNewComment(req.body, true);
    comment.save()
      .then(reply => {
        Comment.findOneAndUpdate({_id: req.params.id}, { $push: { replies: reply._id } }, {new: true}, (error, comment) => {
          if (error) {
            res.status(500).send(JSON.stringify(error));
          }

          res.status(200).send({comment, reply});
        });
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

  router.get('/comments', (req, res) => {
    Comment.find({isReply: false}, (error, comments) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }

      res.status(200).send(comments);
    });
  });

  router.get('/replies', (req, res) => {
    Comment.find({isReply: true}, (error, replies) => {
      if (error) {
        res.status(500).send(JSON.stringify(error));
      }

      res.status(200).send(replies.reduce((dict, reply) => {
        dict[reply._id] = reply;
        return dict;
      }, {}));
    });
  });
};
