const express = require('express');
const router = express.Router();

const userController = require('../../controllers/user-controller');

// Define routes for handling user operations
router.route('/users')
  .get(userController.getUsers)
  .post(userController.createUser);

router.route('/users/:userId')
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// Define routes for handling friend operations for a user
router.route('/users/:userId/friends/:friendId')
  .post(userController.addFriend)
  .delete(userController.removeFriend);

module.exports = router;
