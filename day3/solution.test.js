
const example = [
  '467..114..',
  '...*......',
  '..35..633.',
  '......#...',
  '617*......',
  '.....+.580',
  '..592.....',
  '......755.',
  '...$.*....',
  '.664.598..',
];

const { solution, solutionV2 } = require('./solution');
const { parseTask } = require('../utils');
const data = parseTask('day3');

describe('elven engine parts solution', () => {
  it('should return 4361 for example data', () => {
    expect(solution(example)).toEqual(4361);
  });

  it('should return correct answer for input data', () => {
    expect(solution(data)).toEqual(514969);
  });

  it('should return 467835 for example data for v2', () => {
    expect(solutionV2(example)).toEqual(467835);
  });

  it('should return correct result for day3 data v2', () => {
    expect(solutionV2(data)).toEqual(78915902);
  });
});