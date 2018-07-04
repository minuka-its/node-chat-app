var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate a message with given values',()=>{
    var from = 'Arty';
    var text = 'Test case';
    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toInclude({from,text});
  });
});
