const Model = require('../models/Model')
const jwt = require('jsonwebtoken');

exports.getAllPosts = (req, res) => {
    Model.Post.findAll({where: {user_deleted: false, deleted: false}, include: [Model.User, Model.Like, Model.Comment]}
    )
        .then(allPosts => {
            if (allPosts) {
                return res.status(201).json(allPosts);
            } else {
                return res.status(404).json({'error': 'no post found'})
            }
        })
        .catch(() => res.status(500).json({'error': 'failed to fetch posts'}))

};

exports.getOnePost = (req, res) => {
    let postId = req.params.id;
    Model.Post.findOne({
        where: {id: postId, user_deleted: false, deleted: false},
        include: [Model.User, Model.Like, Model.Comment]
    })
        .then(postFound => {
            if (postFound) {
                return res.status(201).json(postFound)
            } else {
                return res.status(404).json({'error': 'post not found'})
            }
        })
        .catch(() => res.status(500).json({'error': 'failed to fetch post'}))
};

exports.deleteOnePost = (req, res) => {
    let postId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    Model.Post.findOne({where: {id: postId}})
        .then(postFound => {
            if (postFound) {
                Model.User.findOne({where: {id: userId}, include: Model.Role})
                    .then(userFound => {
                        if (userFound.role.name === 'admin' || userFound.id === userId) {
                            postFound.set({deleted: true});
                            postFound.save();
                            return res.status(201).json({message: 'post deleted'})
                        } else {
                            return res.status(401).json({'error': 'Unauthorized request'})
                        }
                    })
                    .catch(() => res.status(404).json({'error': 'user not found'}))
            } else {
                return res.status(404).json({'error': 'post not found'})
            }

        })
        .catch(() => res.status(500).json({'error': 'failed to fetch post'}))
};

exports.createPost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    let postMessage = req.body.post_message;
    Model.Post.create({
        user_id: userId,
        post_message: postMessage,
        user_deleted: false,
        deleted: false
    })
        .then(function (post) {
            return res.status(201).json(post)
        })
        .catch(() => res.status(500).json({'error': 'failed to post message'}))

};

exports.createOneComment = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    let commentMessage = req.body.comment_message;
    let postId = req.params.id;
    Model.Comment.create({
        user_id: userId,
        post_id: postId,
        comment_message: commentMessage,
        user_deleted: false,
        deleted: false
    })
        .then(function (comment) {
            return res.status(201).json(comment)
        })
        .catch(() => res.status(500).json({'error': 'failed to post message'}))
};

exports.getAllComments = (req, res) => {
    let postId = req.params.id;
    Model.Comment.findAll({where: {post_id: postId, user_deleted: false, deleted: false}, include:  Model.User})
        .then(comments => {
            if (comments) {
                return res.status(201).json(comments);
            } else {
                return res.status(404).json({'error': 'no comments found'})
            }
        })
        .catch(() => res.status(500).json({'error': 'failed to fetch comments'}))
};

exports.setLikes = (req, res) => {
    let postId = req.params.id;
    let likeValue = Number(req.body.like_value);
    if (likeValue !== 1 && likeValue !== -1) return res.status(500).json({'error':'failed to set like'});
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    Model.Like.findOne({where: {user_id: userId, post_id: postId}})
        .then(like => {
            if (!like) {
                Model.Like.create({
                    user_id: userId,
                    post_id: postId,
                    like_value: likeValue
                })
                return res.status(201).json(like);
            } else if (like.like_value !== likeValue) {
                like.set({like_value: likeValue});
                like.save();
                return res.status(201).json(like);
            }
            like.set({like_value: 0});
            like.save();
            return res.status(201).json(like);

        })
        .catch(() => res.status(500).json({'error': 'failed to set like'}))
};
