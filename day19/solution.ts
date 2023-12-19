
type PartKey = 'x' | 'm' | 'a' | 's';

type Part = Record<PartKey, number>;

type Condition = '<' | '>';

const conditionals = {
  '<': (a: number, b: number) => a < b,
  '>': (a: number, b: number) => a > b
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
        nodes.set(node.id, node);
      } else {
        const part = parsePart(row);
        parts.push(part);
      }
    } catch (e) {
      throw new Error(`Error parsing row ${row}: ${e.message}`);
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


const solutionV2 = (input: string[]) => {
  
}

export {  solution, solutionV2 };