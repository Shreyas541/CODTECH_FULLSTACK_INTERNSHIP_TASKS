const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

app.use(cors());
let content = '';

io.on('connection', socket => {
  socket.emit('load', content);
  socket.on('edit', data => {
    content = data;
    socket.broadcast.emit('update', content);
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));
    