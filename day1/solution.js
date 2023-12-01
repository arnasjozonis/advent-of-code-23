const { forEach, reduce, find, isFinite, reverse } = require("lodash")

const getCalibatrationsSum = (input) => {
  const calibrations = input.map((line) => {
    const charArr = line.split('');
    const firstDigit = find(charArr, (char) => isFinite(Number(char)));
    const lastDigit = find(reverse(charArr), (char) => isFinite(Number(char)));
    return Number(`${firstDigit}${lastDigit}`);
  });

  return calibrations.reduce((sum, calibration) => sum + calibration, 0);
}

module.exports = { getCalibatrationsSum }