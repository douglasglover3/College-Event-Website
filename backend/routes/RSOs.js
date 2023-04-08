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

module.exports = router;