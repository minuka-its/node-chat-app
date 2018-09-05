  const path = require('path');
  const http = require('http');
  const express = require('express');
  const socketIO = require('socket.io');

  const {generateMessage, generateLocationMessage} = require('./utils/message');
  const {isRealString} = require ('./utils/validation');
  const {Users} = require('./utils/users');
  const publicPath = path.join(__dirname,'../public');
  const port = process.env.PORT || 3000;
  var app = express();
  var server = http.createServer(app);
  var io = socketIO(server);


  var users = new Users();

  app.use(express.static(publicPath));

  io.on('connection',(socket)=>{
    console.log('********************************** New user connected **************************************');

    socket.on('join',(params, callBack)=>{
      if(!isRealString(params.name) || !isRealString(params.room))
      {
        return callBack('Name and Room Name are required');
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      //io.emit - emits to all conneted users
      //socket.broadcast.emit - everybody except current user
      //socket.emit - specifically to one user

      socket.emit('newMessage',generateMessage('Admin','Welcome to ChatApp'));

      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Server',`${params.name} has joined`));
      callBack();
    });


    socket.on('createMessage',(message,callBack)=>{
      console.log('createMessage',message);
      io.emit('newMessage',generateMessage(message.from,message.text));
      callBack('Server Response');
    });

    socket.on('createLocationMessage',(coords)=>{
      io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    })


    socket.on('disconnect',()=>{
      console.log('              ////////////////// User disconnected ///////////');
      var user = users.removeUser(socket.id);
      if(user){
        io.to(user.room).emit('updateUserList',users.getUserList(user.room));
        io.to(user.room).emit('newMessage',generateMessage('server',`${user.name} left`));
      }
    });
  });

  server.listen(port,()=>{
    console.log(`App is live on port ${port}`);
  });
