const expect = require('expect');

var { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('shoud generate correct message object', () => {
    const from = 'Kevin';
    const text = 'some message here';
    const message = generateMessage(from, text);

    expect(message).toMatchObject({
      from,
      text
    });
    expect(typeof message.createdAt).toBe('number');
  });
});
