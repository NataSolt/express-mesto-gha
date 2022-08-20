const router = require('express').Router();

const {
  getUsers, createUser, getUser, patchUser, patchAvatar,
} = require('../controllers/users');
const { validateUserId, validateUpdateUser, validateUpdateAvatar } = require('../middlewares/validator');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', validateUserId, getUser);
router.patch('/me', validateUpdateUser, patchUser);
router.patch('/me/avatar', validateUpdateAvatar, patchAvatar);

module.exports = router;
