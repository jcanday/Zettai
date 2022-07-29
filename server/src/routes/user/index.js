const MainAuthRouter = require("express").Router()

MainAuthRouter.route("/user")
    .get(require(("./user.js")))
MainAuthRouter.route("/user-addAnime")
    .post(require(("./user-addAnime.js")))  
MainAuthRouter.route("/username")
    .post(require(("./user-userName.js"))) 
module.exports = MainAuthRouter