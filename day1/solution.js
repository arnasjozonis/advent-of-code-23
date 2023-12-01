const { find, isFinite, reverse, findLastIndex, findIndex } = require("lodash")

const elvenDigits = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine'
]

const elvenDigitNumeric = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9
}

const getCalibatrationsSum = (input) => {
  const calibrations = input.map((line) => {
    const charArr = line.split('');
    const firstDigit = find(charArr, (char) => isFinite(Number(char)));
    const lastDigit = find(reverse(charArr), (char) => isFinite(Number(char)));
    return Number(`${firstDigit}${lastDigit}`);
  });

  return calibrations.reduce((sum, calibration) => sum + calibration, 0);
}

const findFirstElvenDigit = (line) => {
  const elvenDigitsMap = elvenDigits.map((elvenDigit) => ({ 
    startIdx: line.indexOf(elvenDigit),
    value: elvenDigitNumeric[elvenDigit]
  })).filter((elvenDigit) => elvenDigit.startIdx !== -1);

  return elvenDigitsMap.reduce((result, elvenDigit) => 
    !result || elvenDigit.startIdx < result.startIdx
      ? elvenDigit 
      : result,
    undefined
  );
};

const findLastElvenDigit = (line) => {
  const elvenDigitsMap = elvenDigits.map((elvenDigit) => ({ 
    startIdx: line.lastIndexOf(elvenDigit),
    value: elvenDigitNumeric[elvenDigit]
  })).filter((elvenDigit) => elvenDigit.startIdx !== -1);

  return elvenDigitsMap.reduce((result, elvenDigit) => 
    !result || elvenDigit.startIdx > result.startIdx
      ? elvenDigit 
      : result,
    undefined
  );
};

const getCalibatrationsSumV2 = (input) => {
  const calibrations = input.map((line) => {
    const charArr = line.split('');
    const firstDigitIndex = findIndex(charArr, (char) => isFinite(Number(char)));
    const lastDigitIndex = findLastIndex(charArr, (char) => isFinite(Number(char)));

    const firstElven = findFirstElvenDigit(line);
    const lastElve = findLastElvenDigit(line);

    let firstDigit = charArr[firstDigitIndex];
    let lastDigit = charArr[lastDigitIndex];

    const useFirstElven = firstDigitIndex === -1 || firstElven?.startIdx < firstDigitIndex;
    const useLastElven = lastElve?.startIdx > lastDigitIndex;

    if(useFirstElven) {
      firstDigit = firstElven.value;
    }

    if(useLastElven) {
      lastDigit = lastElve.value;
    }

    return Number(`${firstDigit}${lastDigit}`);
  });

  return calibrations.reduce((sum, calibration) => sum + calibration, 0);
}

module.exports = { getCalibatrationsSum, getCalibatrationsSumV2 }