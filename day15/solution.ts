const strToHash = (str: string) : number=> {
  let hash = 0;
  for(let char of str) {
    hash += char.charCodeAt(0);
    hash *= 17;
    hash %= 256;
  }

  return hash;
};

type Lens = {key: string, focalLength?: number};

const parseCode = (code: string): Lens=> {
  const [key, focalLength] = code.replace('-', '').split('=');
  return { key, focalLength: focalLength ? parseInt(focalLength) : undefined};
}

const solution = (input: string) => {
  const hashes = input.split(',').map(strToHash);  

  return hashes.reduce((acc, curr) => acc + curr, 0);
};

const solutionV2 = (input: string) => {
  const Boxes: Lens[][] = Array.from({length: 256}, () => []);
  const cfg = input.split(',').map(parseCode);
  for(let { key, focalLength } of cfg) {
    const boxIdx = strToHash(key);
    const currentBox = Boxes[boxIdx];

    if(focalLength !== undefined) {
      const keyIdx = currentBox.findIndex(lens => lens.key === key);
      if(keyIdx === -1) {
        currentBox.push({key, focalLength});
      } else {
        currentBox[keyIdx].focalLength = focalLength;
      }      
    } else {
      const keyIdx = currentBox.findIndex(lens => lens.key === key);
      if(keyIdx !== -1) {
        currentBox.splice(keyIdx, 1);
      }
    }   
  }
  let result = 0;
  for(let boxIdx = 0; boxIdx < Boxes.length; boxIdx++) {
    for(let lendsIdx = 0; lendsIdx < Boxes[boxIdx].length; lendsIdx++) {
      const { focalLength } = Boxes[boxIdx][lendsIdx];
      result += (boxIdx + 1) * (lendsIdx + 1) * (focalLength ?? 1);
    }
  }

  return result;
}

export {  solution, solutionV2, parseCode };