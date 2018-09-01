var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

// Connect to mongoDB
mongoose.connect("mongodb://localhost/yelp_camp");

// Extended: true allows for any object type rather than just string/arrays
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Schema setup 
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

// Campground schema used to map mongoose model to a document in MongoDB
var Campground = mongoose.model("Campground", campgroundSchema);

// GET Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

// GET Campgrounds Page
app.get("/campgrounds", function(req, res){
    //Get all campgrounds from the db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
});

// POST Campgrounds page
app.post("/campgrounds", function(req, res){
    //Post new campground to the db
    Campground.create({name: req.body.campName, image: req.body.campImage}, function(err, newCampground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// GET New Campground Form Page
app.get("/campgrounds/new", function(req, res){
    res.render("new"); 
});










app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});