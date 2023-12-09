import { identity, last, reverse } from "lodash";

const parseTree = (input: string) => {
  const nums = input.split(' ').map(Number);
  const tree = [nums];
  while(last(tree)?.some(x => x !== 0)) {
    const treeLevel: number[] = [];
    const prevRow = last(tree)!;
    for(let i = 0; i < prevRow.length - 1; i++) {
      const step = prevRow[i + 1] - prevRow[i];
      treeLevel.push(step);
    }
    
    tree.push(treeLevel);
  }

  return reverse(tree);
};

const extrapolateEnd = (tree: number[][]) => {
  return tree.reduce((acc, row) => acc + (last(row) || 0), 0);
}

const extrapolateStart = (tree: number[][]) => {  
  return tree.reduce((acc, row) => (row[0] || 0) - acc, 0);
}

const solution = (input: string[]) => input
  .map(parseTree)
  .map(extrapolateEnd)
  .reduce((acc, solution) => acc + solution, 0);

const solutionV2 = (input: string[]) => input
  .map(parseTree)
  .map(extrapolateStart)
  .reduce((acc, solution) => acc + solution, 0);

export {  solution, solutionV2 };