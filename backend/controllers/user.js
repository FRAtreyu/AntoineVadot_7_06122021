const Model = require('../models/Model');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

exports.getAllUsers = (req, res) => {
    Model.User.findAll({
            attributes: ['firstname', 'lastname', 'pseudo']
        }
    )
        .then(allUsers => {
            if (allUsers) {
                return res.status(201).json(allUsers);
            } else {
                return res.status(404).json({'error': 'no users found'})
            }
        })
        .catch(error => res.status(500).json({'error': 'failed to fetch users'}))
};

exports.getOneUser = (req, res) => {
    let userId = req.params.id;
    Model.User.findOne({
        attributes: ['id', 'firstname', 'lastname', 'pseudo', 'email'],
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

exports.modifyUser = (req, res) => {
    let userId = req.params.id;
    let pseudo = req.body.pseudo;
    let email = req.body.email;
    let emailExist = Model.User.findOne({attributes: ['email'], where: {email: email}});
    Model.User.findOne({
        attributes: ['id','pseudo', 'email'],
        where: {id: userId}
    })
        .then(user =>{
            if(user){
                if(pseudo!=null){
                    user.set({
                        pseudo: pseudo
                    })
                }
                if (email!=null){
                    if(EMAIL_REGEX.test(email)&&!emailExist) {
                        user.set({
                            email: email
                        })
                    } else{
                        return res.status(400).json({'error':'email invalid or already in use'})
                    }
                }
                user.save();
                return res.status(201).json(user);
            } else {
                res.status(404).json({'error':'user not found'})
            }

        })
        .catch(error => res.status(500).json({'error':'failed to update user'}))
};

exports.deleteUser = (req, res) => {

};

exports.getAllUserPosts = (req, res) => {

};