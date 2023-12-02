const configBase = {
  red: 0,
  green: 0,
  blue: 0,
}

const parseInput = (input) => {
  const games = new Map();
  input.forEach((game) => {
    const [gameKey, gameData] = game.split(':');
    const number = Number(gameKey.split(' ')[1]);

    const data = gameData?.split(';').map((round) => {
      const turn = round.split(',').map((cube) => {
        const [count, color] = cube.trim().split(' ');
        return { count: Number(count), color };
      });
      
      return turn.reduce((acc, { count, color }) => {
        acc[color] = count || 0;
        return acc;
      }, {...configBase});
    });

    games.set(number, data);
  });

  return games;
}

const resultPossible = (gameRound, config) => {
  const { red, green, blue } = config;
  const { red: gameRed, green: gameGreen, blue: gameBlue } = gameRound;
  return red >= gameRed && green >= gameGreen && blue >= gameBlue;
}

const solution = (input, config) => {
  const gameData = parseInput(input);  
  let result = 0;
  gameData.forEach((roundData, roundNumber) => {
    const possible = roundData.every((round) => resultPossible(round, config));
    if(possible) {
      result += roundNumber;
    }
  });

  return result;
};

const getMinimumConfig = (gameRounds) => {
  return gameRounds.reduce((acc, gameRound) => {
    const { red, green, blue } = acc;
    const { red: gameRed, green: gameGreen, blue: gameBlue } = gameRound;
    acc.red = Math.max(red, gameRed);
    acc.green = Math.max(green, gameGreen);
    acc.blue = Math.max(blue, gameBlue);
    return acc;
  }, {...configBase});
}

const solutionV2 = (input) => {
  const gameData = parseInput(input);  
  let result = 0;
  gameData.forEach((roundData) => {
    const { red, green, blue } = getMinimumConfig(roundData);
    result += red * green * blue;
  });

  return result;
};

module.exports = {solution, solutionV2};