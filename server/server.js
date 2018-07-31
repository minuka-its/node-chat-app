const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('********************************** New user connected **************************************');


  socket.emit('newMessage',generateMessage('Admin','Welcome to ChatApp'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','A new user Conneted to the server'));


  socket.on('createMessage',(message,callBack)=>{
    console.log('createMessage',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callBack('Server Response');
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  })


  socket.on('disconnect',()=>{
    console.log('              ////////////////// User disconnected ///////////')
  });
});

server.listen(port,()=>{
  console.log(`App is live on port ${port}`);
});
