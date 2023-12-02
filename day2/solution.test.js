const example = [
  'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
  'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
  'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
  'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
  'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
];
//only 12 red cubes, 13 green cubes, and 14 blue cubes
const config = {
  red: 12,
  green: 13,
  blue: 14,
};

const { solution, solutionV2 } = require('./solution');
const { parseTask } = require('../utils');
const data = parseTask('day2');

describe('elven cubes game solution', () => {
  it('should return 8 for example data', () => {
    expect(solution(example, config)).toEqual(8);
  });

  it('should return correct result for day2 data', () => {
    expect(solution(data, config)).toEqual(2879);
  });

  it('should return 2286 for example data for v2', () => {
    expect(solutionV2(example)).toEqual(2286);
  });

  it('should return correct result for day2 data v2', () => {
    expect(solutionV2(data)).toEqual(2286);
  });
});