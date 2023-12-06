const solveRace = (time: number, distance: number) => {
  let minHoldTime = 0;
  let maxHoldTime = time;

  for(minHoldTime; minHoldTime <= time; minHoldTime++) {
    const speed = minHoldTime;
    const distanceWithHold = (time - minHoldTime) * speed;
    if(distanceWithHold > distance) {
      break;
    }
  }

  for(maxHoldTime; maxHoldTime > 0; maxHoldTime--) {
    const speed = maxHoldTime;
    const distanceWithHold = (time - maxHoldTime) * speed;
    if(distanceWithHold > distance) {
      break;
    }
  }

  return maxHoldTime - minHoldTime + 1;
};

const solution = ([time, distance]: string[]) => {
  const timeValue = time.split(' ').filter(x => x.length).map(Number).filter(isFinite);
  const distanceValue = distance.split(' ').filter(x => x.length).map(Number).filter(isFinite);

  return timeValue.reduce((acc, time, index) => {
    const distance = distanceValue[index];
    const result = solveRace(time, distance);
    return acc * result;
  }, 1);

}

const parseToNumber = (str: string) => {
  const [,nums] = str.split(':');
  return Number(nums.split(' ').filter(x => x.length).join(''));
};

const solutionV2 = ([time, distance]: string[]) => {
  const timeValue = parseToNumber(time);
  const distanceValue = parseToNumber(distance);

  return solveRace(timeValue, distanceValue);
};

export { solution, solutionV2 };