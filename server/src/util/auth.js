// This creates a function that creates tokens for my users. 

const jwt = require("jsonwebtoken")

const createJwtToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = { createJwtToken }