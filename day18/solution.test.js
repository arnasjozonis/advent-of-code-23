
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';

const example = parseString(`
L 2 (#015232)
U 2 (#7a21e3)
R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
`);

const data = parseTask('day18');

describe('Clumsy Crucible solution', () => {
  // it('should return 62 for example data', () => {
  //   expect(solution(example)).toEqual(62);
  // });

  // it('should return 162 for data', () => {
  //   expect(solution(data)).toEqual(162);
  // });

  it('should return 952408144115 for example data', () => {
    expect(solutionV2(data)).toEqual(952408144115);
  });

});
