const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();


// app.use(cookieParser());
// app.use(bodyParser.urlencoded());
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

app.use(express.json());
const configMiddleware = require("./middleware");
configMiddleware(app);

const configRoute = require("./routes");
configRoute(app);

const server = app.listen(process.env.PORT || 4000, process.env.IP, (req, res) => {
   console.log("express start!");
   console.log("http://localhost:4000");
});

const io = require('socket.io')(server);
const chat = io.of('/chat');

chat.on('connect', (socket) => {
   socket.on('join', ({ name, room }) => {
      this.socket_userName = name;
      this.socket_room = room;
      socket.join(room);
      socket.emit('message', { user: 'Admin', text: `You have join the room ${room}.` });
      socket.broadcast.to(room).emit('message', { user: 'Admin', text: `${name} has joined this room!` });
   });

   socket.on('message', ({ name, room, message }) => {
      chat.to(room).emit('message', { user: name, text: message });
   });

   socket.on('disconnect', () => {
      socket.leave(this.socket_room);
      chat.to(this.socket_room).emit('message', { user: 'Admin', text: `${this.socket_userName} has left this room.` });
   })
});
