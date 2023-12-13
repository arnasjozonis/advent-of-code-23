const fs = require('fs');

const parseString = (str: string, leaveEmpty = false) => str.trim().split('\n').map((line) => line.trim()).filter((line) => leaveEmpty || line.length > 0);

const parseTask = (dayNo: string, leaveEmpty = false) => {
  const file = fs.readFileSync(`./data/${dayNo}.txt`, 'utf8');
  return parseString(file, leaveEmpty);
}


module.exports = { parseTask, parseString };