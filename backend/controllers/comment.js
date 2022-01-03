const Model = require('../models/Model')
const jwt = require('jsonwebtoken');

exports.deleteComment = (req, res) => {
    let commentId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const userId = decodedToken.userId;
    Model.Comment.findOne({where: {id: commentId}})
        .then(commentFound => {
            if (commentFound) {
                Model.User.findOne({where: {id: userId}, include: Model.Role})
                    .then(userFound => {
                        if (userFound.role.name === 'admin' || userFound.id === userId) {
                            commentFound.set({deleted: true});
                            commentFound.save();
                            return res.status(201).json({message: 'comment deleted'})
                        } else {
                            return res.status(401).json({'error': 'Unauthorized request'})
                        }
                    })
                    .catch(() => res.status(404).json({'error': 'user not found'}))
            } else {
                return res.status(404).json({'error': 'comment not found'})
            }

        })
        .catch(() => res.status(500).json({'error': 'failed to fetch comment'}))

};

