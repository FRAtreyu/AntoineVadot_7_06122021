const express = require("express");
const router = express.Router();
const ctrlComment = require('../controllers/comment');

router.delete('/:id', ctrlComment.deleteComment)

module.exports = router;