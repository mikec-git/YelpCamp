var express         = require("express"),
    router          = express.Router(),
    MapboxClient    = require('mapbox/lib/services/geocoding'),
    
    Campground      = require("../models/campground"),
    middleware      = require("../middleware");

const client        = new MapboxClient(process.env.GEOCODER_API_KEY);

// =================== //
// /campgrounds routes //
// =================== //

// INDEX - Campgrounds listing page
router.get("/", function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash("error", "Could not find campgrounds");
            res.redirect("back");
        } else{
            res.render("./campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
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
        campPrice       = req.body.campPrice,
        campImage       = req.body.campImage,
        campDescription = req.body.campDescription, // Associated campsite with user
        author          = {id: req.user._id, username: req.user.username};
        
    client.geocodeForward(req.body.location, function(err, data){
        if(err || !data.features.length){
            req.flash("error", "Invalid address");
            return res.redirect("back");
        }
        
        var lat = data.features[0].center[1];
        var lng = data.features[0].center[0];
        var location = data.features[0].place_name;
        var newCamp         = {
            name:         campName, 
            price:        campPrice,
            image:        campImage, 
            description:  campDescription, 
            author:       author,
            location:     location,
            lat:          lat,
            lng:          lng
        };
        
        Campground.create(newCamp, function(err, newCampground){
            if(err){
                req.flash("error", "Could not create campground");
                res.redirect("back");
            } else {
                req.flash("success", "Campground succesfully created");
                res.redirect("/campgrounds");
            }
        });
    });
});

// SHOW - More info about a campground
router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Could not show campground");
            return res.redirect("/campgrounds");
        } else{
            res.render("./campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT - Modify campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req ,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Could not edit campground");
            res.redirect("/campgrounds/" + req.params.id);
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// UPDATE - Update changes
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    client.geocodeForward(req.body.campground.location, function(err, data){
        if(err || !data.features.length){
            req.flash("error", "Invalid address");
            return res.redirect("back");
        }
        req.body.campground.lat = data.features[0].center[1];
        req.body.campground.lng = data.features[0].center[0];
        req.body.campground.location = data.features[0].place_name;
        
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", "Could not update campground");
            res.redirect("/campgrounds");
        } else{
            req.flash("success", "Campground successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    });
});

// DESTROY - Delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Could not delete campground")
            res.redirect("/campgrounds");
        } else{
            req.flash("success", campground.name + " successfully removed");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;