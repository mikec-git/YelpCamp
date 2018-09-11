var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Campgrounds Page
router.get("/", function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("./campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// NEW - New Campground Form Page
router.get("/new", isLoggedIn, function(req, res){
    res.render("./campgrounds/new"); 
});

// CREATE - Campgrounds page
router.post("/", isLoggedIn, function(req, res){
    //Post new campground to the db
    var campName = req.body.campName,
        campImage = req.body.campImage,
        campDescription = req.body.campDescription, // Associated campsite with user
        author = {
            id: req.user._id,
            username: req.user.username
        },
        newCamp = {name: campName, image: campImage, description: campDescription, author: author};
        
    Campground.create(newCamp, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - Show more info about a campground
router.get("/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // console.log(foundCampground);
            res.render("./campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT campground route
router.get("/:id/edit", function(req ,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE campground route
router.put("/:id", function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});



// ==================== //
//      MIDDLEWARE      //
// ==================== //

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/login");
    }
};

module.exports = router;