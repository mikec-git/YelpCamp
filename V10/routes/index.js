var express     = require("express"),
    router      = express.Router(),
    
    passport    = require("passport"),
    User        = require("../models/user");

//Landing Page
router.get("/", function(req, res){
    res.render("landing");
});

//Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//Register Form Logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//Login form logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

module.exports = router;