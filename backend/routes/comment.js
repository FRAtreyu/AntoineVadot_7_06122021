const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const ctrlComment = require('../controllers/comment');

router.delete('/:id', auth,ctrlComment.deleteComment)

module.exports = router;