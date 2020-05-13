const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

// app.use(bodyParser.urlencoded());
app.use(express.json());
// file upload 
app.use(fileUpload());

const configMiddleware = require("./middleware");
configMiddleware(app);

const configRoute = require("./routes");
configRoute(app);

app.listen(process.env.PORT || 4000, process.env.IP, (req, res) => {
    console.log("express start!");
    console.log("http://localhost:4000");
})