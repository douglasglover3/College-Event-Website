const express = require("express")
const router = express.Router()

const sql = require("../models/db.js");

router.post("/getUserUniversity", (req, res) => {
    if (!req.body.userID) {
        res.status(500).send({
          message: "Missing User ID."
        });
    }
    
    // Find target user in the database
    sql.query("SELECT * FROM universities U WHERE EXISTS(SELECT * FROM affiliation A WHERE U.universityName = A.universityName AND A.userID = ?)", req.body.userID, (err, data) => {
        if (err) {
            console.log("Error getting User University: ", { err: err.message});
        }
        else {
          res.status(200).send(data);
        }
    });
});

router.post("/getAllUniversities", (req, res) => {
    // Find target user in the database
    sql.query("SELECT DISTINCT universityName FROM universities", (err, data) => {
        if (err) {
            console.log("Error getting Universities: ", { err: err.message });
        }
        else {
          res.status(200).send(data);
        }
    });
});


module.exports = router;