import fs from 'fs';

type Direction = 'R' | 'L' | 'U' | 'D';

type PlanItem = {
  direction: Direction;
  steps: number;
}

const parseRow = (row: string): PlanItem => {
  const [direction, steps, color] = row.split(' ');

  return {
    direction: direction as Direction,
    steps: Number(steps),
  }
}

const scanPlan = (input: PlanItem[]) => {
  let maxL = 0;
  let maxR = 0;
  let maxU = 0;
  let maxD = 0;

  let hCounter = 0;
  let vCounter = 0;

  for(let itemIdx = 0; itemIdx < input.length; itemIdx++) {
    const item = input[itemIdx];
    
    switch(item.direction) {
      case 'R': {
        hCounter += item.steps;
        maxR = Math.max(maxR, hCounter);
        break;
      }
      case 'L': {
        hCounter -= item.steps;
        maxL = Math.max(maxL, -hCounter);
        break;
      }
      case 'U': {
        vCounter += item.steps;
        maxU = Math.max(maxU, vCounter);
        break;
      }
      case 'D': {
        vCounter -= item.steps;
        maxD = Math.max(maxD, -vCounter);
        break;
      }
    }
    
  }

  return {
    offsetX: maxL,
    offsetY: maxU,
    width: maxL + maxR + 1,
    height: maxU + maxD + 1
  }
}

const colorVertical = (grid: string[][], colIdx: number, rowSplitIdx: number, colUpColor: string, colDownColor: string) => {
  let rowUp = rowSplitIdx - 1;
  let rowDown = rowSplitIdx + 1;
  while(rowUp >= 0 && grid[rowUp][colIdx] !== '#') {
    grid[rowUp][colIdx] = colUpColor;
    rowUp--;
  }
  while(rowDown < grid.length && grid[rowDown][colIdx] !== '#') {
    grid[rowDown][colIdx] = colDownColor;
    rowDown++;
  }
};

const colorHorizontal = (grid: string[][], rowIdx: number, colSplitIdx: number, colLeftColor: string, colRightColor: string) => {
  let colLeft = colSplitIdx - 1;
  let colRight = colSplitIdx + 1;
  if(rowIdx === 87 ) {
    console.log({rowIdx, colLeft, colRight, s: grid[rowIdx][colLeft]});
  }
  while(colLeft >= 0 && grid[rowIdx][colLeft] !== '#') {
    grid[rowIdx][colLeft] = colLeftColor;
    colLeft--;
  }
  while(colRight < grid[0].length && grid[rowIdx][colRight] !== '#') {
    grid[rowIdx][colRight] = colRightColor;
    colRight++;
  }
}

const solution = (input: string[]) => {
  const plan = input.map(parseRow);
  const {width, height, offsetX, offsetY } = scanPlan(plan);

  console.log({width, height, offsetX, offsetY });
  
  const grid = Array.from({length: height}, () => Array.from({length: width}, () => '.'));
  let [row, col] = [offsetY, offsetX];
  
  outer: for(let rowIdx = 0; rowIdx < plan.length; rowIdx++) {
    const { direction, steps } = plan[rowIdx];
    if(rowIdx > 340) {
      console.log({rowIdx, row, col, direction, steps});
    }
    switch(direction) {
      case 'L': {
        for(let i = 0; i <= steps; i++) {
          const currX = col - i;
          colorVertical(grid, currX, row, 'x', '.');
          grid[row][currX] = '#';
        }
        col -= steps;
        break;        
      }
      case 'R': {
        for(let i = 0; i <= steps; i++) {
          const currX = col + i;
          colorVertical(grid, currX, row, '.', 'x');
          grid[row][currX] = '#';          
        }
        col += steps;
        break;
      }
      case 'U': {
        for(let i = 0; i <= steps; i++) {
          const currY = row - i;   
          try {
            colorHorizontal(grid, currY, col, '.', 'x');
          } catch (e) {
            console.log({row, col, currY, steps, rowIdx, i, direction, plan});
            break outer;
          }       
          grid[currY][col] = '#';
        }        
        row -= steps;
        break;
      }
      case 'D': {
        for(let i = 0; i <= steps; i++) {
          const currY = row + i;          
          colorHorizontal(grid, currY, col, 'x', '.');
          grid[currY][col] = '#';          
        }
        row += steps;
        break;
      }      
    }    
    if(rowIdx > 340) {
      console.log({rowIdx, row, col, direction, steps});
    }   
    // console.log(grid.map(row => row.join('')).join('\n'));
  }
  // console.log(grid.map(row => row.join('')).join('\n'));

  fs.writeFileSync('day18/output.txt', grid.map(row => row.join('')).join('\n'));
  
  return grid.reduce((acc, row) => acc + row.filter(col => col === '#' || col === 'x').length, 0);
}

