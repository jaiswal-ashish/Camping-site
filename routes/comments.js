var express = require("express"),
    router = express.Router();
var Campground = require("../models/campgrounds")
var Comment = require("../models/comment")
var middelware = require("../middleware")


router.get("/campgrounds/:id/comments/new",middelware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else {
            res.render("new_comment", {campground: campground});
        }
    })
})
//create comments
router.post("/campgrounds/:id/comments",middelware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong")
                    console.log(err)
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/" + req.params.id);
                }
            })
        }
    })
})

//Edit route-- For comments we have nested routes so, the actual route will be
router.get("/campgrounds/:id/comments/:comment_id/edit", middelware.checkCommentOwner, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            res.redirect("back");
        } else{
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back")
                }else {
                    res.render("edit_comment", {campground: foundCampground, comment: foundComment});
                }
            })
        }
    })
})

//Update route
router.put("/campgrounds/:id/comments/:comment_id",middelware.checkCommentOwner, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete route
router.delete("/campgrounds/:id/comments/:comment_id",middelware.checkCommentOwner, function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    })
})

module.exports = router;