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
    image: String,
    description: String
});


// Campground schema used to map mongoose model to a document in MongoDB
var Campground = mongoose.model("Campground", campgroundSchema);

// //Create a campground
// Campground.create({
//     name: "Salmon Creek",
//     image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
//     description: "This is a wonderful spot within a valley. Salmon Creek is only a 5 minute walk!"
// },function(err, campground){
//     if(err){
//         console.log(err);
//     } else{
//         console.log("Newly created campground: ");
//         console.log(campground);
//     }
// });

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

// GET - Show more info about a campground (SHOW Route)
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
});







app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});