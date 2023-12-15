
import { solution, lineValid } from './solution';
import { parseTask, parseString } from '../utils';
const example0 = parseString(`?###???????? 3,2,1`);
const example16 = parseString(`?###???????? 3,2,1`);
const example1 = parseString(`?#?#?#?#?#?#?#? 1,3,1,6`);

const example = parseString(`???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`);

const data = parseTask('day12');

describe('Hot springs lineValid', () => {
  it('should return true for valid inputs data', () => {
    expect(lineValid('#.#.###', [1,1,3])).toEqual(1);
    expect(lineValid('.#.###.#.######', [1,3,1,6])).toEqual(1);
    expect(lineValid('####.#...#...', [4, 1, 1])).toEqual(1);
  });

  it('should return false for invalid inputs data', () => {
    expect(lineValid('##..###', [1,1,3])).toEqual(0);
    expect(lineValid('###############', [1,3,1,6])).toEqual(0);
    expect(lineValid('####.....##..', [4, 1, 1])).toEqual(0);
  });
});

describe('Hot springs solution', () => {
  // it('should return 10 for example0 data', () => {
  //   expect(solution(example16)).toEqual(10);
  // });

  it('should return 10 for example0 data', () => {
    expect(solution(example0)).toEqual(10);
  });

  // it('should return 21 for example data', () => {
  //   expect(solution(example)).toEqual(21);
  // });

  // it('should return answer for input data', () => {
  //   expect(solution(data)).toEqual(6852);
  // });

  // it('should return 16 for example data', () => {
  //   expect(solution(example506250)).toEqual(0);
  // });

  // it('should return 16 for example data', () => {
  //   expect(solution(example506250, true)).toEqual(506250);
  // });
});



