const router = require('express').Router();
const { route } = require('express/lib/application');
const {
    getAllUser,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    removeFriend
  } = require('../../controllers/user-controller');

router
  .route('/')
  .get(getAllUser)
  .post(createUser);

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

route
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

module.exports = router;
