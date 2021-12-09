const Model = require('../models/Model')
const jwt = require('jsonwebtoken');

exports.getAllPosts = (req, res) => {
    Model.Post.findAll({}
    )
        .then(allPosts => {
            if (allPosts) {
                return res.status(201).json(allPosts);
            } else {
                return res.status(404).json({'error': 'no post found'})
            }
        })
        .catch(error => res.status(500).json({'error': 'failed to fetch posts'}))

};

exports.getOnePost = (req, res) => {
    let postId = req.params.id;
    Model.Post.findOne({
        where: {id: postId}
    })
        .then(postFound => {
            if (postFound) {
                if (!postFound.user_deleted) {
                    return res.status(201).json(postFound)
                } else {
                    return res.status(404).json({'error': 'post not found'})
                }
            } else {
                return res.status(404).json({'error': 'post not found'})
            }
        })
        .catch( error => res.status(500).json({'error':'failed to fetch post'}))
};

exports.deleteOnePost = (req, res) => {
}

;

exports.createPost = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId= decodedToken.userId;
    let postMessage = req.body.post_message;
    Model.Post.create({
        user_id: userId,
        likes: 0,
        dislikes: 0,
        post_message: postMessage,
        user_deleted: false
    })
        .then(function(post){
            return res.status(201).json(post)
        })
        .catch( error => res.status(500).json({'error':'failed to post message'}))

};
