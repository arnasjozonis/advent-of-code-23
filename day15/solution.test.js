
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';

const example0 = [`HASH`];
const example = parseString(`rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`);

const data = parseTask('day15');

describe('HASHMAP solution', () => {

  it('should return 52 for example0 data', () => {
    expect(solution(example0[0])).toEqual(52);
  });

  it('should return 1320 for example data', () => {
    expect(solution(example[0])).toEqual(1320);
  });

  it('should return answer for input data', () => {
    expect(solution(data[0])).toEqual(509152);
  });

  it('should return 145 for example data', () => {
    expect(solutionV2(example[0])).toEqual(145);
  });

  it('V2 should return answer for input data', () => {
    expect(solutionV2(data[0])).toEqual(244403);
  });
  
});
