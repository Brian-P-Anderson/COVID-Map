/* jshint esversion: 9 */
const readline = require('readline');
const fs = require('fs');

let counties = [];

function letrip () {
  let county = [];
  let load = [];
  const setCounties = new Set(['Peoria', 'Tazewell', 'Woodford']);
  const outputFilename = './www/counties.js';
  let outputBuffer = '';
  let boolFirstMatch = true;
  const readInterface = readline.createInterface({
    input: fs.createReadStream('./yesterday.csv')
  });
  
  readInterface.on('line', function(line) {
    county = line.split(',');
    load = [];
    if (county[2] == 'Illinois') {
      load.push(county[0], county[1], county[4], county[7], county[8], county[9], county[10]);
      console.log(load);
      counties.push(load);
      if (setCounties.has(county[1])) {
        outputBuffer += `${boolFirstMatch ? '' : ','}${JSON.stringify(load)}`;
        console.log(outputBuffer);
        boolFirstMatch = false;
        fs.writeFileSync(outputFilename, `var data = [${outputBuffer}];`, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
      }
    }
  });
}

fs.watch(__dirname, function(event, filename) {
  if (event == 'change') {
    letrip();
  }
});