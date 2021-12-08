const Model = require('../models/Model');


exports.getAllUsers = (req, res) => {
    Model.User.findAll({
        attributes : ['firstname', 'lastname', 'pseudo']
        }
    )
        .then(allUsers => {
            if(allUsers){
                return res.status(201).json(allUsers);
            } else {
                return res.status(404).json({'error':'no users found'})
            }
        })
        .catch(error => res.status(500).json({'error':'failed to fetch users'}))
};

exports.getOneUser = (req, res) => {
    let userId=req.params.id
    Model.User.findOne({
        attributes: ['id','firstname', 'lastname', 'pseudo', 'email'],
        where: {id: userId}
    })
        .then(user => {
            if (user) {
                return res.status(201).json(user);
            } else {
                res.status(404).json({
                    'error': 'user not found'
                });
            }
        })
        .catch(error => res.status(500).json({'error': 'failed to fetch user'}))

};

exports.modifyUser = (req, res, next) => {

};

exports.deleteUser = (req, res, next) => {

};

exports.getAllUserPosts = (req, res, next) => {

};