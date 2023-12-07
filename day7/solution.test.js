
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`);

const data = parseTask('day7');


describe('camel poker solution', () => {
  it('should return 6440 for example data', () => {
    expect(solution(example)).toEqual(6440);
  });

  it('should return correct answer for input data', () => {
    expect(solution(data)).toEqual(251545216);
  });

  it('should return 5905 for example data v2', () => {
    expect(solutionV2(example)).toEqual(5905);
  });

  it('should return correct answer for input data v2', () => {
    expect(solutionV2(data)).toEqual(250384185);
  });
});
