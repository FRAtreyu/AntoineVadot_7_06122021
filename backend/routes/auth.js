const express = require("express");
const router = express.Router();
const ctrlAuth = require('../controllers/auth');

router.post('/login', ctrlAuth.login);
router.post('/logout', ctrlAuth.logout);
router.post('/signup', ctrlAuth.signup);

module.exports = router;