
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`);

const example2 = parseString(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`);

const data = parseTask('day8');


describe('desert map solution', () => {
  it('should return 2 for example data', () => {
    expect(solution(example)).toEqual(2);
  });

  it('should return 6 for example2 data', () => {
    expect(solution(example2)).toEqual(6);
  });

  it('should return answer for input', () => {
    expect(solution(data)).toEqual(18157);
  });

});
