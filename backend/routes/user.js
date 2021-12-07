const express = require("express");
const router = express.Router();
const ctrlUser = require('../controllers/user');

router.put('/:id', ctrlUser.modifyUser);
router.post('/:id', ctrlUser.deleteUser);
router.get('/:id', ctrlUser.getAllUserPosts);
router.get('/', ctrlUser.getAllUsers);
router.get('/:id', ctrlUser.getOneUser);

module.exports = router;