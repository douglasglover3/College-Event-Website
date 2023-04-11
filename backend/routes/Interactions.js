const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");
const Comment = require("../models/Comments.js");
const Rating = require("../models/Ratings.js");

const crypto = require('crypto');

router.post("/createComment", (req, res) => {

    if (!req.body.commentText) {
        res.status(400).send({
          message: "Missing Text."
        });
    }
    else if (!req.body.eventID) {
        res.status(500).send({
          message: "Missing event ID."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }

    // Create a new comment
    const newComment = new Comment({
        commentID: crypto.randomBytes(64).toString("hex"),
        commentText: req.body.commentText,
        userID: req.body.userID,
        eventID: req.body.eventID
    });

    //Save Comment in the database
    sql.query("INSERT INTO comments SET ?", newComment, (err, data) => 
    {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the comment."
            });
            console.log("Error creating Comment: ", { err: err.message, ...newComment });
        }
        else {
            res.status(200).send(newComment);
            console.log("Successfully created Comment: ", newComment);
        }
    });

});

router.post("/editComment", (req, res) => {

    if (!req.body.commentText) {
        res.status(400).send({
          message: "Missing Text."
        });
    }
    else if (!req.body.commentID) {
        res.status(500).send({
          message: "Missing comment ID."
        });
    }

    //Update Comment in the database
    sql.query("UPDATE comments SET commentText = ? WHERE commentID = ?", [req.body.commentText, req.body.commentID], (err, data) => 
    {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the comment."
            });
            console.log("Error updating Comment: ", { err: err.message, ...req.body });
        }
        else {
            res.status(200).send(data);
            console.log("Successfully updated Comment.");
        }
    });

});

router.post("/deleteComment", (req, res) => {

    if (!req.body.commentID) {
        res.status(500).send({
          message: "Missing comment ID."
        });
    }

    //Delete Comment from the database
    sql.query("DELETE FROM comments WHERE commentID = ?", req.body.commentID, (err, data) => 
    {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the comment."
            });
            console.log("Error deleting Comment: ", { err: err.message, ...req.body });
        }
        else {
            res.status(200).send(data);
            console.log("Successfully deleted Comment.");
        }
    });

});

router.post("/getEventComments", (req, res) => {

    if (!req.body.eventID) {
        res.status(500).send({
          message: "Missing event ID."
        });
    }

    //Get all comments of event
    sql.query("SELECT * FROM comments WHERE eventID = ?", req.body.eventID, (err, data) => 
    {
        //An error occurred
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while loading comments from event."
            });
            console.log("Error getting event comments: ", { err: err.message, ...req.body });
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post("/isCommenter", (req, res) => {

    if (!req.body.commentID) {
        res.status(500).send({
          message: "Missing comment ID."
        });
    }
    else if (!req.body.commentID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }

    //Check if user made this comment
    sql.query("SELECT * FROM comments WHERE commentID = ? AND userID = ?", [req.body.commentID, req.body.userID], (err, data) => 
    {
        //An error occurred
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while loading comments from event."
            });
            console.log("Error getting event comments: ", { err: err.message, ...req.body });
        }
        //User wrote comment
        else if (data.length != 0){
            res.status(200).send(true);
        }
        //User did not write comment
        else {
            res.status(200).send(false);
        }
    });
});

router.post("/setRating", (req, res) => {

    if (!req.body.eventID) {
        res.status(500).send({
          message: "Missing event ID."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }
    else if (!req.body.rating) {
        res.status(500).send({
          message: "Missing rating."
        });
    }

    //Check if user has rated event already
    sql.query("SELECT * FROM ratings WHERE userID = ? AND eventID = ?", [req.body.userID, req.body.eventID], (err, data) => 
    {
        //An error occurred
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while rating the event."
            });
            console.log("Error rating Event: ", { err: err.message, ...req.body });
        }
        //User has not rated event yet, so make a new rating
        else if(data.length == 0) {
            // Create a new rating
            const newRating = new Rating({
                rating: req.body.rating,
                userID: req.body.userID,
                eventID: req.body.eventID
            });

            sql.query("INSERT INTO ratings SET ?", newRating, (err2, data2) => 
            {
                //Some error occurred
                if (err2) {
                    res.status(500).send({
                        message:
                            err2.message || "Some error occurred while creating the rating."
                    });
                    console.log("Error creating Rating: ", { err: err2.message, ...newRating });
                }
                //Rating created
                else {
                    res.status(200).send(data2);
                    console.log("Successfully created Rating: ", newRating);
                }
            });
        }
        //User has rated already, so update rating
        else {
            sql.query("UPDATE ratings SET rating = ? WHERE userID = ? AND eventID = ?", [req.body.rating, req.body.userID, req.body.eventID], (err, data) => 
            {
                //Some error occurred
                if (err) {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the rating."
                    });
                    console.log("Error updating Rating: ", { err: err.message });
                }
                //Rating updated
                else {
                    res.status(200).send(data);
                    console.log("Successfully updated Rating.");
                }
            });
        }
    });

});

router.post("/getEventRating", (req, res) => {

    if (!req.body.eventID) {
        res.status(500).send({
          message: "Missing event ID."
        });
    }

    //Check if user has rated event already
    sql.query("SELECT AVG(rating) as rating FROM ratings WHERE eventID = ?", req.body.eventID, (err, data) => 
    {
        //An error occurred
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting user's rating."
            });
            console.log("Error getting user rating: ", { err: err.message, ...req.body });
        }
        //Success
        else {
            res.status(200).send(data[0].rating);
            console.log("Successfully found event rating: ", data[0].rating);
        }
    });
});

router.post("/getUserRating", (req, res) => {

    if (!req.body.eventID) {
        res.status(500).send({
          message: "Missing event ID."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }

    //Check if user has rated event already
    sql.query("SELECT rating FROM ratings WHERE userID = ? AND eventID = ?", [req.body.userID, req.body.eventID], (err, data) => 
    {
        //An error occurred
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while getting user's rating."
            });
            console.log("Error getting user rating: ", { err: err.message, ...req.body });
        }
        //User has not rated event yet, so return null
        else if(data.length == 0) {
            res.status(200).send(null);
        }
        //User has rated already, so return rating value
        else {
            res.status(200).send(data[0]);
        }
    });
});


module.exports = router;