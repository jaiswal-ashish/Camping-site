var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
        {name: "Forest camping", description: "BLAH wencjk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnRO8ibSBVjeCmK3KwEdvS44IiaR2i0Qk4YTARj4bRcLPTgMQZw"},
        {name: "Forest camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDnRO8ibSBVjeCmK3KwEdvS44IiaR2i0Qk4YTARj4bRcLPTgMQZw"},
        {name: "Mountain camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tWzV65oiSTTyMhzLTJhIV5Q_C0Rf-t2BCvtZT-si1SkXHUCD"},
        {name: "Mountain camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tWzV65oiSTTyMhzLTJhIV5Q_C0Rf-t2BCvtZT-si1SkXHUCD"},
        {name: "Mountain camping", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1tWzV65oiSTTyMhzLTJhIV5Q_C0Rf-t2BCvtZT-si1SkXHUCD"}
]
function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("Removed Campgrounds");
        //     //inside the callback function to ensure this is executed after removing all campgrounds
        //     //add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 console.log("Added a campground");
        //                 // console.log(campground);
        //                 Comment.deleteMany({}, function(err){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         console.log("Deleted comments");
        //                         //create a comment
        //                         Comment.create({
        //                             text: "This is a nice place!",
        //                             author: "AJ"
        //                         }, function(err ,comment){
        //                             if(err){
        //                                 console.log(err);
        //                             } else {
        //                                 campground.comments.push(comment);
        //                                 campground.save();
        //                                 console.log("Created New comments");
        //                             }
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // }
    })
}

module.exports = seedDB;