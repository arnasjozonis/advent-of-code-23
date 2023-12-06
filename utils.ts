const fs = require('fs');

const parseString = (str: string) => str.trim().split('\n').map((line) => line.trim()).filter((line) => line.length > 0);

const parseTask = (dayNo: string) => {
  const file = fs.readFileSync(`./data/${dayNo}.txt`, 'utf8');
  return parseString(file);
}


module.exports = { parseTask, parseString };