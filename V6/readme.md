#YelpCamp
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image

#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

#Show Page
* Review the RESTful routes we've seen so far
    * Seven routes:

###RESTful Routes
name    url         verb    description
=============================================================
INDEX   /dogs       GET     Display a list of all dogs
NEW     /dogs/new   GET     Displays a form to make a new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET     Shows info about one dog

* Add description to our campground model
* Show db.collection.drop() - deletes all data in "collection"
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* User module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file everytime the server starts

#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
    * campgrounds/:id/comments/new      GET (NEW)
    * campgrounds/:id/comments          POST (CREATE)

* Add the comment new and create routes
* Add the new comment form

#Styling the Show page
* Add sidebar to show page
* Display comments nicely

#Finish styling the Show page
* Add public directory
* Add custom stylesheet

#Auth Pt. 1 - Add User model
* Install all packages needed for auth
* Define User model

#Auth Pt. 1 - Register
* Configure Passport
* Add register routes
* Add register template