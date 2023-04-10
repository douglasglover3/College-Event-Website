const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");
const RSO = require("../models/RSOs.js");


router.post("/createRSO", (req, res) => {
    if (!req.body.rsoName) {
        res.status(400).send({
          message: "Missing Name."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }
    // Create a new rso
    const newRSO = new RSO({
        rsoName: req.body.rsoName,
    });

    // Find if rso name is taken
    sql.query("SELECT * FROM rsos WHERE rsoName = ?", newRSO.rsoName, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the RSO."
            });
            console.log("Error creating RSO: ", { err: err.message, ...newRSO });
        }
        //No rso with this name exists
        else if(data.length == 0) {
            // Save RSO in the database
            sql.query("INSERT INTO rsos SET ?", newRSO, (err, data) => 
                {
                    if (err) {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the RSO."
                        });
                        console.log("Error creating RSO: ", { err: err.message, ...newRSO });
                    }
                    else {
                        sql.query("INSERT INTO membership(rsoName, userID, joinDate) VALUES(?,?, NOW())", [newRSO.rsoName, req.body.userID], (err, data) => 
                        {
                            if (err) {
                                res.status(500).send({
                                    message:
                                        err.message || "Some error occurred while creating the RSO."
                                });
                                console.log("Error creating RSO: ", { err: err.message, ...newRSO });
                            }
                            else {
                                res.status(200).send(data);
                                console.log("Successfully created RSO: ", newRSO.rsoName);
                            }
                        });
                        
                    }
                });
        }
        //RSO name is taken
        else {
            res.status(400).send({
            message:
                "RSO name is taken."
            });
            console.log("RSO name is taken.");
        }
    });
});

router.post("/joinRSO", (req, res) => {
    if (!req.body.rsoName) {
        res.status(400).send({
          message: "Missing Name."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }

    sql.query("INSERT INTO membership(rsoName, userID, joinDate) VALUES(?,?, NOW())", [req.body.rsoName, req.body.userID], (err, data) => 
    {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while joining the RSO."
            });
            console.log("Error joining RSO: ", { err: err.message});
        }
        else {
            res.status(200).send(data);
            console.log("Successfully joined RSO: ", req.body.rsoName);
        }
    });
});

router.post("/leaveRSO", (req, res) => {
    if (!req.body.rsoName) {
        res.status(400).send({
          message: "Missing Name."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }

    sql.query("DELETE FROM membership WHERE rsoName = ? AND userID = ?", [req.body.rsoName, req.body.userID], (err, data) => 
    {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while leaving the RSO."
            });
            console.log("Error leaving RSO: ", { err: err.message});
        }
        else {
            res.status(200).send(data);
            console.log("Successfully left RSO: ", req.body.rsoName);
        }
    });
});

router.post("/getUserRSOs", (req, res) => {
    if (!req.body.userID) {
        res.status(500).send({
          message: "Missing User ID."
        });
    }

    sql.query("SELECT * FROM rsos R WHERE EXISTS(SELECT * FROM membership M WHERE R.rsoName = M.rsoName AND M.userID = ?)", req.body.userID, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding RSOs."
            });
            console.log("Error getting RSOs: ", { err: err.message });
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post("/isUserMember", (req, res) => {
    if (!req.body.rsoName) {
        res.status(400).send({
          message: "Missing Name."
        });
    }
    else if (!req.body.userID) {
        res.status(500).send({
          message: "Missing user ID."
        });
    }

    sql.query("SELECT * FROM membership WHERE rsoName = ? AND userID = ?", [req.body.rsoName, req.body.userID], (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding RSOs."
            });
            console.log("Error getting RSOs: ", { err: err.message });
        }
        else {
            if(data.length == 0)
                res.status(200).send(false);
            else
                res.status(200).send(true);
        }
    });
});

router.post("/getUniversityRSOs", (req, res) => {
    if (!req.body.universityName) {
        res.status(500).send({
          message: "Missing University Name."
        });
    }

    sql.query("SELECT * FROM rsos R WHERE EXISTS(SELECT * FROM rsoaffiliation A WHERE R.rsoName = A.rsoName AND A.universityName = ?)", req.body.universityName, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while finding RSOs."
            });
            console.log("Error getting RSOs: ", { err: err.message });
        }
        else {
            res.status(200).send(data);
        }
    });
});

module.exports = router;