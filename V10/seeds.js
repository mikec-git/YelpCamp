var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi. Varius duis at consectetur lorem. Enim eu turpis egestas pretium aenean pharetra magna ac. Scelerisque fermentum dui faucibus in ornare quam viverra. Netus et malesuada fames ac. Neque gravida in fermentum et sollicitudin. Nibh mauris cursus mattis molestie a iaculis. Tortor posuere ac ut consequat semper viverra nam libero justo. Turpis nunc eget lorem dolor."
    },
    {
        name: "Desert Mesa", 
        image: "https://images.pexels.com/photos/260593/pexels-photo-260593.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi. Varius duis at consectetur lorem. Enim eu turpis egestas pretium aenean pharetra magna ac. Scelerisque fermentum dui faucibus in ornare quam viverra. Netus et malesuada fames ac. Neque gravida in fermentum et sollicitudin. Nibh mauris cursus mattis molestie a iaculis. Tortor posuere ac ut consequat semper viverra nam libero justo. Turpis nunc eget lorem dolor."
    },
    {
        name: "Canyon Floor", 
        image: "https://images.pexels.com/photos/730426/pexels-photo-730426.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Viverra mauris in aliquam sem fringilla ut morbi. Varius duis at consectetur lorem. Enim eu turpis egestas pretium aenean pharetra magna ac. Scelerisque fermentum dui faucibus in ornare quam viverra. Netus et malesuada fames ac. Neque gravida in fermentum et sollicitudin. Nibh mauris cursus mattis molestie a iaculis. Tortor posuere ac ut consequat semper viverra nam libero justo. Turpis nunc eget lorem dolor."
    }
];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        
        //Remove all comments
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
         
            //Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("Added a campground!");
                        
                        //Create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    
    //Add a few comments
}

module.exports = seedDB;
