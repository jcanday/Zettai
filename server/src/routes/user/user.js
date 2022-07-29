const axios = require('axios')
const jwt = require("jsonwebtoken")
module.exports = async (req, res,next) => {
    let currentUser;
    currentUser = req.verifiedUser
    // console.log("User Profile", currentUser)
    res.send({ currentUser });
    next()
}