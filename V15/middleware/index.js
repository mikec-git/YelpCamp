var middlewareObject    = {},
    Campground          = require("../models/campground"),
    Comment             = require("../models/comment");


middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "You need to be logged in to do that"); //waits for the next page
        res.redirect("/login");
    }
};

middlewareObject.checkCampgroundOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds");
            } else {
                //does user own the campground
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else{
        req.flash("error", "You do not have permission to do that");
        res.redirect("/campgrounds/" + req.params.id);
    }
};

middlewareObject.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err || !comment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if(comment.author.id.equals(req.user._id) || req.user.isAdmin){
                    next();
                } else{
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
    } else{
        req.flash("error", "You do not have permission to do that");
        res.redirect("/campgrounds/" + req.params.id);
    }
};

module.exports = middlewareObject;