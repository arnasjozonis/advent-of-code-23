
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`Time:      7  15   30
Distance:  9  40  200`);

const data = parseTask('day6');


describe('elven boat race solution', () => {
  it('should return 288 for example data', () => {
    expect(solution(example)).toEqual(288);
  });

  it('should return correct answer for input data', () => {
    expect(solution(data)).toEqual(608902);
  });

  it('should return 71503 for example data v2', () => {
    expect(solutionV2(example)).toEqual(71503);
  });

  it('should return correct answer for input data v2', () => {
    expect(solutionV2(data)).toEqual(0);
  });
});
