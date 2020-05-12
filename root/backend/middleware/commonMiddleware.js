const express = require("express");
const app = express();
const methodOverride = require('method-override')
// const session = require('express-session');// // It creates a cookie for the browser that will be used to track the current session of the user

app.use(methodOverride('_method'));

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

// // for every request made to the server
// function userSessionCookie(request, response, next) {
//     // console.log('The request has all the following session cookies:');
//     // console.log(request.session);

//     // Current Timestamp: new Date().toUTCString()
//     // Request Method: req.method
//     // Request Route: req.originalUrl
//     // Some string/boolean stating if a user is authenticated
//     const now = new Date();;
//     let auth = request.session.authenticate;
//     if (auth) {
//         authenticated = request.session.authenticate;
//     }
//     else {
//         var authenticated = false;
//     }
//     console.log(now.toUTCString() + " " + request.method + " " + request.originalUrl + " UserAuthenticated:" + authenticated);
//     next();
// }
// app.use(userSessionCookie);