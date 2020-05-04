const groupRoute = require("./groups");
// const userRoute = require('./users');

module.exports = (app) => {
    app.use("/group", groupRoute);
    // app.use("/user", userRoute);

    app.use("*", (req, res) => {
        res.status(404).json("Page Not Found");
    })
}