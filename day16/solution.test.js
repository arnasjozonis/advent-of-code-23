
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';

const example = parseString(`.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`);

const data = parseTask('day16');

describe('The Floor Will Be Lava solution', () => {
  it('should return 46 for example data', () => {
    expect(solution(example)).toEqual(46);
  });

  it('should return answer for data data', () => {
    expect(solution(data)).toEqual(7067);
  });

  it('should return 51 for example data', () => {
    expect(solutionV2(example)).toEqual(51);
  });

  it('V2 should return answer for data data', () => {
    expect(solutionV2(data)).toEqual(0);
  });
});
