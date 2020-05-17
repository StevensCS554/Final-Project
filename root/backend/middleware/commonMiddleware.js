const express = require("express");
const app = express();
// const methodOverride = require('method-override')
// const session = require('express-session');// // It creates a cookie for the browser that will be used to track the current session of the user

// app.use(methodOverride('_method'));

app.use((request, response, next) => {
    const now = new Date();
    console.log(now.toUTCString() + " " + request.method + " " + request.originalUrl);
    next();
});


// // Use the session middleware: create a session-cookie across all the router.
// // session(options)
// // Create a session middleware with the given options.
// // Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
// app.use(
//     session(
//         {
//             name: 'AuthCookie',
//             secret: 'what is your name?',
//             resave: false,
//             saveUninitialized: true,
//         }
//     )
// );

module.exports = app;