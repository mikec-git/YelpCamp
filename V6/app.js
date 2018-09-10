var express         = require("express"),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");
    
var app             = express();

mongoose.connect("mongodb://localhost/yelp_camp_v6", {useNewUrlParser: true}); // Connect to mongoDB
app.use(bodyParser.urlencoded({extended: true})); //extended: true allows for any object type rather than just string/arrays
app.set("view engine", "ejs");
seedDB();

// PASSPORT CONFIG
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret: "Blue eyes white dragon",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ==================== //
//        ROUTES        //
// ==================== //

// GET - Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - Campgrounds Page
app.get("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res){
    res.render("./campgrounds/new"); 
});

// CREATE - Campgrounds page
app.post("/campgrounds", function(req, res){
    //Post new campground to the db
    var campName = req.body.campName,
        campImage = req.body.campImage,
        campDescription = req.body.campDescription,
        newCamp = {name: campName, image: campImage, description: campDescription};
        
    Campground.create(newCamp, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// SHOW - Show more info about a campground
app.get("/campgrounds/:id", function(req, res) {
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

// ================== //
//   COMMENTS ROUTES  //
// ================== //

// NEW COMMENT
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// ==================== //
//      AUTH ROUTES     //
// ==================== //

//Show register form
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
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

// ==================== //
//     LOGIN ROUTES     //
// ==================== //

//Show login form
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

// ==================== //
//    LOGOUT ROUTES     //
// ==================== //

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
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
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});