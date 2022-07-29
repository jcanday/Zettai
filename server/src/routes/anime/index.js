const MainAuthRouter = require("express").Router()

MainAuthRouter.route("/animes")
    .post(require(("./animes.js")))

MainAuthRouter.route("/deleteAnime")
    .post(require(("./deleteAnime.js")))

module.exports = MainAuthRouter