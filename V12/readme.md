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

#Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

#Auth Pt. 3 - Login
* Add login routes
* Add login template

#Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

#Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar correctly

#Refactor the routes
* Use Express router to reorganize all routes

#Users + Comments
* Associate users and comments
* save author's name to a comment automatically

#Users + campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

#Editing Campgrounds
* Add method-override
* Add Edit route for campgrounds
* Add link to Edit page
* Add Update route
* Fix $set problem

#Deleting Campgrounds
* Add Destroy route
* Add Delete button

#Authorization (permissions)
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

#Editing comments
* Add Edit route for comments
* Add Edit button
* Add Update route

#Deleteing Comments
* Add Destroy route
* Add Delete button

#Authorization Part 2: Comments
* User can only edit their comments
* USer can only delete their comments
* Hide/Show edit and delete buttons
* Refactor middleware

#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header