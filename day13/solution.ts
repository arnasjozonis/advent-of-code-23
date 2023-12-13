const isMirroredRow = (pattern: string[], upperRowIdx: number): boolean => {
  for(let idx = upperRowIdx; idx >= 0; idx--) {
    const upperRow = pattern[idx];
    const lowerRow = pattern[upperRowIdx + 1 + (upperRowIdx - idx)];

    if(!lowerRow) {
      return true;
    }

    if(upperRow !== lowerRow) {
      return false;
    }
  }

  return true;
}

const isMirroredColumn = (pattern: string[], leftColIdx: number): boolean => {
  for(let idx = leftColIdx; idx >= 0; idx--) {
    for(let rowIdx = 0; rowIdx < pattern.length; rowIdx++) {
      const leftCol = pattern[rowIdx][idx];
      const rightCol = pattern[rowIdx][leftColIdx + 1 + (leftColIdx - idx)];

      if(!rightCol) {
        return true;
      }
  
      if(leftCol !== rightCol) {
        return false;
      }
    }
  }

  return true;
}

const solve = (pattern: string[], ignoreRowIdx: number = -1, ignoreColIdx: number = -1): [row: number, col: number] => {
  // console.log(`Ignoring ${ignoreRowIdx}, ${ignoreColIdx}`);
  const rowLength = pattern[0].length;
  const res: [row: number, col: number] = [0,0]
  for(let rowIdx = 0; rowIdx < pattern.length - 1; rowIdx++) {
    if(isMirroredRow(pattern, rowIdx) && rowIdx !== ignoreRowIdx) {
      res[0] = (rowIdx + 1) * 100;
      break;
    }    
  }

  for(let colIdx = 0; colIdx < rowLength - 1; colIdx++) {
    if(isMirroredColumn(pattern, colIdx) && colIdx !== ignoreColIdx) {
      res[1] = colIdx + 1;
      break;
    }
  }

  return res;
};

const getPatterns = (input: string[]) => {
  let patterns: string[][] = [];
  let patterndIdx = 0;
  patterns.push([]);
  for(let row of input) {
    if(row.length > 0) { 
      patterns[patterndIdx].push(row); 
    } else {
      patterndIdx++;
      patterns.push([]);
    }
  }

  return patterns;
}

const solution = (input: string[]) => {
  const patterns = getPatterns(input);

  const results = patterns.map(p => solve(p)).map(([row, col]) => Math.max(row, col));
  return results.reduce((acc, curr) => acc + curr, 0);
};

const charToggleMap = {
  '#': '.',
  '.': '#'
}

const solveWithSmudges = (pattern: string[]): number => {
   
  const [row, col] = solve(pattern);
  for(let rowIdx = 0; rowIdx < pattern.length; rowIdx++) {
    for(let colIdx = 0; colIdx < pattern[rowIdx].length; colIdx++) {
      const char = pattern[rowIdx][colIdx] as '#' | '.';
      const mutablePattern: string[][] = pattern.map((row) => row.split(''));
      mutablePattern[rowIdx][colIdx] = charToggleMap[char];
      const newResults = solve(mutablePattern.map((row) => row.join('')), (row/100) - 1, col - 1);
      const res = Math.max(newResults[0], newResults[1]);
    
      // if(res) {
      //   console.log(`Found smudge at ${rowIdx}, ${colIdx}`)
      //   console.log(`${mutablePattern.map((row) => row.join('')).join('\n')}`)
      //   console.log(`Old res: ${[row, col]}, new res: ${newResults}`)
      // }
      if(res) {
        return res;
      }
    }      
  }

  console.log(`${pattern.join('\n')} oldRes: ${[row, col]}`)
  throw new Error('No smudges found');
  return 0;
}

const solutionV2 = (input: string[]) => {
  const patterns = getPatterns(input);

  const results: number[] = [];

  for(let pattern of patterns) {
    results.push(solveWithSmudges(pattern));
  }

  return results.reduce((acc, curr) => acc + curr, 0);

}

export {  solution, isMirroredRow, isMirroredColumn, solutionV2, solveWithSmudges };