var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");
    
    

// Connect to mongoDB
mongoose.connect("mongodb://localhost/yelp_camp_v3", {useNewUrlParser: true});

// Extended: true allows for any object type rather than just string/arrays
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// GET - Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

// GET - Campgrounds Page (INDEX Route)
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// GET - New Campground Form Page (NEW Route)
app.get("/campgrounds/new", function(req, res){
    res.render("new"); 
});

// POST - Campgrounds page (CREATE Route)
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

// SHOW - Show more info about a campground (SHOW Route)
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            // console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    });
});







app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});