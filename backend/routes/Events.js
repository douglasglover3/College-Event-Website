const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");
const Event = require("../models/Events.js");


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
    // Create a new rso
    const newEvent = new Event({
        eventName: req.body.eventName,
        eventType: req.body.eventType,
        sponsor: req.body.sponsor,
        eventDescription: req.body.eventDescription,
        eventTime: req.body.eventTime,
        eventDate: req.body.eventDate,
        contactPhone: req.body.contactPhone,
        contactEmail: req.body.contactEmail,
        locationName: req.body.locationName
    });

    // Find if event name is taken
    sql.query("SELECT * FROM events WHERE eventName = ?", newEvent.eventName, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the RSO."
            });
            console.log("Error creating Event: ", { err: err.message, ...newEvent });
        }
        //No event with this name exists
        else if(data.length == 0) {
            // Save Event in the database
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
        }
        //Event name already exists
        else {
            res.status(400).send({
                message:
                    "Event name is taken."
            });
            console.log("Event name is taken.");
        }
    });
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

    sql.query("SELECT * FROM events E WHERE EXISTS(SELECT * FROM rsoaffiliation A WHERE E.sponsor = A.rsoName AND A.universityName = ?)", req.body.universityName, (err, data) => {
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

module.exports = router;