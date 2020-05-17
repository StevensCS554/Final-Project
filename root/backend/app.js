const express = require("express");
const redis = require('redis')
const session = require('express-session');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');


let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
 
app.use(cors({
   credentials: true,
   origin: 'http://localhost:3000'
}))

app.use(cookieParser());

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
       maxAge: 60 * 1000 * 5
    }
  })
)

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
