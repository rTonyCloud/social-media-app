const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const userSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, "Please type a valid e-mail address"],
        },
        thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }
    ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
    // insert json 
    ToJson: {
        virtuals: true,
        getters: true
    },
    id: false
    }
)