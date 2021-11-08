const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            require: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        userName: 
        {
            type: String,
            required: true
        },
        reaction: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        // prevents virtuals from creating duplicate of _id as `id`
        id: false
      }
);


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});
          
const Thought = model('Thought', ThoughtSchema);
          
module.exports = Thought;