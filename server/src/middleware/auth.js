// This check whether the user is logged in or not
// This runs between going to different routes and will redirect to login
// if the route is protected. 

const jwt = require("jsonwebtoken")
const unprotectedRoutes = [
        "/auth/login",
        "/auth/register",
        "/user/user"
]

const authenticate = async (req, res, next) => {
    const token = req.cookies?.jwtToken || ""

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.verifiedUser = verified
        // console.log("User verification successful!", verified)
        next()
    } catch(err) {
        // console.log("User verification failed")

        if ( unprotectedRoutes.includes(req.path) ) {
            next()
        } else {
            res.redirect(`/`)
        }
    }
}

module.exports = { authenticate }