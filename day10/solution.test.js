
import { solution, solutionV2 } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`-L|F7
7S-7|
L|7||
-L-J|
L|-JF`);

const example2 = parseString(`7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`);

const example3 = parseString(`...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`);

const example4 = parseString(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ....`)

const example5 = parseString(`FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`)

const data = parseTask('day10');

describe('OASIS solution', () => {
  it('should return 4 for example data', () => {
    expect(solution(example)).toEqual(4);
  });

  it('should return 8 for example2 data', () => {
    expect(solution(example2)).toEqual(8);
  });

  it('should return answer for input data', () => {
    expect(solution(data)).toEqual(6800);
  });

  it('should return 4 for example3 data', () => {
    expect(solutionV2(example3, 'F', 'E')).toEqual(4);
  });

  it('should return 8 for example4 data', () => {
    expect(solutionV2(example4, 'F', 'E')).toEqual(8);
  });

  it('should return 10 for example5 data', () => {
    expect(solutionV2(example5)).toEqual(10);
  });

  it('should return answer for input data', () => {
    expect(solutionV2(data, 'L', 'E')).toEqual(483);
  });
});
