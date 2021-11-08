const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
    {
        reactionId: {
            types: Types.ObjectId,
            default: () => new Types.ObjectId(),
        }
    },
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        }
    },
    {
        username: {
            type: String,
            required: true
        }
    },
{
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
},
{
    toJson: {
        getter: true
    },
    id: false
},
);

module.export = reactionSchema;