var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username:   String,
    password:   String,
    isAdmin:    { type: Boolean, default: false }
});

userSchema.plugin(passportLocalMongoose); // Adds passport-local-mongoose methods to User model

module.exports = mongoose.model("User", userSchema);