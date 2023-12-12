const binaryToSpring = {
  '0': '#',
  '1': '.',
} as const

const lineValid = (line: string, damaged: number[]) => {
  let valid = true;
  let checkedIdx = 0;

  const totalDamaged = damaged.reduce((acc, curr) => acc + curr, 0);

  // check if line has enough # (total damaged) symbols

  if(line.split('').filter(s => s === '#').length !== totalDamaged) {
    return false;
  }


  for(let damagedSequence of damaged) {
    const exists = line.substring(checkedIdx).match(new RegExp(`#{${damagedSequence}}`));
    
    if(!exists || exists.index === undefined) {
      valid = false;
      break;
    }

    checkedIdx += exists.index + damagedSequence;
    const nextSymbol = line[checkedIdx];
    
    if(nextSymbol === '#') {
      valid = false;
      break;
    }

  }

  return valid;
}

const extractUnknownsIndices = (line: string) => {
  const indices = [];
  for(let i = 0; i < line.length; i++) {
    if(line[i] === '?') {
      indices.push(i);
    }
  }
  return indices;
}

const parseInputLine = (input: string) => {
  const [line, damaged] = input.split(' ');
  const damagedNumbers = damaged.split(',').map(Number);
  return { line, damaged: damagedNumbers };
}

const solveLine = (line: string, damaged: number[]) => {
  
  const editableLine = line.split('');
  const damagedCount = damaged.reduce((acc, curr) => acc + curr, 0);
  const knownDamagedCount = editableLine.filter(d => d === '#').length;
  const unknownDamagedCount = damagedCount - knownDamagedCount;
  const unknownsIndices = extractUnknownsIndices(line);
  const unknownsLength = unknownsIndices.length;
  const variants = 2 ** unknownsLength;
  let validVariants = 0;
  let variant = 0;
  while(variant < variants) {
    const binary = variant.toString(2).padStart(unknownsLength, '0').split('') as ('0' | '1')[];
    binary.forEach((bit, idx) => {
      const symbol = binaryToSpring[bit];
      editableLine[unknownsIndices[idx]] = symbol;
    });
    
    if(lineValid(editableLine.join(''), damaged)) {
      // console.log(`Variant ${variant}/${variants}: ${editableLine.join('')} / ${line} (${damaged})`);
      validVariants++;
    }

    variant++;
  }
  return validVariants;
}

const solveLineRec = (line: string, damaged: number[]): number => {
  // const [nextSequence, ...rest] = damaged;
  // const unknowns = extractUnknownsIndices(line);
 
  // let hoppingCount = 0;
  // let mutableLine = line.split('');
  // let hashCount = 0;
  // for(let charIdx = 0; charIdx < line.length; charIdx++) {
  //   const char = mutableLine[charIdx];
  //   if(char === '#') {
  //     hashCount++;
  //   }
  //   if(hashCount === nextSequence) {
  //     if(line[charIdx + 1] !== '#') {
  //       hoppingCount = 1 + solveLineRec(line.substring(charIdx + 2), rest);
  //     } 
  //     break;
  //   }
  // }

  // return hoppingCount;
  let dmgIdx = 0;
  let dmgCounter = 0;
  for(let charIdx = 0; charIdx < line.length; charIdx++) {
    if(line[charIdx] === '#') {
      dmgCounter++;
    };

    if(dmgCounter === damaged[dmgIdx]) {
      if(line[charIdx + 1] !== '#') {
        dmgIdx++;
      } else {
        return 0;
      }
    }
  }
  
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
  const results = mappedInput.map(({ line, damaged }) => solveLine(line, damaged));

  return results.reduce((acc, curr) => acc + curr, 0);
};


export {  solution, lineValid };