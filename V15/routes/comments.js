var express         = require("express"),
    router          = express.Router({mergeParams: true}),
    
    Campground      = require("../models/campground"),
    Comment         = require("../models/comment"),
    middleware      = require("../middleware");

// =============================== //
// /campgrounds/:id/comments route //
// =============================== //

// NEW - New comment form
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Could not find campground");
            res.redirect("/campgrounds");
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

// CREATE - Create comment
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Could not find campground");
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Could not create comment");
                    res.redirect("/campgrounds/" + req.params.id);
                } else{
                    //Add username and id to comment
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    
                    //Save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT - Modify comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            req.flash("error", "Could not find comment");
            res.redirect("/campgrounds/" + req.params.id);
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});

// UPDATE - Submit comment changes
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            req.flash("error", "Could not update comment");
            res.redirect("back");
        } else{
            req.flash("success", "Comment successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY - Delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Could not delete comment");
            res.redirect("back");
        } else{
            req.flash("success", "Comment successfully removed");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;