const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errors/errorHandler');
const connectDatabase = require('./helpers/database/connectDatabase');
require('dotenv').config({ path: './config/.env' });

// Database connection
connectDatabase();

// Cors
app.use(cors());

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(express.json());

// Routes
app.use('/api', routes);

app.use((req, res) => res.send('Chat App Api Wrong Route'));

app.use(errorHandler);

// Socket
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('online', { online: true });

  socket.on('all channels', (channels, id) => {
    socket.join(id);
    channels.forEach((channel) => {
      socket.join(channel._id);
    });
  });

  socket.on('online users', (channelId, userId) => {
    socket.to(channelId).emit('online users', userId);
  });

  socket.on('iam online', (to, who) => {
    socket.to(to).emit('iam online', who);
  });

  socket.on('iamnot online', (to, who) => {
    socket.to(to).emit('iamnot online', who);
  });

  socket.on('join channel', (newChannel) => {
    // socket.leave(oldChannel);
    socket.join(newChannel);
  });

  socket.on('new message', (message) => {
    socket.to(message.to).emit('new message', { message });
  });

  socket.on('new private channel', (user, channel) => {
    socket.to(user).emit('new private channel', channel);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('online', { online: false });
    console.log('a user disconnected');
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
