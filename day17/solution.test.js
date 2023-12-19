
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
// 23: 13 (W,N,W,W,W,S,W,N,N,N)
// 23: 25 (W,N,W,W,N,W,N,W)
const example0 = parseString(`
218321
911111
229192
999992
`);
// 168: 78 (W,W,W,W,W,W,W,W,W,W,W,N,W,N,N,N,N,N,N,N,N,N,N,N)
// 168: 110 (W,W,N,W,W,S,W,W,W,N,W,W,N,W,N,N,W,N,W,N,N,N,E,N,W,N,N,N)
/**
 * 
 * 
168: 110 (>,>,v,>,>,^,>,>,>,v,>,>,v,>,v,v,>,v,>,v,v,v,<,v,>,v,v,v)
2>> ^>>>  
2>>34^>>>1323
32v>>>35v5623
32552456v>>54
3446585845v52
4546657867v>6
14385987984v4
44578769877v6
36378779796v>
465496798688v
456467998645v
12246868655<v
25465488877v5
43226746555v>
 */
const example = parseString(`
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`);

const data = parseTask('day17');

describe('Clumsy Crucible solution', () => {
  // it('should return x for example data', () => {
  //   expect(solution(example0)).toEqual(17);
  // });

  it('should return 102 for example data', () => {
    expect(solution(example)).toEqual(102);
  });

  // //
});
