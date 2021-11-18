const { User } = require('../models');

const userController = {

  // get all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
                })
                .populate({
                    path: 'friends',
                    select: '-__v'
                })
                .select('-__v')
                .sort({ _id: -1 })
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
        });
    },

  // get one User by id
        getUserById({ params }, res) {
            User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
                })
                .populate({
                path: 'friends',
                select: '-__v'
                })
                .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.sendSatus(400)
            });
    },

  // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
        },

  // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
                }
            res.json(dbUserData);
            })
        .catch(err => res.json(err));
    },

    // delete pizza
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // adding friends
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: { _id: params.friendId } } },
            { new: true }
        )
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

        // remove friend by id
        deleteFriend({ params }, res) {
            User.findOneAndUpdate(
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