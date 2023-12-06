type FoodProductionMapKey = 'seed-to-soil' | 'soil-to-fertilizer' |  'fertilizer-to-water' | 'water-to-light' | 'light-to-temperature' | 'temperature-to-humidity' | 'humidity-to-location';

const path: FoodProductionMapKey[] = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location'
];
  
type MapRange = [start: number, end: number];
type ProductionSectionConfig = Map<MapRange, MapRange>;
type ProductionMapConfig = Map<FoodProductionMapKey, ProductionSectionConfig>;

const initRange: MapRange = [0, Infinity];

const parseConfig = (data: string[]): ProductionMapConfig => {
  const config: ProductionMapConfig = new Map();
  
  let currentKey: FoodProductionMapKey | undefined = 'seed-to-soil';
  for(let line of data) {
    const [maybeKey] = line.split(' ');
    if(path.includes(maybeKey as FoodProductionMapKey)) {
      currentKey = maybeKey as FoodProductionMapKey;
      config.set(currentKey, new Map([[initRange, initRange]]));
      continue;
    }

    const currentMapConfig = config.get(currentKey);

    if(currentMapConfig) {

      const [dest, source, range] = line.split(' ').map(Number);
      const sourceRange: MapRange = [source, source + range - 1];
      const destRange: MapRange = [dest, dest + range - 1];

      const currentKeys = currentMapConfig.keys();
      for(let prevSource of currentKeys) {
        if(prevSource === sourceRange) continue;

        const [start, end] = prevSource;

        const [sourceStart, sourceEnd] = sourceRange;
        currentMapConfig.set(sourceRange, destRange);

        if(start <= sourceStart && sourceEnd <= end) {
          
          const notMappedAppendinx: MapRange = [start, sourceStart - 1];

          const notMappedPostifx: MapRange = [sourceEnd + 1, end];

          currentMapConfig.delete(prevSource);
          
          currentMapConfig.set(notMappedAppendinx, notMappedAppendinx);
          currentMapConfig.set(notMappedPostifx, notMappedPostifx);
        }
      };
    }
  }

  return config;
}

const seedToLocation = (seed: number, config: ProductionMapConfig) => {
  let source = seed;
  path.forEach((key) => {
    const currentMapConfig = config.get(key);
    if(!currentMapConfig) throw new Error('Invalid config');

    const mapConfig = currentMapConfig.entries();

    for(let [sourceRange, [destStart]] of mapConfig) {
      const [start, end] = sourceRange;
      if(start <= source && source <= end) {
        const offset = source - start;
        source = destStart + offset;
        break;
      }
    }
  });

  return source;
};


const solution = ([seeds, ...maps]: string[]) => {
   const seedNumbers = seeds.split(' ').map(Number).filter(isFinite);

    const config = parseConfig(maps);

    const nums = seedNumbers.map((seed) => seedToLocation(seed, config))

    return Math.min(...nums);
}

const solutionV2 = ([seeds, ...maps]: string[]) => {
  const seedNumbers = seeds.split(' ').map(Number).filter(isFinite);
  const config = parseConfig(maps);

  let answer = Infinity;
  for(let i = 0; i < seedNumbers.length; i += 2) {
    const first = seedNumbers[i];
    const count = seedNumbers[i + 1];
    for(let num = first; num <= first + count; num++) {
      let result = seedToLocation(num, config);
      answer = Math.min(answer, result);
    }
  }

  return answer;
};

export {solution, solutionV2};