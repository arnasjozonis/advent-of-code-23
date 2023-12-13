const binaryToSpring = {
  '0': '#',
  '1': '.',
} as const

const extractUnknownsIndices = (line: string) => {
  const indices = [];
  for(let i = 0; i < line.length; i++) {
    if(line[i] === '?') {
      indices.push(i);
    }
  }
  return indices;
}

// const lineValid = (line: string, damaged: number[]) => {
//   let dmgIdx = 0;
//   let dmgCounter = 0;
//   for(let charIdx = 0; charIdx < line.length; charIdx++) {
//     if(line[charIdx] === '#') {
//       dmgCounter++;
//     };

//     if(dmgCounter === damaged[dmgIdx]) {
//       if(line[charIdx + 1] !== '#') {
//         dmgIdx++;
//         dmgCounter = 0;
//       } else {
//         return 0;
//       }
//     }
//   }

//   return 1;
// }

const lineValid = (line: string, damaged: number[]) => {
  let valid = 1;
  let checkedIdx = 0;

  const totalDamaged = damaged.reduce((acc, curr) => acc + curr, 0);

  // check if line has enough # (total damaged) symbols

  if(line.split('').filter(s => s === '#').length !== totalDamaged) {
    return 0;
  }


  for(let damagedSequence of damaged) {
    const exists = line.substring(checkedIdx).match(new RegExp(`#{${damagedSequence}}`));
    
    if(!exists || exists.index === undefined) {
      valid = 0;
      break;
    }

    checkedIdx += exists.index + damagedSequence;
    const nextSymbol = line[checkedIdx];
    
    if(nextSymbol === '#') {
      valid = 0;
      break;
    }

  }

  return valid;
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
    
    if(lineValid(editableLine.join(''), damaged) > 0) {
      // console.log(`Variant ${variant}/${variants}: ${editableLine.join('')} / ${line} (${damaged})`);
      validVariants++;
    }

    variant++;
  }
  return validVariants;
}

const findNextValid = (line: string, damaged: number[], prev: string) => {
  const editableLine = line.split('');
  const unknownsIndices = extractUnknownsIndices(line);
  const unknownsLength = unknownsIndices.length;
  const variants = 2 ** unknownsLength;
  let variant = 0;
  while(variant < variants) {
    const binary = variant.toString(2).padStart(unknownsLength, '0').split('') as ('0' | '1')[];
    binary.forEach((bit, idx) => {
      const symbol = binaryToSpring[bit];
      editableLine[unknownsIndices[idx]] = symbol;
    });

    const res = editableLine.join('');
    
    if(lineValid(res, damaged) > 0 && res !== prev) {
      // console.log(`Variant ${variant}/${variants}: ${editableLine.join('')} / ${line} (${damaged})`);
      return res;
    }

    variant++;
  }
  return null;
};

const variantExists = (line: string, currentSeq: number) => {

  let seqCounter = 0;
  for(let outerIdx = 0; outerIdx < line.length; outerIdx++) {
    for(let charIdx = outerIdx; charIdx < line.length; charIdx++) {
      let char = line[charIdx];
      if(char === '?') {
        if(currentSeq > seqCounter) {
          char = '#';
        } else {
          char = '.';
        }
      };
  
      if(char === '.') {
        seqCounter = 0;
      }
  
      if(char === '#') {
        seqCounter++;
      }
  
      let nextChar = line[charIdx + 1];    
      if(seqCounter === currentSeq && nextChar !== '#') {
        return charIdx + 2;
      }
    }
  }
}

const solveLineRec = (line: string, damaged: number[]): number => {
  console.log(line, damaged);
  if(line.length === 0 || damaged.length === 0) {
    return 1;
  }
  let nextSplit = variantExists(line, damaged);
  if(!nextSplit) {
    return 0;
  }

  const jump = solveLineRec(line.substring(nextSplit), damaged.slice(1));

  return jump + 1;
}

const solveLineRec2 = (line: string, damaged: number[], prev?: string): number => {
  const unknownIndices = extractUnknownsIndices(line);
  if(line.length === 0 || damaged.length === 0 || unknownIndices.length === 0) {
    return 0;
  }

  const nextValid = findNextValid(line, damaged, prev ?? '');

  if(!nextValid) {
    return 0;
  }
  console.log(line, damaged, nextValid);
  const [damagedSequence, ...rest] = damaged;

  const match = nextValid.match(new RegExp(`#{${damagedSequence}}`))!;
  const matchIdx = match.index!;  
  const nextValidSplitIdx = matchIdx + damagedSequence + 1;  
  
  let jump = solveLineRec2(line.slice(nextValidSplitIdx), rest, nextValid.slice(nextValidSplitIdx));

  const firstUnknown = unknownIndices[0];
  const nextUnknown = unknownIndices[1];
  const isFirstUnknownHash = nextValid[firstUnknown];
  const stepRangeContainsHash = line.substring(0, nextUnknown).includes('#');
  let step = 0;
  if((!isFirstUnknownHash || !stepRangeContainsHash) && nextUnknown) {
    const nextStepLine = line.slice(nextUnknown);
    step = solveLineRec2(nextStepLine, damaged);
  }

  return 1 + step + jump;
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
  const results = mappedInput.map(({ line, damaged }) => solveLineRec2(line, damaged));

  return results.reduce((acc, curr) => acc + curr, 0);
};


export {  solution, lineValid };