import _ from 'lodash';

type Node = [string, string];
type Direction = 'L' | 'R';
const step = {
  L: 0,
  R: 1
}
const words = RegExp(/\w{3}/, 'g');

const NodeMap = new Map<string, Node>();

const parseNode = (nodeStr: string): Node => {
  const [key, left, right] = [...nodeStr.matchAll(words)].map(x => x[0]);

  const node: Node = [left, right];

  NodeMap.set(key, node);

  return node;
}

const solution = ([instructions, ...mapStrs]: string[]) => {
  NodeMap.clear();
  let steps = 0;
  mapStrs.forEach(parseNode);
  const instructionsLength = instructions.length;

  let currentStep = 'AAA';
  let currentDirectionIndex = 0;
  while(true) {
    steps++;

    const node = NodeMap.get(currentStep) || [];
    const direction = instructions[currentDirectionIndex % instructionsLength] as Direction;
    currentStep = node[step[direction]];

    if(currentStep === 'ZZZ') {
      break;
    }

    currentDirectionIndex++;
  }


  return steps;
}

const solutionV2 = (input: string[]) => solution(input);

export {  solution, solutionV2 };