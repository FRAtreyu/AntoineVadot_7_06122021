const Model = require('../models/Model')

exports.getAllPosts = (req, res, next) => {
    Model.Post.findAll({
        }
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

exports.getOnePost = (req, res, next) =>{

};

exports.deleteOnePost = (req, res, next) => {

};

exports.createPost = (req, res, next) => {

};
