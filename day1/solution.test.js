const { getCalibatrationsSum } = require('./solution');
const data = require('./input');
const example = [
  '1abc2',
  'pqr3stu8vwx',
  'a1b2c3d4e5f',
  'treb7uchet'
]

describe('getCalibatrationsSum', () => {
  it('should return 142 for the example input', () => {
    expect(getCalibatrationsSum(example)).toBe(142);
  });

  it('shuold return correct answer for challenge data', () => {
    expect(getCalibatrationsSum(data)).toBe(55002);
  })
});
