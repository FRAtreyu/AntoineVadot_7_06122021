const jwt = require('jsonwebtoken');
require('dotenv').config({path:'../config/.env'})

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Unauthorized user'
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({ error: error | 'Unidentified user'});
    }
};