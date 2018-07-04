var socket = io();

socket.on('connect',function (){
  console.log('server running!');

  socket.emit('createEmail',{

  });
});

socket.on('Notice',function(welcome){
  console.log('Notice',welcome);
});
socket.on('disconnect',function (){
  console.log('Servr connection lost');
});

socket.on('newEmail',function (email) {
  console.log('New Email',email);
});

socket.on('newMessage',function(message){
  console.log('New Message',message);
});
