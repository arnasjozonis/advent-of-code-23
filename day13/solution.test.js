
import { solution, isMirroredColumn, isMirroredRow, solutionV2, solveWithSmudges } from './solution';
import { parseTask, parseString } from '../utils';
const example = parseString(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`, true);

const example1 = parseString(`#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`);

const example2 = parseString(`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.`);

const example3 = parseString(`.###..##.
.....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`);

const example4 = parseString(`######...##
.#####...##
#.#####..##
#.#.#.#.#..
###.#..#...
..#.....##.
#....##.##.
#....##.##.
..#.....##.
###.#..#...
#.#.#.#.#..`);

const example5 = parseString(`##.....#...
##.....#...
#..###....#
##.#..#.##.
#..#####..#
#.#....#.#.
.##.##....#
.###..###.#
...#.......
....#.#.###
#......#.##
...#.##....
...#.##....
#......#.##
....#.#.###
...#.......
.###..#####`);


const data = parseTask('day13', true);

describe('utilities funcs', () => { 
  it('should return true', () => {
    expect(isMirroredRow(example1, 3)).toEqual(true);
  });

  it('should return false', () => {
    expect(isMirroredRow(example1, 4)).toEqual(false);
  });

  it('should return false', () => {
    expect(isMirroredRow(example1, 0)).toEqual(false);
  });

  it('should return true', () => {
    expect(isMirroredColumn(example2, 4)).toEqual(true);
  });

  it('should return false', () => {
    expect(isMirroredColumn(example2, 5)).toEqual(false);
  });

  it('should return false', () => {
    expect(isMirroredColumn(example2, 0)).toEqual(false);
  });
 });

describe('Rock and ash patterns solution', () => {
  it('should return 0 for example3 data', () => {
    expect(solution(example3)).toEqual(0);
  });

  it('should return 405 for example data', () => {
    expect(solution(example)).toEqual(405);
  });

  it('should return answer for input data', () => {
    expect(solution(data)).toEqual(33520);
  });

  it('v2 should return 400 for example data', () => {
    expect(solutionV2(example)).toEqual(400);
  });

  it('returns answer for input data', () => {
    expect(solutionV2(data)).toEqual(34824);
  });

  it('works with smudges', () => {
    expect(solveWithSmudges(example4)).toEqual(100);
  })

  it('works with smudges', () => {
    expect(solveWithSmudges(example5)).toEqual(1200);
  })
});
