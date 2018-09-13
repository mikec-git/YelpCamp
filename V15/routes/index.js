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
    res.render("register", {page: "register"});
});

//Register form post
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username.toLowerCase()});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username + "!")
            res.redirect("/campgrounds");
        });
    });
});

//Show admin register form
router.get("/register_admin", function(req, res) {
    res.render("register_admin", {page: "register"});
});

//Register form post
router.post("/register_admin", function(req, res) {
    var newUser = new User({username: req.body.username.toLowerCase()});
    var code = req.body.adminCode;
    if(code && code.length > 0){
        if(code !== process.env.SECRET_ADMIN_CODE){
            req.flash("error", "Incorrect code!");
            return res.redirect("/register_admin");
        }
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register_admin");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "(Admin) Welcome to YelpCamp " + user.username + "!")
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login", {page: "login"});
});

//Login form logic
router.post("/login", function(req, res, next){ 
    passport.authenticate("local", {
            successRedirect: "/campgrounds",
            failureRedirect: "/login",
            successFlash: "Welcome " + req.body.username + "!",
            failureFlash: true
        })(req, res);
});

//Logout route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;