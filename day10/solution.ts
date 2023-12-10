import { get } from "lodash";

type Pipe = "|" | "-" | "L" | "J" | "7" | "F";
type Direction = "S" | "N" | "E" | "W";
type Position = {
  x: number;
  y: number;
};

const directionToFenceDirection: Record<Pipe, 'I' | '_'> = {
  '|': "I",
  'L': "I",
  'J': "I",
  '7': '_',
  'F': '_',
  "-": '_',
} as const;

const directionOffsets = {
  S: {
    x: 0,
    y: 1
  },
  N: {
    x: 0,
    y: -1
  },
  E: {
    x: 1,
    y: 0
  },
  W: {
    x: -1,
    y: 0
  }
} as const;

const fromToMap = {
  S: "N",
  N: "S",
  E: "W",
  W: "E",
} as const;

const PipeAgenda: Record<Pipe, [Direction, Direction]> = {
  "|": ["N", "S"],
  "-": ["E", "W"],
  L: ["N", "E"],
  J: ["N", "W"],
  7: ["S", "W"],
  F: ["S", "E"],
};

const START = "S";

let globalMap: string[][] = [];

const findStart = (input: string[]) => {
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === START) {
        return { x, y };
      }
    }
  }

  throw new Error("No start found");
};

const applyOffset = (pos: Position, direction: Direction) => {
  const x = pos.x + directionOffsets[direction].x;
  const y = pos.y + directionOffsets[direction].y;
  return {
    x,
    y,
    pipeSymbol: globalMap[y][x] as Pipe,
  }
};

const goToNextPipe = (currentPos: Position, stepDirection: Direction) => {
  const from = fromToMap[stepDirection];
  const nextPipe = applyOffset(currentPos, stepDirection);
  const agenda = PipeAgenda[nextPipe.pipeSymbol];
  const next = agenda?.includes(from) && agenda.find(x => x !== from);

  return {
    nextPos: nextPipe,
    nextDirection: next,
  }
};

const solution = (input: string[]) => {
  globalMap = input.map(x => x.split(''));
  let position = findStart(input);
  let direction: Direction | false | undefined = 'E';
  let count = 0;
  while(direction) {
    const { nextDirection, nextPos} = goToNextPipe(position, direction);
    position = nextPos;
    direction = nextDirection;
    count++;
  }

  return count/2;
};

const solutionV2 = (input: string[], s: Pipe = '7', d: Direction = 'W') => {
  globalMap = input.map(x => x.split(''));
  let position = findStart(input);
  let direction: Direction | false | undefined = d;
  let symbol: Pipe = s;

  let count = 0;
  while(direction) {
    const fenceDir = directionToFenceDirection[symbol];
    globalMap[position.y][position.x] = fenceDir;
    const { nextDirection, nextPos} = goToNextPipe(position, direction);
    
    position = nextPos;
    direction = nextDirection;  
    symbol = nextPos.pipeSymbol;
  }


  for(let row of globalMap) {
    let insideH = 0;
    let c = count;
    for(let cell of row) {
      if(cell === 'I') {
        insideH++;
        continue;
      }
      if(insideH % 2 === 1 && cell !== '_') {
        count++;
      }
    }
  }

  return count;
};

export {  solution, solutionV2 };