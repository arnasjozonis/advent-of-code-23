
const example = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
];

const example2 = [
  'Card   1:  2 15 17 11 64 59 45 41 61 19 |  4 36 62 43 94 41 24 25 13 83 97 86 61 90 67  7 15 58 18 19 38 17 49 52 37', // 16
  'Card   2: 41 62 67 93 88 12 78 51 95 49 | 55 63 89 78 45 11 62 50 81  9 32 82 15 36 74 54  4 58  5 56 44 83 90 49 34', // 4
  'Card   3: 51 22 38 33 85 23 56 76 60 93 | 94 40 61 37 38 82 93 96 13 50 81 65 56 26  4 18 86 30  8 16 60 27 23 48 51', // 32
  'Card   4: 51  6 90 10 97 65 19 17 24  3 | 93 82 10 13 17  3 90 74 14  7 77 38 70 97 72 60  6 79 65 94 24 19 51 45 28', // 512
]

const { solution, solutionV2 } = require('./solution');
const { parseTask } = require('../utils');
const data = parseTask('day4');

describe('elven engine parts solution', () => {
  it('should return 13 for example data', () => {
    expect(solution(example)).toEqual(13);
  });

  it('should return 13 for example data', () => {
    expect(solution(example2)).toEqual(564);
  });

  it('should return correct answer for input data', () => {
    expect(solution(data)).toEqual(15205);
  });

  it('should return 30 for example data for v2', () => {
    expect(solutionV2(example)).toEqual(30);
  });

  it('should return correct result for day3 data v2', () => {
    expect(solutionV2(data)).toEqual(6189740);
  });
});