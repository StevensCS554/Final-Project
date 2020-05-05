const groupRoute = require("./groups");
const userRoute = require('./users');

module.exports = (app) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      });

    app.use("/group", groupRoute);
    app.use("/user", userRoute);

    app.use("*", (req, res) => {
        res.status(404).json("Page Not Found");
    })
}