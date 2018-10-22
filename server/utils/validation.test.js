const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const nonStr = 3;
    expect(isRealString(nonStr)).toBeFalsy;
  });

  it('should reject string with only spaces', () => {
    const spaces = '     ';
    expect(isRealString(spaces)).toBeFalsy;
  });

  it('should allow string with non-space characters', () => {
    const str = ' S tringy ';
    expect(isRealString(str)).toBeTruthy;
  });
});
