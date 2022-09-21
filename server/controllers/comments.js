const CommentModel = require('../models/Comment');

const generateNewComment = (commentDetails, isReply) => {
    return new CommentModel({...commentDetails, upvotes: [], timestamp: new Date().getTime(), isReply: isReply || false});
};

module.exports = {
    addComment: (req, res) => {
        const commentDoc = generateNewComment(req.body);
        commentDoc.save()
            .then((doc) => {
                res.status(200).send(doc);
            })
            .catch((error) => {
                console.error(error);
                if (error.code === 11000) {
                    res.status(406).send(JSON.stringify(error));
                } else {
                    res.status(500).send(JSON.stringify(error));
                }
            });
    },
    upvoteComment: (req, res) => {
        CommentModel.findOneAndUpdate({_id: req.params.id}, {$push: {upvotes: req.body.upvoter}}, {new: true}, (error, comment) => {
            if (error) {
                res.status(500).send(JSON.stringify(error));
            }

            res.status(200).send(comment);
        });
    },
    addReply: (req, res) => {
        const commentDoc = generateNewComment(req.body, true);
        commentDoc.save()
            .then((reply) => {
                CommentModel.findOneAndUpdate({_id: req.params.id}, {$push: {replies: reply._id}}, {new: true}, (error, comment) => {
                    if (error) {
                        res.status(500).send(JSON.stringify(error));
                    }

                    res.status(200).send({comment, reply});
                });
            })
            .catch((error) => {
                console.error(error);
                if (error.code === 11000) {
                    res.status(406).send(JSON.stringify(error));
                } else {
                    res.status(500).send(JSON.stringify(error));
                }
            });
    },
    getComments: (req, res) => {
        CommentModel.find({isReply: false}, (error, comments) => {
            if (error) {
                res.status(500).send(JSON.stringify(error));
            }

            res.status(200).send(comments);
        });
    },
    getReplies: (req, res) => {
        CommentModel.find({isReply: true}, (error, replies) => {
            if (error) {
                res.status(500).send(JSON.stringify(error));
            }

            res.status(200).send(replies.reduce((dict, reply) => {
                dict[reply._id] = reply;
                return dict;
            }, {}));
        });
    }
}
