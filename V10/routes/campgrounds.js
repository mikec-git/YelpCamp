var express = require("express"),
    router = express.Router(),
    
    Campground = require("../models/campground"),
    middleware = require("../middleware");

// =================== //
// /campgrounds routes //
// =================== //

// INDEX - Campgrounds listing page
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

// NEW - New campground form
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("./campgrounds/new"); 
});

// CREATE - Post new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    var campName        = req.body.campName,
        campImage       = req.body.campImage,
        campDescription = req.body.campDescription, // Associated campsite with user
        author          = {id: req.user._id, username: req.user.username},
        newCamp         = {
            name:         campName, 
            image:        campImage, 
            description:  campDescription, 
            author:       author
        };
        
    Campground.create(newCamp, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - More info about a campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("./campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - Modify campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req ,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE - Update changes
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DESTROY - Delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;