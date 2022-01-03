const Model = require('../models/Model');
const jwt = require('jsonwebtoken');
const fs = require("fs");

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
        .catch(() => res.status(500).json({'error': 'failed to fetch users'}))
};


exports.getOneUserByPseudo = (req, res) => {
    let userPseudo = req.params.pseudo;
    Model.User.findOne({
        where: { pseudo : userPseudo},
    })
        .then(user => {
            if (user && !user.deleted) {
                return res.status(201).json(user);
            } else {
                res.status(404).json({
                    'error': 'user not found'
                });
            }
        })
        .catch(() => res.status(500).json({'error': 'failed to fetch user'}))
};

exports.setAvatar =  (req, res) => {
    const avatarURL = `${req.file.destination}/${req.file.filename}`
     Model.User.findOne({where:{id : req.params.id}})
        .then(async user => {
            if(user.avatar_url==='./images/profiles_pictures/1.jpg'){
                await user.set({avatar_url: avatarURL});
                console.log(user.avatar_url)
                user.save();
                return res.status(201).json({message: 'avatar uploaded'})
            }else {
                let oldAvatar = user.avatar_url.split('.')[1] + "." + user.avatar_url.split('.')[2];
                fs.unlink(`images/profiles_pictures/${oldAvatar}`, async() =>{
                    await user.set({avatar_url: avatarURL});
                    console.log(user.avatar_url)
                    user.save();
                    return res.status(201).json({message: 'avatar uploaded'})
                });

            }

        })
        .catch(()=> res.status(500).json({'error':'failed to upload avatar'}))
};

exports.deleteUser = (req, res) => {
    let userId = req.params.id;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
    const askingUserId = decodedToken.userId;
    Model.User.findOne({
        where: {id: askingUserId},
        include: Model.Role
    })
        .then(function (userFound) {
            console.log(userFound);
            if (userFound.role.name === 'admin' || userFound.id===Number(userId)) {
                Model.User.findOne({
                    attributes: ['id', 'deleted'],
                    where: {id: userId}
                })
                    .then(user => {
                        user.set({deleted: true});
                        user.save();
                        Model.Post.update({user_deleted: true},
                            {where: {user_id: userId}});
                        Model.Comment.update({user_deleted: true},
                            {where: {user_id: userId}});
                        return res.status(201).json({message: 'user deleted'})
                    })
                    .catch(() => res.status(500).json({'error': 'failed to delete user'}))
            } else {
                return res.status(401).json({'error': 'must be an admin to do that'})
            }
        })
        .catch(() => res.status(500).json({'error': 'failed to find user'}))

};

exports.getAllUserPosts = (req, res) => {
    let userId = req.params.id;
    Model.Post.findAll(
        {where: {user_id: userId, user_deleted: false, deleted: false}, include: [Model.User, Model.Like, Model.Comment]})
        .then(allPosts => {
            return res.status(201).json(allPosts);
        })
};