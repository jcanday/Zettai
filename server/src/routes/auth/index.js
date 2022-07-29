const MainAuthRouter = require("express").Router()

MainAuthRouter.route("/login")
    .post(require(("./login.js")))

MainAuthRouter.route("/register")
    .post(require(("./register.js")))

MainAuthRouter.route("/logout")
    .post(require("./logout"))
module.exports = MainAuthRouter