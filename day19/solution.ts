import { sortBy } from "lodash";

type PartKey = 'x' | 'm' | 'a' | 's';

type Part = Record<PartKey, number>;

type Condition = '<' | '>';

const conditionals = {
  '<': (a: number, b: number) => a < b,
  '>': (a: number, b: number) => a > b,
}

type Flow = {
  key?: PartKey;
  condition?: Condition;
  threshold?: number;
  next: string;
}

type WokrFlowNode = {
  id: string;
  flow: Flow[];  
}

const EndLeaves: Record<string, number> = {
  A: 1,
  R: 0
}

const parseWorkflowRow = (row: string): WokrFlowNode => {
  const [id, flowStr] = row.slice(0, row.length - 1).split('{');
  const flow: Flow[] = flowStr.split(',').map(flow => {
    if(!flow.includes(':')) {
      return {
        next: flow.trim()
      }
    }
    const [conditions, next] = flow.split(':');
    const key = conditions[0] as PartKey;
    const condition = conditions[1] as Condition;
    const threshold = parseInt(conditions.slice(2));

    return {
      key,
      condition,
      threshold,
      next: next.trim()
    }
  });

  return {
    id,
    flow
  }
}

const parsePart = (row: string): Part => {
  const parts = row.slice(1, row.length - 1).split(',').map(part => part.trim());
  return parts.reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key as PartKey] = parseInt(value);
    return acc;
  }, {} as Part);
}

const parseInput = (input: string[]) => {
  let parsingWorkflows = true;

  const nodes = new Map<string, WokrFlowNode>();
  const parts: Part[] = []

  for(let row of input) {
    if(!row.length) {
      parsingWorkflows = false;
      continue;
    }
    try {
      if(parsingWorkflows) {
        const node = parseWorkflowRow(row);
        if(nodes.has(node.id)) {
          throw new Error(`Duplicate node ${node.id}`);
        }
        nodes.set(node.id, node);
      } else {
        const part = parsePart(row);
        parts.push(part);
      }
    } catch (e) {
      throw new Error(`Error parsing row ${row}: ${e}`);
    }
  }

  return {
    nodes,
    parts
  }
}

const processFlow = (part: Part, startKey: string, nodes: Map<string, WokrFlowNode>): number => {
  if(EndLeaves[startKey] !== undefined)  {
    return Object.values(part).reduce((acc, val) => acc + val, 0) * EndLeaves[startKey];
  }

  const node = nodes.get(startKey);
  if(!node) {
    throw new Error(`Node ${startKey} not found`);
  }

  const { flow } = node;
  for(let { key, condition, threshold, next } of flow) {
    if(!key || !condition || !threshold) {
      return processFlow(part, next, nodes);
    }
    const partValue = part[key];
    if(conditionals[condition!](partValue, threshold!)) {
      return processFlow(part, next, nodes);
    }    
  }

  throw new Error(`No matching flow for ${startKey}`);
};

const solution = (input: string[]) => {
  const { nodes, parts } = parseInput(input);
  const results: number[] = [];
  parts.forEach(part => {
    const result = processFlow(part, 'in', nodes);
    results.push(result);
  });

  return results.reduce((acc, val) => acc + val, 0);
}

type RangedPart = {
  x: [number, number];
  m: [number, number];
  a: [number, number];
  s: [number, number];
}


const processFlowV2 = (part: RangedPart, startKey: string, nodes: Map<string, WokrFlowNode>): number => {
  
  if(EndLeaves[startKey] !== undefined)  {
    return Object.values(part).reduce((acc, [min, max]) => acc * (max - min + 1), 1);
    // return EndLeaves[startKey] ? Object.values(part).reduce((acc, [min, max]) => acc * (max - min + 1), 1) : 0;
  }


  const node = nodes.get(startKey);
  if(!node) {
    throw new Error(`Node ${startKey} not found`);
  }
  const { flow } = node;
  const divPart = { ...part };

  let result =  0;

  for(let { key, condition, threshold, next } of flow) {
    if(!key || !condition || !threshold) {
      result += processFlowV2(divPart, next, nodes);
      break;
    }

    const [min, max] = part[key];
    const ranges = sortBy([ min, max, threshold]);
    const thresholdIdx = ranges.indexOf(threshold);
    
    if(thresholdIdx === 1) {      
      const newRanges = condition === '<' ? [min, threshold - 1] : [threshold + 1, max];
      result += processFlowV2({...divPart, [key]: newRanges}, next, nodes);
      divPart[key] = condition === '<' ? [threshold, max] : [min, threshold];      
    } else {
      throw new Error(`Invalid threshold ${threshold} for ${ranges}`);
    }
  }

  return result;
}

const allRangedPart: RangedPart = {
  x: [1, 4000],
  m: [1, 4000],
  a: [1, 4000],
  s: [1, 4000]
}

const solutionV2 = (input: string[]) => {
  const { nodes } = parseInput(input);
  const result = processFlowV2(allRangedPart, 'in', nodes);

  return result;
  
}

export {  solution, solutionV2 };