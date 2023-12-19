import { first, sortBy, toFinite } from "lodash";

type Direction = '<' | '>' | 'v' | '^';
let width = 1000;
let height = 1000;

const positionToSequence = ([row,col]: [row: number, col: number]) => {
  if(row < 0 || row >= height || col < 0 || col >= width) {
    return undefined;
  }
  return row * width + col;
}

const sequenceToPosition = (sequence: number) => {  
  return [Math.floor(sequence / width), sequence % width];
}

const mapDirToNextSeq = (direction: Direction, currSeq: number) => {
  const [row, column] = sequenceToPosition(currSeq);
  switch(direction) {
    case '^': return positionToSequence([row + 1, column]);
    case 'v': return positionToSequence([row - 1, column]);
    case '>': return positionToSequence([row, column - 1]);
    case '<': return positionToSequence([row, column + 1]);
  }
}

const allDirs = ['v', '>', '<', '^'] as const;

const pathValid = (path: Direction[]) => {
  
  if(path.length < 4) {
    return true;
  }
  const lastSteps = path.slice(-4);
  const last = lastSteps[lastSteps.length - 1];

  const tooLongStraight = lastSteps.every(step => step === last);

  return !tooLongStraight;
}

const keyValid = (key?: number) => {
  if(!key) {
    return false;
  }

  const min = 0;
  const max = width * height - 1;
  return key >= min && key <= max;
}

const DirFlip = {
  '^': 'v',
  'v': '^',
  '>': '<',
  '<': '>'
} as const

const checkTurnRetrospective = (seq: number, path: Direction[]) => {
  const [row, col] = sequenceToPosition(seq);
  const lastTurn = path.slice()
  
}

const findAdjecent = (sequence: number, prevDirections: Direction[]) => {
  const lastDir = prevDirections[prevDirections.length - 1];
  return allDirs
    .filter(dir => dir !== lastDir)
    .map(dir => ({
      key: mapDirToNextSeq(dir, sequence),
      path: [...prevDirections, DirFlip[dir]]
    }))
    .filter(({key}) => keyValid(key)) as {key: number, path: Direction[]}[];
}

const solution = (input: string[]) => {
  width = input[0].length;
  height = input.length;
  const destination = positionToSequence([input.length - 1, input[0].length - 1])!;

  let vertices: { sequenceNo: number, weight: number, path: Direction[]}[] = [];
  input.forEach((row, rowIdx) => {
    row.split('').forEach((col, colIdx) => {
      const sequenceNo = positionToSequence([rowIdx, colIdx])!;
      const weight = sequenceNo === 0 ? 0 : Infinity;
      vertices.push({sequenceNo, weight, path: []});
    })
  });

  const shortestPaths: number[] = [];
 


  while(shortestPaths.length < vertices.length){
    const sortedVertices = sortBy(vertices, 'weight');
    const nextVertex = sortedVertices.find(({sequenceNo}) => !shortestPaths.includes(sequenceNo))!;
    
    shortestPaths.push(nextVertex.sequenceNo);  

    const adjecent = findAdjecent(nextVertex.sequenceNo, nextVertex.path);
    const weightSoFar = nextVertex.weight;

    if(adjecent.length === 0) {
      break;
    }

    const invalidPath = adjecent.find(({path}) => !pathValid(path));
    if(invalidPath) {      
      const turn = invalidPath.path.slice(-4)[0];
      const desicionPoint = shortestPaths.slice(-5)[0];
      console.log(`
        Invalid path: ${invalidPath.path.join('')}
        Turn: ${turn}
        Desicion point: ${desicionPoint}
        lastPoints: ${shortestPaths}
        constCurrNr: ${nextVertex.sequenceNo}
        invalidNodeNr: ${invalidPath.key}
      `);
    }

    adjecent.filter(({path}) => pathValid(path)).forEach(({key, path}) => {     
      try { 
        const vertex = vertices.find(({sequenceNo}) => sequenceNo === key)!;
        const [row, col] = sequenceToPosition(key);
        const weight = parseInt(input[row][col]);
        if(weightSoFar + weight < vertex.weight) {
          vertex.weight = weightSoFar + weight;
          vertex.path = path;
        }
      } catch(e) {        
        console.log(e);
        throw new Error(`Could not find vertex with sequenceNo ${key}`);
      }
    });
  }
        // console.log(`
        //   ${vertices.map(({sequenceNo, weight, path}) => `${sequenceNo}: ${weight} (${path})`).join('\n')}
        // `
        // )
  return vertices.find(({sequenceNo}) => sequenceNo === destination)!.weight
}

const solutionV2 = (input: string[]) => {
  
}

export {  solution, solutionV2 };