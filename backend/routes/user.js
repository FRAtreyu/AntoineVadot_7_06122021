const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const ctrlUser = require('../controllers/user');
const upload = require("../middlewares/multer-config");

router.put('/:id/upload',auth,upload.single('avatar'),ctrlUser.setAvatar);
router.delete('/:id',auth,ctrlUser.deleteUser);
router.get('/:pseudo',auth, ctrlUser.getOneUserByPseudo)
router.get('/:id/post',auth, ctrlUser.getAllUserPosts)
router.get('/',auth, ctrlUser.getAllUsers);
module.exports = router;