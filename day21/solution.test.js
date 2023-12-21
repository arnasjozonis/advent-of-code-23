
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';

const example = parseString(`...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`);

const data = parseTask('day21');

describe('Aplenty solution', () => {
  it('should return 16 for example data', () => {
    expect(solution(example)).toEqual(16);
  });

  it('should return answer for input data', () => {
    expect(solution(data, 64)).toEqual(0);
  });

  // it('should return 16 for example data', () => {
  //   expect(solutionV2(example)).toEqual(16);
  // });

  // it('should return answer for input data', () => {
  //   expect(solutionV2(data)).toEqual(4000 * 4000 * 4000 * 4000);
  // });

});
