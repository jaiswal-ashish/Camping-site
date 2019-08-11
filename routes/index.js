var express = require("express"),
    router = express.Router();
var passport =require("passport"),
    User = require("../models/user")

router.get("/", function(req, res){
    res.render("landing");
})

//==============
// AUTH routes
//==============

router.get("/register", function(req, res){
    res.render("register");
})

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username})
    // console.log(newUser);
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            // console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        } else {
                //console.log(user);// registered user with username and password in hash
                passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Yelpcamp " + user.username);
                res.redirect("/campgrounds");
            })
        }
    })
})

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    successFlash: true,
    failureRedirect: "/login",
    failureFlash: true
}))

router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Logged you Out!")
    res.redirect("/campgrounds");
})

module.exports = router;