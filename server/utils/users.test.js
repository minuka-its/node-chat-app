const expect = require('expect');
const {Users} = require('./users');

const {isRealString} = require('./validation');

describe('Users',()=>{

  var users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'1',
      name:'Andrew',
      room:'The Office Fans'
    },{
      id:'2',
      name:'Mathew',
      room:'The Office Room'
    },{
      id:'3',
      name:'Clark',
      room:'The Office Fans'
    }]
  })

  it('should add a new User',()=>{
    var users = new Users();
    var user = {
      id:'123',
      name:'Arty',
      room:'The Office Fansss'
    };
    var resUser  = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  it('shoud return users from Office Fans',()=>{
    var userList = users.getUserList('The Office Fans');
    expect(userList).toEqual(['Andrew','Clark']);
  });

  it('shoud return users from Office Room',()=>{
    var userList = users.getUserList('The Office Room');
    expect(userList).toEqual(['Mathew']);
  });

  it('shoud remove user',()=>{
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('shoud not remove user',()=>{
    var userId = '99';
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('shoud find a user',()=>{
    var userId= '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('shoud not find a user',()=>{
    var userId= '99';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });



})
