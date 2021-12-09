const Model = require('../models/Model')

exports.getAllPosts = (req, res) => {
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

exports.getOnePost = (req, res) =>{
    let postId = req.params.id;
    Model.Post.findOne({
        where:{id:postId}
    })
        .then(postFound => {

        })

};

exports.deleteOnePost = (req, res) => {}

;

exports.createPost = (req, res) => {

};
