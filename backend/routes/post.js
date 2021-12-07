const express = require("express");
const router = express.Router();
const ctrlPost = require('../controllers/post');
const ctrlComment = require('../controllers/comment');

router.post('/', ctrlPost.createPost);
router.delete('/:id', ctrlPost.deleteOnePost);
router.post('/:id/comment', ctrlComment.createOneComment);
router.get('/', ctrlPost.getAllPosts);
router.get('/:id', ctrlPost.getOnePost);
router.get('/:id/comment', ctrlComment.getAllComments);

module.exports = router;