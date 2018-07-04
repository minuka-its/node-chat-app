const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('********************************** New user connected **************************************');


  socket.emit('Notice',generateMessage('Admin','Welcome to ChatApp'));

  socket.broadcast.emit('Notice',generateMessage('Admin','A new user Conneted to the server'));


  socket.on('createMessage',(newMessage)=>{
    console.log('newMessage',newMessage);
    io.emit('newMessage',generateMessage(newMessage.from,newMessage.text));
  });
  socket.on('disconnect',()=>{
    console.log('              \\\\\\\\\\\\\\\\\ User disconnected ///////////')
  });
});

server.listen(port,()=>{
  console.log(`App is live on port ${port}`);
});
