var mongoose = require("mongoose");

// Schema setup 
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Campground schema used to map mongoose model to a document in MongoDB
module.exports = mongoose.model("Campground", campgroundSchema);