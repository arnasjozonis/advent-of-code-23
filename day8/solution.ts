type Node = [string, string];
type Direction = 'L' | 'R';
const step = {
  L: 0,
  R: 1
}
const words = RegExp(/\w{3}/, 'g');

let NodeMap: Record<string, Node> = {};

const parseNode = (nodeStr: string): Node => {
  const [key, left, right] = [...nodeStr.matchAll(words)].map(x => x[0]);

  const node: Node = [left, right];

  NodeMap[key] = node;

  return node;
}

const solution = ([instructions, ...mapStrs]: string[]) => {
  NodeMap = {};
  let steps = 0;
  mapStrs.forEach(parseNode);
  const instructionsLength = instructions.length;

  let currentStep = 'AAA';
  let currentDirectionIndex = 0;
  while(true) {
    steps++;

    const node = NodeMap[currentStep] || [];
    const direction = instructions[currentDirectionIndex % instructionsLength] as Direction;
    currentStep = node[step[direction]];

    if(currentStep === 'ZZZ') {
      break;
    }

    currentDirectionIndex++;
  }


  return steps;
}

const solutionV2 = ([instructions, ...mapStrs]: string[]) => {
  NodeMap = {};
  mapStrs.forEach(parseNode);

  const starts = Object.keys(NodeMap).filter(x => x[2] === 'A');
  const repetitions = starts.map(() => 0);

  let currentDirectionIndex = 0;
  let steps = 0;

  while (true) {
      steps++;
      const direction = instructions[currentDirectionIndex % instructions.length] as Direction;
      currentDirectionIndex++;

      for (let i = 0; i < starts.length; i++) {
          const next = NodeMap[starts[i]][step[direction]];
          if(next[2] === 'Z' && repetitions[i] === 0) {
              repetitions[i] = steps;
          }
          starts[i] = next;
      }

      if (repetitions.every(x => x > 0)) {
          break;
      }
  }
  
  const max = Math.max(...repetitions);
  let result = max;
  while(true) {
      if(repetitions.every(x => result % x === 0)) {
          break;
      }
      result += max;
  }

  return result;
};

export {  solution, solutionV2 };