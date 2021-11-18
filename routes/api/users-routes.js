const router = require('express').Router()

const {
    getAllUsers,
    getUserById,
    createUsers,
    updateUserById,
    deleteUserById,
    addFriendById,
    deleteFriendById
} = require('../../controllers/users-controller');

// api user
router 
    .route('/')
    .get(getAllUsers)
    .post(createUsers)

//user:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById);

// users/:userId?friends
router
    .route('/:userId/friends/:friendId')
    .post(addFriendById)
    .delete(deleteFriendById)

module.exports = router;