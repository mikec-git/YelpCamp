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

// Requiring routes
var campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    authRoutes          = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v9", {useNewUrlParser: true}); // Connect to mongoDB
app.use(bodyParser.urlencoded({extended: true})); //extended: true allows for any object type rather than just string/arrays
app.set("view engine", "ejs");

// seedDB(); //seed the database

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

// Custom Middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//Using routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});