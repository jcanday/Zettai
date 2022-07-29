// export all route sections here
module.exports = function(app) {
    app.use("/auth", require("./auth"))
    app.use("/user", require("./user"))
    app.use("/anime", require("./anime"))
};