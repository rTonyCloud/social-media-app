const { Thoughts, Users } = require('../models');

const thoughtController = {

            // get all thought
        getAllThoughts(req, res) {
            Thought.find({})
                    .then(data => res.json(dbUserData))
                    .catch(err => {
                        res.sendstatus(400);
                    })
        },

        // get one Thought by id
        getThoughtsById({ params }, res) {
            Thoughts.findOne({ _id: params.id })
                thoughts.findOne({_id:params_id})
                .then(data => res.json(dbUserData))
                .catch(err =>{
                    res.sendStatus(400);
                })
            
        },
    
        // CreateThought
        createThoughts({ params, body }, res) {
            Thoughts.create(body)
                .then(({_id}) => {
                    return users.findOneAndUpdate(
                        {_id: params.id},
                        {$push: {thoughts: _id}},
                        {new: true}
                    )
                })
                .then(dbUserData => {
                    if(!dbUserData) {
                        res.status(404).json({message: 'No user with this id found!'})
                        return;
                    }
                    res.json(dbUserData)
                })
                .catch(err => res.json(err));
            },

        // update Thought by id
        updateThoughtsById({ params, body }, res) {
            Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true})
                .then(dbUserData => {
                    if (!dbUserData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                    }
                res.json(dbUserData);
                })
            .catch(err => res.status(400).json(err));
        },

        //   delete thoughts by Id
        deleteThoughtsById({ params }, res) {
            Thoughts.findOneAndDelete({ _id: params.id })
                .then(dbUserData => {
                    if (!dbUserData) {
                    return res.status(404).json({ message: "No user found with this id." });
                }
                return users.findOneAndUpdate(
                    {_id:params.id},
                    {$pull:{comments:params.id}},
                    {new:true}
                );
                })
                .then(dbUserData => {
                    res.json(data);
                })
                .catch(err => res.status(400).json(err));
        },

        // adding reaction
        addReaction({ params, body }, res) {
            thoughts.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body }},
                { new: true, runvalidators: true }
            )
                .then(dbUserData => {
                    if (!dbUserData) {
                    res.status(404).json({message: 'no thought found with this id!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err))
                
        },

        removeREaction({ params }, res) {
            thoguhts.findOneAndUpdate(
                { _ID: paramas.thoughtId },
                { $pull: { reaction: { reactionId: params.reactionId }}},
                { new: true }
            )
                .then(dbUserData => res.json(dbUserData))
                .catch(err => res.json(err))
        }

    }



module.exports = thoughtController;
