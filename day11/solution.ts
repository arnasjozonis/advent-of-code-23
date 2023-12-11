
const scanUniverse = (input: string[][]) => {
  const verticalExpansions: number[] = [];
  const horizontalExpansions: number[] = [];
  const stars: [row: number, col: number][] = []
  for(let rowIdx = 0; rowIdx < input.length; rowIdx++) {
    const row = input[rowIdx];

    if(row.every(x => x === '.')) {
      horizontalExpansions.push(rowIdx);
    }

    for(let colIdx = 0; colIdx < row.length; colIdx++) {
      let expanded = true;
      for(let i = 0; i < input.length; i++) {
        if(input[i][colIdx] !== '.') {
          expanded = false;
          break;
        }
      }
      if(expanded && !verticalExpansions.includes(colIdx)) {
        verticalExpansions.push(colIdx);
      }
      if(row[colIdx] === '#') {
        stars.push([rowIdx, colIdx]);
      }
    }
  }

  return {
    verticalExpansions,
    horizontalExpansions,
    stars
  };
};

const solution = (input: string[], expansionCoeficient = 2) => {
  const { verticalExpansions, horizontalExpansions, stars } = scanUniverse(input.map(x => x.split('')));

  return stars.reduce((acc, [row, col], currIdx, all) => {
    for(let idx = currIdx + 1; idx < all.length; idx++) {
      const [otherRow, otherCol] = all[idx];
      const startR = Math.min(row, otherRow);
      const endR = Math.max(row, otherRow);
      const startC = Math.min(col, otherCol);
      const endC = Math.max(col, otherCol);

      const distance = endR - startR + endC - startC;
      const verticalExpandedDistance = horizontalExpansions.filter(r => r > startR && r < endR).length;
      const horizontalExpandedDistance = verticalExpansions.filter(c => c > startC && c < endC).length;
      const d = distance + (verticalExpandedDistance * (expansionCoeficient - 1)) + (horizontalExpandedDistance * (expansionCoeficient - 1));
      acc += d;      
    }

    return acc;
  }, 0);
};

export {  solution };