const { User, Thought } = require('../models');

const userController = {

  // get all pizzas
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
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
                })
                .populate({
                path: 'friends'
            })
                .select('-__v')
                .then(dbUserData => res.json(dbUserData))
                .catch(err => {console.log(err);
                res.sendStatus(400);
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
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
                }
            res.json(dbUserData);
            })
        .catch(err => res.json(err));
    },

  // add user
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendsId } }, { runValidators: true }
            ).then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id"});
            }
            res.json(dbUserData);
            }) 
            .catch(err => res.status(400).json(err));
    },


  // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id." });
                }
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
                  })
                  .then(() => {
                        res.json({ message: 'user has been deleted.' });
                  })
                  .catch(err => res.status(400).json(err));
    },

    // delete friend from user
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId },{ $pull: { friends: params.friendsId } },{ runValidators: true }
            ).then(dbUserData => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user found with this id." });
            }
            res.json(dbUserData); 
            })
            .catch(err => res.json(err));
        } 
    }

module.exports = userController;