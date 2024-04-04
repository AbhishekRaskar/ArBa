const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    avatar: { type: String } 
}, {
    versionKey: false
});

const userModel = mongoose.model("user", userSchema);

module.exports = {
    userModel
};
