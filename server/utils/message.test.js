var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate a message with given values',()=>{
    var from = 'Arty';
    var text = 'Test case';
    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from,text});
  });
});

describe('generateLocationMessage',()=>{
  it('should generate a message with users location',()=>{
    var from = 'Arty';
    var text = 'Test case';
    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from,text});
    var from = 'Arty';
    var latitude = '222';
    var longitude = '111';
    var url = 'https://www.google.com/maps?q=222,111';

    var message = generateLocationMessage(from, latitude, longitude);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from,url});
  });
});
