var methodOverride  = require("method-override"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    seedDB          = require("./seeds"),
    app             = express(),
    
    Campground          = require("./models/campground"),
    Comment             = require("./models/comment"),
    User                = require("./models/user"),

    campgroundRoutes    = require("./routes/campgrounds"),
    commentRoutes       = require("./routes/comments"),
    authRoutes          = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp_v12", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true})); //extended: true allows for any object type rather than just string/arrays
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// Passport config
app.use(require("express-session")({
    secret:             "Blue eyes white dragon",
    resave:             false,
    saveUninitialized:  false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Custom Middleware
app.use(function(req, res, next){
    res.locals.currentUser  = req.user; //res.locals is available inside every template
    res.locals.success      = req.flash("success");
    res.locals.error        = req.flash("error");
    next();
});

//Using routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", authRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});