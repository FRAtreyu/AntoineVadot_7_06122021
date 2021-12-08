const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth')
const ctrlUser = require('../controllers/user');

router.put('/:id',ctrlUser.modifyUser);
router.delete('/:id', auth,ctrlUser.deleteUser);
router.get('/:id',ctrlUser.getOneUser);
router.get('/:id/post', ctrlUser.getAllUserPosts)
router.get('/', ctrlUser.getAllUsers);
module.exports = router;