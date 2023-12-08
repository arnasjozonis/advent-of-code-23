
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

const example3 = parseString(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`)

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

  it('should return 2 for example data', () => {
    expect(solutionV2(example3)).toEqual(6);
  });

  it('should return answer V2 for input', () => {
    expect(solutionV2(data)).toEqual(14299763833181);
  });

});
