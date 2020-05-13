const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

// app.use(bodyParser.urlencoded());
app.use(express.json());
// cookie parser middleware
app.use(cookieParser());
app.use(session({
   name: "sessionId",
   resave: false,
   saveUninitialized: false,
   secret: "it is a secret!",
   cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
   }
}));

const configMiddleware = require("./middleware");
configMiddleware(app);

const configRoute = require("./routes");
configRoute(app);

app.listen(process.env.PORT || 4000, process.env.IP, (req, res) => {
   console.log("express start!");
   console.log("http://localhost:4000");
})