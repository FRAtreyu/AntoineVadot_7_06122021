const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const ctrlPost = require('../controllers/post');
const ctrlComment = require('../controllers/comment');

router.post('/', auth,ctrlPost.createPost);
router.delete('/:id', auth,ctrlPost.deleteOnePost);
router.post('/:id/comment', auth,ctrlComment.createOneComment);
router.get('/', auth,ctrlPost.getAllPosts);
router.get('/:id', auth,ctrlPost.getOnePost);
router.get('/:id/comment', auth,ctrlComment.getAllComments);

module.exports = router;