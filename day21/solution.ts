let width = 1000;
let height = 1000;

type Position = [row: number, col: number]

const positionToSequence = ([row,col]: Position) => {
  if(row < 0 || row >= height || col < 0 || col >= width) {
    return undefined;
  }
  return row * width + col;
}

type Node = {
  key: number;
  paths: number[];
}

type Edge = `${number}-${number}`;

const parseInput = (input: string[]) => {
  width = input[0].length;
  height = input.length;
  const mapNodes = new Map<number, Node>();
  const edges = new Set<Edge>();
  let start = 0;
  for(let y = 0; y < height; y++) {
    for(let x = 0; x < width; x++) {
      const seq = positionToSequence([y, x]);
      if(seq === undefined) {
        continue;
      }
      const char = input[y][x];
      if(char === '#') {
        continue;
      }
      if(char === 'S') {
        start = positionToSequence([y,x])!;
      }
      const paths: number[] = [];

      const up: Position = [y - 1, x];
      const down: Position = [y + 1, x];
      const left: Position = [y, x - 1];
      const right: Position = [y, x + 1];

      [up, down, left, right].forEach(([y,x]) => {
        const pathSeq = positionToSequence([y,x]);        
        if(pathSeq && input[y][x] !== '#') {
          paths.push(pathSeq);
          const edge = [seq, pathSeq].sort().join('-') as Edge;
          edges.add(edge);
        }
      });

      const node: Node = {
        key: seq,
        paths
      }
      mapNodes.set(seq, node);
    }
  }

  return {
    mapNodes,
    edges,
    start
  }
}

const getAllPossibleEndPositions = (startNodes: Set<number>, mapNodes: Map<number, Node>) => {
  const result = new Set<number>();
  startNodes.forEach(startNode => {
    const node = mapNodes.get(startNode);
    if(!node) {
      throw new Error(`Node ${startNode} not found`);
    }
    const { paths } = node;
    paths.forEach(path => {
      result.add(path);
    });
  });

  return result;
}

const solution = (input: string[], steps = 6) => {
  const { mapNodes, edges, start } = parseInput(input);
  let startNodes = new Set<number>();
  startNodes.add(start);
  for(let i = 0; i < steps; i++) {
    startNodes = getAllPossibleEndPositions(startNodes, mapNodes);
  }

  return startNodes.size;
}


const solutionV2 = (input: string[]) => {
 

  
}

export {  solution, solutionV2 };