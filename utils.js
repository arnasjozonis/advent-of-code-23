const fs = require('fs');

const parseTask = (dayNo) => {
  const file = fs.readFileSync(`./data/${dayNo}.txt`, 'utf8');
  return file.trim().split('\n');
}

module.exports = { parseTask };