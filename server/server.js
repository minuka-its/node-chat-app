const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('********************************** New user connected **************************************');

  socket.emit('newEmail',{
    from : 'arty@example.com',
    to: 'minuka@example.com',
    text: 'Hey there'
  });

  socket.emit('newMessage',{
    from:'Arty',
    text:'A new message is sent to the chat room',
    createdAt:new Date().getTime()
  })

  socket.on('createEmail',(newEmail)=>{
    console.log('createEmail',newEmail);
  });

  socket.on('createMessage',(newMessage)=>{
    console.log('newMessage',newMessage);
  });
  socket.on('disconnect',()=>{
    console.log('              \\\\\\\\\\\\\\\\\ User disconnected ///////////')
  });
});

server.listen(port,()=>{
  console.log(`App is live on port ${port}`);
});
