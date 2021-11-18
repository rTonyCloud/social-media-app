const { Users, Thoughts } = require('../models');

const userController = {

  // get all users
    getAllUsers(req, res) {
        Users.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
                })
                .select('-__v')
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
        });
    },

  // get one User by id
        getUserById({ params }, res) {
            Users.findOne({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.sendSatus(400)
            });
    },

  // createUser
    createUsers({ body }, res) {
        Users.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        },

  // update User by id
    updateUserById({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
            res.json(dbUserData);
            })
        .catch(err => res.json(err));
    },

    // delete User by id
    deleteUserById({ params, body }, res) {
        Users.findOneAndDelete({ _id: params.id }, body, { new: true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
            res.json(dbUserData);
            })
        .catch(err => res.json(err));
},

    // add friend by id
    addFriendById({ params }, res) {
        Users.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friend: params.friendId } },
            {new: true, runValidators: true }
            ).then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: "New friend added found with this id." });
            }
            res.json(dbUserData); 
            })
            .catch(err => res.status(400).json(err));
        },

        // remove friend by id
        deleteFriendById({ params }, res) {
            Users.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friend: params.friendId } },
                { new: true }
                ).then(dbUserData => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this id." });
                }
                res.json(dbUserData); 
                })
                .catch(err => res.status(400).json(err));
            } 
        
    }

module.exports = userController;