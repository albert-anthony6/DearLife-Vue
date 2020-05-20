const Comment = require('../models/commentModel');
const factory = require('./handlerFactory');

// Used for createComment handler
exports.setPostUserIds = (req, res, next) => {
    // Allow nested routes
    if(!req.body.post) req.body.post = req.params.postId;
    if(!req.body.user) req.body.user = req.user.id;
    next();
};

exports.getAllComments = factory.getAll(Comment);
exports.getComment = factory.getOne(Comment);
exports.createComment = factory.createOne(Comment);
exports.updateComment = factory.updateOne(Comment);
exports.deleteComment = factory.deleteOne(Comment);