import http from 'http';
import express from 'express';
import bodyParser from 'body-parser'; // access body in express middleware
import cookieParser from 'cookie-parser'; // access cookies in express middleware
import io from 'socket.io';
import mongoose from 'mongoose';

const app = express(express()); // app used for express functionality

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const server = http.createServer(app); // server is used directly by socket.io
const socketio = io(server);

// socket.io for realtime communication
socketio.on('connect', (socket) => {
  socket.on('JOIN', room => socket.join(room));

  // rebroadcast all room packets
  socket.use((packet, next) => {
    const [event, room, value] = packet;
    socketio.emit(event, value).to(room);
    next();
  });
});

// mongoose connection to mongodb
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export { app, server };
