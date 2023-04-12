const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");
const Event = require("../models/Events.js");

const crypto = require('crypto');


router.post("/createEvent", (req, res) => {
    if (!req.body.eventName) {
        res.status(400).send({
          message: "Missing Name."
        });
    }
    else if (!req.body.eventType) {
        res.status(500).send({
          message: "Missing event type."
        });
    }
    else if (!req.body.sponsor) {
        res.status(500).send({
          message: "Missing sponsor."
        });
    }

    var eventType = req.body.eventType;
    if(eventType != "Private" && eventType != "RSO")
        eventType = "Unauthorized";

    // Create a new event
    const newEvent = new Event({
        eventID: crypto.randomBytes(64).toString("hex"),
        eventName: req.body.eventName,
        eventType: eventType,
        sponsor: req.body.sponsor,
        eventDescription: req.body.eventDescription,
        eventTime: req.body.eventTime,
        eventDate: req.body.eventDate,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        locationName: req.body.locationName
    });

    //Save Event in the database
    sql.query("INSERT INTO events SET ?", newEvent, (err, data) => 
    {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the event."
            });
            console.log("Error creating Event: ", { err: err.message, ...newEvent });
        }
        else {
            res.status(200).send(data);
            console.log("Successfully created Event: ", newEvent.eventName);
        }
    });
});

router.post("/getUserEvents", (req, res) => {
    if (!req.body.userID) {
        res.status(500).send({
          message: "Missing User ID."
        });
    }
    if (!req.body.eventType) {
        res.status(500).send({
          message: "Missing Event Type."
        });
    }
    var eventData = [];
    var eventType = req.body.eventType;
    
    //RSO events
    if(eventType == "RSO")
    {
        //Event is RSO members only
        sql.query(
            "SELECT * FROM events E WHERE EXISTS(SELECT * FROM membership M WHERE M.rsoName = E.sponsor AND M.userID = ?) AND E.eventType = 'RSO'"
        , req.body.userID, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while getting events."
                });
                console.log("Error getting events: ", { err: err.message });
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    
    //Private events
    else if(eventType == "Private")
    {
        //Event is a private event from an authorized rso that shares the same university as the user
        sql.query(
            "SELECT * FROM events E WHERE EXISTS(SELECT * FROM rsos R, users U WHERE R.rsoName = E.sponsor AND R.authorized = true AND R.universityName = U.universityName AND U.userID = ?) AND E.eventType = 'Private'"
        , req.body.userID, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while getting events."
                });
                console.log("Error getting events: ", { err: err.message });
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    //Public events
    else if(eventType == "Public")
    {

        sql.query(
            "SELECT * FROM events WHERE eventType = 'Public'"
        , req.body.userID, (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while getting events."
                });
                console.log("Error getting events: ", { err: err.message });
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    //All user-related events
    else
    {
        sql.query(
            `SELECT * FROM events E WHERE (EXISTS(SELECT * FROM membership M WHERE M.rsoName = E.sponsor AND M.userID = ?) AND E.eventType = 'RSO')
            OR (EXISTS(SELECT * FROM rsos R, users U WHERE R.rsoName = E.sponsor AND R.authorized = true AND R.universityName = U.universityName AND U.userID = ?) AND E.eventType = 'Private')
            OR (E.eventType = 'Public')
            `
        , [req.body.userID, req.body.userID], (err, data) => {
            if (err) {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while getting events."
                });
                console.log("Error getting events: ", { err: err.message });
            }
            else {
                res.status(200).send(data);
            }
        });
    }
});

router.post("/getRSOEvents", (req, res) => {
    if (!req.body.rsoName) {
        res.status(500).send({
          message: "Missing RSO Name."
        });
    }

    sql.query("SELECT * FROM events WHERE sponsor = ?", req.body.rsoName, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding events."
            });
            console.log("Error getting events: ", { err: err.message });
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post("/getUniversityEvents", (req, res) => {
    if (!req.body.universityName) {
        res.status(500).send({
          message: "Missing University Name."
        });
    }
    //Only includes events from authorized sponsors from the university
    sql.query("SELECT * FROM events E WHERE EXISTS(SELECT * FROM rsos R WHERE E.sponsor = R.rsoName AND R.authorized = true AND R.universityName = ?) AND E.eventType = 'Public'", req.body.universityName, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding events."
            });
            console.log("Error getting events: ", { err: err.message });
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post("/getUnauthorizedEvents", (req, res) => {
    if (!req.body.universityName) {
        res.status(500).send({
          message: "Missing university name."
        });
    }
    //Only includes events from authorized sponsors from the university
    sql.query("SELECT * FROM events E WHERE EXISTS(SELECT * FROM rsos R WHERE E.sponsor = R.rsoName AND R.universityName = ?) AND E.eventType = 'Unauthorized'", req.body.universityName, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding events."
            });
            console.log("Error getting events: ", { err: err.message });
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post("/approveEvent", (req, res) => {
    if (!req.body.eventID) {
        res.status(500).send({
          message: "Missing eventID."
        });
    }
    //Only includes events from authorized sponsors from the university
    sql.query("UPDATE events SET eventType = 'Public' WHERE eventID = ?", req.body.eventID, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while approving event."
            });
            console.log("Error approving: ", { err: err.message });
        }
        else {
            res.status(200).send(data);
        }
    });
});

module.exports = router;