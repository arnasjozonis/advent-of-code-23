
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`);


const data = parseTask('day11');

describe('Galaxies solution', () => {
  it('should return 374 for example data', () => {
    expect(solution(example)).toEqual(374);
  });

  it('should return answer for input data', () => {
    expect(solution(data)).toEqual(9647174);
  });

  it('should return 1030 for example data with k=10', () => {
    expect(solution(example, 10)).toEqual(1030);
  });

  it('should return 8410 for example data with k=100', () => {
    expect(solution(example, 100)).toEqual(8410);
  });

  it('should return answerV2 for input data', () => {
    expect(solution(data, 1000000)).toEqual(377318892554);
  });

});
