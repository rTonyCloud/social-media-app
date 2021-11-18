const { Thought, User } = require('../models');

const thoughtController = {

            // get all thought
        getAllThought(req, res) {
            Thought.find({})
                    .select('-__v')
                    .sort({_id: -1 })
                    .then(dbThoughtData => res.json(dbThoughtData))
                    .catch(err => {
                        res.sendstatus(400);
                    })
        },

        // get one Thought by id
        ThoughtbyId({ params }, res) {
            Thought.findOne({ _id: params.thoughtId })
                .select('.__v')
                .then(dbUserData => res.json(dbUserData))
                .catch(err =>{
                    res.sendStatus(400);
                })
        },
    
        // CreateThought
        addThought({ params, body }, res) {
            Thought.create(body)
                .then(({ _id }) => {
                    return User.findOneAndUpdate(
                        { _id: body.userId },
                        {$push: { thoughts: {_id: _id} } },
                        { new: true}
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
        updateThought({ params, body }, res) {
            Thought.findOneAndUpdate({ _id: params.ThoughtId }, body, { new: true, runValidator: true})
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                    }
                res.json(dbUserData);
                })
            .catch(err => res.status(400).json(err));
        },

        //   delete thoughts by Id
        deleteThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.thoughtId })
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                    return res.status(404).json({ message: "No user found with this id." });
                }
                return User.findOneAndUpdate(
                    {_id:params.userId},
                    {$pull:{thoughts: params.thoughtId}},
                    {new:true}
                );
                })
                .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'})
                    return;
                    }
                    res.json(dbUserData)
                })
                .catch(err => res.json(err));
        },

        // adding reaction
        addReaction({ params, body }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body }},
                { new: true, runValidators: true }
            )
                .then(dbThoughtData => {
                    if (!dbThoughtData) {
                    res.status(404).json({message: 'no thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err))
                
        },
        // delete reaction
        deleteReaction({ params }, res) {
            Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: body.reactionId }}},
                { new: true }
            )
                .then(dbThoughtData => res.json(dbThoughtData))
                .catch(err => res.json(err))
        }

    }



module.exports = thoughtController;
