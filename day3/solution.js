// type EngineNumber = {
//   value: number,
//   row: number,
//   columns: number[]
// }

const extractEngineNumbers = (data) => {
  const result = [];

  data.forEach((row, rowIndex) => {
    const columns = row.split('');
    let accumulator = '';
    columns.forEach((char, columnIndex) => {
      if (isFinite(parseInt(char))) {
        accumulator += char;
      } else {
        if (accumulator.length > 0) {
          result.push({
            value: parseInt(accumulator),
            row: rowIndex,
            columns: [columnIndex - accumulator.length, columnIndex - 1]
          });
          accumulator = '';
        }
      }
    });

    if (accumulator.length > 0) {
      result.push({
        value: parseInt(accumulator),
        row: rowIndex,
        columns: [columns.length - accumulator.length, columns.length - 1]
      });
    }
  });

  return result;
}

const extractAdjectentSymbols = (data, engineNumbers) => {
  const { row, columns} = engineNumbers;
  const [start, end] = columns;
  
  const topRow = data[row - 1]?.slice(Math.max(start - 1, 0), end + 2) || [];
  const bottomRow = data[row + 1]?.slice(Math.max(start - 1, 0), end + 2) || [];
  const leftSymbol = data[row][start - 1] || '.';
  const rightSymbol = data[row][end + 1] || '.';

  return [...bottomRow, ...topRow, leftSymbol, rightSymbol];
}

const numberValid = (data, engineNumbers) => {
  const adjecentSymbols = extractAdjectentSymbols(data, engineNumbers);

  return !!adjecentSymbols.find(
    char => char !== '.' && !isFinite(parseInt(char))
  );
};

const solution = (data) => {
  const engineNumbers = extractEngineNumbers(data);
  const validEngineNumbers = engineNumbers.filter(number => numberValid(data, number));

  return validEngineNumbers.reduce((acc, number) => acc + number.value, 0);
}
// type Gear = {
//   row: number,
//   column: number
//}
const extractGears = (data) => {
  const result = [];

  data.forEach((row, rowIndex) => {
    const columns = row.split('');
    columns.forEach((char, columnIndex) => {
      if (char === '*') {
        result.push({
          row: rowIndex,
          column: columnIndex
        });
      }
    });
  });

  return result;
}

const solutionV2 = (data) => {
  const engineNumbers = extractEngineNumbers(data);
  const gears = extractGears(data);

  const gearRatios = gears.map((gear) => {
    const gearNumbers = engineNumbers.filter((engineNo) => {
      const { row: engineRow, columns } = engineNo;
      const [start, end] = columns;
      
      if(Math.abs(gear.row - engineRow) <= 1) {
        return gear.column >= start - 1 && gear.column <= end + 1;
      }

      return false;
    });

    if(gearNumbers.length === 2) {
      const [first, second] = gearNumbers;
      return first.value * second.value;
    }

    return 0;

  });

  return gearRatios.reduce((acc, ratio) => acc + ratio, 0);
};

module.exports = {solution, solutionV2};