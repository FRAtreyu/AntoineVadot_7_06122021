const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const ctrlPost = require('../controllers/post');
const ctrlComment = require('../controllers/comment');

router.post('/', auth,ctrlPost.createPost);
router.delete('/:id', auth,ctrlPost.deleteOnePost);
router.post('/:id/like', auth, ctrlPost.setLikes)
router.post('/:id/comment', auth,ctrlPost.createOneComment);
router.get('/', auth,ctrlPost.getAllPosts);
router.get('/:id', auth,ctrlPost.getOnePost);
router.get('/:id/like', auth,ctrlPost.getPostLikes);
router.get('/:id/dislike', auth,ctrlPost.getPostDislikes);
router.get('/:id/comment', auth,ctrlPost.getAllComments);

module.exports = router;