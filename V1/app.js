var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campgrounds Array
var campgrounds= [
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"},
    {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
];

// GET Landing Page
app.get("/", function(req, res){
    res.render("landing");
});

// GET Campgrounds Page
app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds:campgrounds});
});

// POST Campgrounds page
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
    var newCampground = {name: req.body.campName, image: req.body.campImage};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
});

// GET New Campground Form Page
app.get("/campgrounds/new", function(req, res){
    res.render("new"); 
});













app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});