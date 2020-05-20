const Post = require('../models/postModel');
const factory = require('./handlerFactory');

exports.aliasTopPosts = (req, res, next) => {
    req.query.limit = 5;
    req.query.sort = '-commentsQuantity';
    req.query.fields = 'title,commentsQuantity,category,summary';
    next();
};

exports.getAllPosts = factory.getAll(Post);
exports.getPost = factory.getOne(Post, { path: 'comments', select: '-__v' });
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);