var Campground = require("../models/campgrounds")
var Comment = require("../models/comment")

var middlewareObj = {};
middlewareObj.checkCampgroundOwner = function(req, res ,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found")
                res.redirect("back")
            } else {
                // if (!foundCampground) {
                //     req.flash("error", "Item not found.");
                //     return res.redirect("back");
                // }
                //foundCampground.author.id and req.user._id are not both strings so we cant compare them
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back")
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwner = function(req, res ,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back")
            } else {
                //foundCampground.author.id and req.user._id are not both strings so we cant compare them
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn =  function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login")
    }
}


module.exports = middlewareObj;