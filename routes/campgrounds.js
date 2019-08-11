var express = require("express"),
    router = express.Router();

var Campground = require("../models/campgrounds")
var middelware = require("../middleware") //it automatically requires the index file of that directory if not mentioned
//INDEX- show all campgrounds
router.get("/campgrounds", function(req, res){
    // console.log(req.user); returns the 
    // res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({}, function(err, allcampgrounds){
    if(err){
        console.log("Ohh Errror");
        console.log(err);
    } else {
        res.render("campgrounds", {campgrounds: allcampgrounds});
    }
    });
});

//NEW- show form to create new campground.
router.get("/campgrounds/new",middelware.isLoggedIn, function(req, res){
    res.render("new");
})

//CREATE- add new campground
router.post("/campgrounds",middelware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    var newCampgrounds = {name: name, price: price, image: image, description: description, author: author};
    // campgrounds.push(newCampgrounds);
    //Create a new campground and save to daatbase
    Campground.create(newCampgrounds, function(err, newlycreated){
        if(err){
            console.log(err);
        } else {
            // console.log(newlycreated);
            res.redirect("/campgrounds");
        }
    });
});

//SHOW-route-- show more info //this must be below campgrounds/new
router.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            // console.log(foundCampground);
            res.render("show", {campground: foundCampground});
        }
    })
})

//Edit route
router.get("/campgrounds/:id/edit",middelware.checkCampgroundOwner, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
        res.render("edit", {campground: foundCampground});
    })
})
//Update route
router.put("/campgrounds/:id",middelware.checkCampgroundOwner, function(req, res){
    // var data = {name: req.body.name, image: req.body.image, description: req.body.description};
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete route
router.delete("/campgrounds/:id",middelware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

module.exports = router;