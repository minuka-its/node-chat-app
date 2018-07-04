var socket = io();

socket.on('connect',function (){
  console.log('server running!');

  socket.emit('createEmail',{
    from:'nicolas@cage.com',
    to: 'Priya@ggwp.com',
    text : 'email body goes here'
  });

  socket.emit('createMessage',{
    from:'Arty',
    text:'A text from user'
  });
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
