const express = require("express");
const router = express.Router();
const ctrlComment = require('../controllers/comment');

router.delete('/:id_comment', ctrlComment.deleteComment)

module.exports = router;