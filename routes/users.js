const router = require('express').Router();

const {
  getUsers, createUser, getUser, patchUser, patchAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/me', patchUser);
router.patch('/me/avatar', patchAvatar);

module.exports = router;
