const parseCard = (input) => {
  const [name, numbers] = input.split(':');
  const [left, right] = numbers.split('|');
  const leftNumbers = left.trim().split(' ').map(Number).filter(Boolean);
  const rightNumbers = right.trim().split(' ').map(Number).filter(Boolean);

  return {
    name,
    leftNumbers,
    rightNumbers,
  };
};

const extractWinningCount = (card) => {
  const {leftNumbers, rightNumbers} = card;

  const count = leftNumbers.reduce((acc, number) => {
    if (rightNumbers.includes(number)) {
      acc++;
    }

    return acc;
  }, 0);

  return count;
}

const convertToCardWorth = (count) => {
  if(!count) return 0;

  return Math.pow(2, count - 1);
}

const solution = (data) => {
  const result = data
    .map(parseCard)
    .map(extractWinningCount)
    .map(convertToCardWorth)
    .reduce((acc, worth) => acc + worth, 0);

  return result;
}


const solutionV2 = (data) => {
  const originalTickets = data
    .map(parseCard)
    .map(extractWinningCount)
    .map(winningCount => [winningCount]);
  
  originalTickets.forEach((winningCounts, index) => {
    winningCounts.forEach((winningCount) => {
      for(let i = index + 1; i < index + winningCount + 1 && i < originalTickets.length; i++) {
        originalTickets[i].push(originalTickets[i][0]);
      }
    });
  });

  return originalTickets.reduce((acc, tickets) => acc + tickets.length, 0);
  
};

module.exports = {solution, solutionV2};