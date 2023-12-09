
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`);


const data = parseTask('day9');

describe('OASIS solution', () => {
  it('should return 114 for example data', () => {
    expect(solution(example)).toEqual(114);
  });

  it('should return answer for input data', () => {
    expect(solution(data)).toEqual(1995001648);
  });


  it('should return 12 for example data', () => {
    expect(solutionV2(example)).toEqual(2);
  });

  it('solutionV2 should return answer for input data', () => {
    expect(solutionV2(data)).toEqual(988);
  });


});
