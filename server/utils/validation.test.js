const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', function() {
  it('should reject non-string values', function() {
    const nonStr = 3;
    expect(isRealString(nonStr)).toBeFalsy;
  });

  it('should reject string with only spaces', function() {
    const spaces = '     ';
    expect(isRealString(spaces)).toBeFalsy;
  });

  it('should allow string with non-space characters', function() {
    const str = ' S tringy ';
    expect(isRealString(str)).toBeTruthy;
  });
});
