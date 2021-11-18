const { Schema, model, Types } = require('mongoose');
const { thoughts } = require("./index")

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
            trime: true,
            validate: [/.+@.+\..+/, "Please type a valid e-mail address"],
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



module.export = model("User", userSchema);