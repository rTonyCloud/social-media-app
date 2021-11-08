const { Schema, model } = require('mongoose');


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

userSchema.virtual("friendCount").get(function() {
    return this.friends.length
})

const User = model("User", userSchema)

module.export = User;