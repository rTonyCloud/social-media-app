const {Schema, model} = require('mongoose');

module.exports = model(
    'reactions',
    new Schema({
        reactionId: {
            type: Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 200,
        },
        username: {
            type: String,
            requried: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    })
);