const { getCalibatrationsSum, getCalibatrationsSumV2 } = require('./solution');

const { parseTask } = require('../utils');
const data = parseTask('day1');

const example = [
  '1abc2',
  'pqr3stu8vwx',
  'a1b2c3d4e5f',
  'treb7uchet'
]

const exampleV2 = [
  'two1nine',
  'eightwothree',
  'abcone2threexyz',
  'xtwone3four',
  '4nineeightseven2',
  'zoneight234',
  '7pqrstsixteen',
]

describe('getCalibatrationsSum', () => {
  it('should return 142 for the example input', () => {
    expect(getCalibatrationsSum(example)).toBe(142);
  });

  it('shuold return correct answer for challenge data', () => {
    expect(getCalibatrationsSum(data)).toBe(55002);
  })
});

describe('getCalibatrationsSumV2', () => {
  it('should return 281 for the exampleV2 input', () => {
    expect(getCalibatrationsSumV2(exampleV2)).toBe(281);
  });

  it('shuold handle repeated elven numbers as last', () => {
    expect(getCalibatrationsSumV2(['five5bhrghlfiveseventhreeoneseven'])).toBe(57);
  })

  it('shuold return correct answer for challenge dataV2', () => {
    expect(getCalibatrationsSumV2(data)).toBe(55093);
  })

});