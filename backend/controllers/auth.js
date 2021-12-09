const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Model = require('../models/Model');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
require('dotenv').config({path: '../config/.env'});

exports.signup = (req, res, next) => {
    let email = req.body.email;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let pseudo = req.body.pseudo;
    let password = req.body.password;
    if (email == null || firstname == null || lastname == null || pseudo == null || password == null) {
        return res.status(400).json({'error': 'missing parameters'})
    }

    if(!EMAIL_REGEX.test(email)){
        return res.status(400).json({'error': 'Enter valid email adress'})
    }

    if(!PASSWORD_REGEX.test(password)){
        return res.status(400).json({'error': 'Password must be between 4 and 8 characters and must include at least one upper case letter, one lower case letter, and one numeric digit.'})
    }

    Model.User.findOne({
        attributes: ['email'],
        where: {email: email}
    })
        .then(function (userFound) {
            if (!userFound) {
                bcrypt.hash(password, 10)
                    .then(async hash => {
                        const user = await Model.User.create({
                            email: email,
                            firstname: firstname,
                            lastname: lastname,
                            pseudo: pseudo,
                            password: hash,
                            deleted: false,
                            role_id: 0
                        })
                            .then(function (user) {
                                res.status(201).json({'UserId': user.id})
                            })
                            .catch(error => res.status(500).json({'error':'failed to create user'}));
                    })
                    .catch();
            } else {
                return res.status(409).json({'error': 'user already exist'});
            }
        })
        .catch(function (err) {
            return res.status(500).json({'error': 'unable to verify user'});
        });
};

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    Model.User.findOne({where: {email: email}})
        .then(function (user) {
            if (!user||user.deleted) {
                return res.status(404).json({error: 'User not found'});
            }
            bcrypt.compare(password, user.password, function (errBycript, resBycript) {
                if (resBycript) {
                    return res.status(200).json({
                        'userId': user.id,
                        'token': jwt.sign(
                            {userId: user.id, userRole: user.role_id},
                            `${process.env.JWT_TOKEN}`,
                            {expiresIn: '4h'}
                        )
                    });
                } else {
                    return res.status(403).json({'error': 'Invalid password'})
                }
            });
        })
        .catch(error => res.status(500).json({'error': 'Unable to verify User'}));
};

exports.logout = (req, res, next) => {

};