const commonMiddleware = require("./commonMiddleware");

module.exports = (app) => {
    app.use(commonMiddleware);
}