import { identity } from "lodash";

const extractCharIndices = (line: string, char: string) => {
  const indices = [];
  for(let i = 0; i < line.length; i++) {
    if(line[i] === char) {
      indices.push(i);
    }
  }
  return indices;
}

const solutionExists = (line: string, damaged: number[] = []) => {
 
  const unknownIndices = extractCharIndices(line, '?');
  const knownIndices = extractCharIndices(line, '#');
  const totalDamaged = damaged.reduce((acc, curr) => acc + curr, 0);
  const [sequence] = damaged;

  if(knownIndices.length + unknownIndices.length < sequence) {
    console.log(`Not enough space ${knownIndices.length + unknownIndices.length} < ${sequence}`)
    return false;
  }

  if(totalDamaged > knownIndices.length + unknownIndices.length) {
    console.log(`Damaged ${totalDamaged} > ${knownIndices.length + unknownIndices.length}`)
    return false;
  }

  return true;
}

let globalCounter = 0;

const solveLine = ({ line, damaged }: { line: string, damaged: number[] }): number => {
  globalCounter++;
  // if(globalCounter > 1000) {
  //   throw new Error('Too many iterations');
  // }
  const [sequence, ...rest] = damaged;

  if(!sequence) {
    return line.includes('#') ? 0 : 1;
  }

  if(!line) {
    return damaged.length > 0 ? 0 : 1;
  }

  if(!solutionExists(line, damaged)) {
    return 0;
  }
  
  const unknownIndices = extractCharIndices(line, '?');
  const knownIndices = extractCharIndices(line, '#');

  const start = Math.min(unknownIndices[0], ...knownIndices);
  
  const mask = line.slice(start, start + sequence);

  const nextSolutionExists = solutionExists(line.slice(1), damaged);
  const step =  nextSolutionExists ? solveLine({ line: line.slice(1), damaged }) : 0;
  if(mask.includes('.') || line[start + sequence] === '#') {
    return step;
  }

  if(!(start + sequence + 1)) {
    throw new Error(`No next char ${start} ${sequence} ${line}`);
  }

  

  const jump = solveLine({ line: line.slice(mask.length + 2), damaged: rest });
  return 1 * jump + step;
}


const parseInputLine = (input: string) => {
  const [line, damaged] = input.split(' ');
  const damagedNumbers = damaged.split(',').map(Number);
  return { line, damaged: damagedNumbers };
}

const unfold = (input: string[]) => 
  input
    .map(parseInputLine)
    .map(({ line, damaged }) => ({
      line: [line, line, line, line, line].join('?'),
      damaged: [...damaged, ...damaged, ...damaged, ...damaged, ...damaged]
    }))

const solution = (input: string[], withUnfolds = false) => {
  const mappedInput = withUnfolds ? unfold(input) : input.map(parseInputLine);
  const results = mappedInput.map(solveLine);
  console.log({globalCounter})
  
  return results.reduce((acc, curr) => acc + curr, 0);
};


export {  solution };