const strToDir: Record<string, Direction> = {
  '0': 'R',
  '1': 'D',
  '2': 'L',
  '3': 'U'
};

const parseRowHex = (row: string): PlanItem => {
  const [,, color] = row.split(' ');
  const dir = color[7];
  const colorCode = color.slice(2, 7);
  const direction = strToDir[dir];
  if(!direction) {
    throw new Error(`Invalid direction ${dir}`);
  }

  return {
    direction: direction as Direction,
    steps: parseInt(colorCode, 16)
  }

}

const solutionV2 = (input: string[]) => {
  const plan = input.map(parseRowHex);
  const {width, height, offsetX, offsetY } = scanPlan(plan);
  console.log({width, height, offsetX, offsetY });
  // const grid = Array.from({length: height}, () => Array.from({length: width}, () => '.'));
  // let [row, col] = [offsetY, offsetX];
  
  // outer: for(let rowIdx = 0; rowIdx < plan.length; rowIdx++) {
  //   const { direction, steps } = plan[rowIdx];
  //   if(rowIdx > 340) {
  //     console.log({rowIdx, row, col, direction, steps});
  //   }
  //   switch(direction) {
  //     case 'L': {
  //       for(let i = 0; i <= steps; i++) {
  //         const currX = col - i;
  //         colorVertical(grid, currX, row, 'x', '.');
  //         grid[row][currX] = '#';
  //       }
  //       col -= steps;
  //       break;        
  //     }
  //     case 'R': {
  //       for(let i = 0; i <= steps; i++) {
  //         const currX = col + i;
  //         colorVertical(grid, currX, row, '.', 'x');
  //         grid[row][currX] = '#';          
  //       }
  //       col += steps;
  //       break;
  //     }
  //     case 'U': {
  //       for(let i = 0; i <= steps; i++) {
  //         const currY = row - i;   
  //         try {
  //           colorHorizontal(grid, currY, col, '.', 'x');
  //         } catch (e) {
  //           console.log({row, col, currY, steps, rowIdx, i, direction, plan});
  //           break outer;
  //         }       
  //         grid[currY][col] = '#';
  //       }        
  //       row -= steps;
  //       break;
  //     }
  //     case 'D': {
  //       for(let i = 0; i <= steps; i++) {
  //         const currY = row + i;          
  //         colorHorizontal(grid, currY, col, 'x', '.');
  //         grid[currY][col] = '#';          
  //       }
  //       row += steps;
  //       break;
  //     }      
  //   }    
  //   if(rowIdx > 340) {
  //     console.log({rowIdx, row, col, direction, steps});
  //   }   
  //   // console.log(grid.map(row => row.join('')).join('\n'));
  // }
  // console.log(grid.map(row => row.join('')).join('\n'));

  // fs.writeFileSync('day18/output.txt', grid.map(row => row.join('')).join('\n'));
  
  // return grid.reduce((acc, row) => acc + row.filter(col => col === '#' || col === 'x').length, 0);
}

export {  solution, solutionV2 };