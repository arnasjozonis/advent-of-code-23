type Direction = 'U' | 'D' | 'L' | 'R';
type Element =  '.' | '/' | '\\' | '-' | '|'
type Position = [row: number, column: number];

const FromToMap = {
  'U': {
    '/': 'R',
    '\\': 'L',
    '-': 'LR',
    '|': 'U',
    '.': 'U'
  },
  'D': {
    '/': 'L',
    '\\': 'R',
    '-': 'LR',
    '|': 'D',
    '.': 'D'
  },
  'L': {
    '/': 'D',
    '\\': 'U',
    '-': 'L',
    '|': 'DU',
    '.': 'L'
  },
  'R': {
    '/': 'U',
    '\\': 'D',
    '-': 'R',
    '|': 'DU',
    '.': 'R'
  }
} as const

const mapDirectionToNextPosition = (direction: Direction, position: Position): Position => {
  const [row, column] = position;
  switch(direction) {
    case 'U': return [row - 1, column];
    case 'D': return [row + 1, column];
    case 'L': return [row, column - 1];
    case 'R': return [row, column + 1];
  }
}

let energized: Direction[][][] = [];
let globalMap: string[] = [];

const positionIsValid = (position: Position, dirFrom: Direction): boolean => {
  const [row, column] = position;
  const cell = energized[row]?.[column];
  if(cell?.includes(dirFrom)) {    
    return false;
  }
  return row >= 0 && row < globalMap.length && column >= 0 && column < globalMap[0].length;
}

const solve = (start: Position = [0,0], direction: Direction = 'R') => {
  let [row, col]: Position = start;
  let currDirection = direction;

  while(positionIsValid([row, col], currDirection)) {
    const cell = energized[row][col];
    energized[row][col] = cell.concat(currDirection);
    
    const element = globalMap[row][col] as Element;
    const [dir1, dir2] = FromToMap[currDirection][element].split('') as [Direction, Direction | undefined];
    
    if(dir2) {
      const nextPos = mapDirectionToNextPosition(dir2, [row, col]);
      solve(nextPos, dir2);
    }

    currDirection = dir1;
    [row, col] = mapDirectionToNextPosition(currDirection, [row, col]);
  }
};

const solution = (input: string[], start: Position = [0,0], direction: Direction = 'R') => {
  const width = input[0].length;
  const height = input.length;
  globalMap = input;
  energized = new Array(height).fill(0).map(() => new Array(width).fill([]));

  solve(start, direction);

  return energized.reduce((acc, row) => acc + row.reduce((acc, cell) => acc + (cell.length ? 1 : 0), 0), 0);
}

const solutionV2 = (input: string[]) => {
  const results: number[] = [];

  for(let rowIdx = 0; rowIdx < input.length; rowIdx++) {
    results.push(solution(input, [rowIdx, 0], 'R'));
    results.push(solution(input, [rowIdx, input[rowIdx].length - 1], 'L'));
  }

  for(let colIdx = 0; colIdx < input[0].length; colIdx++) {
    results.push(solution(input, [0, colIdx], 'D'));
    results.push(solution(input, [input.length - 1, colIdx], 'U'));
  }

  return Math.max(...results);
}

export {  solution, solutionV2 };