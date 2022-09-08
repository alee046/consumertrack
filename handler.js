
let fs = require('fs'),
readline = require('readline'),
stream = require('stream');
let parseLine = require('./parseLine').parseLine;
let parser = require('ua-parser-js');
let stringify = require('csv-stringify').stringify;

const columns = {
  logStream: 'logStream',
  deviceType: 'deviceType',
  browserType: 'browserType',
  country: 'country',
  state: 'state'
};

class Reader {
  constructor(filePath) {
    this.fileStream = fs.createReadStream(filePath);
    this.cloneUAParser = new parser.UAParser();
    this.arr = []
  }
  async start() {
    var outstream = new stream;

    outstream.readable = true;
    outstream.writable = true;
    const rl = readline.createInterface({
      input: this.fileStream,
      output: outstream,
      terminal: false
    });
    rl.on('line', async (line) => {
      await parseLine(line,this.arr,this.cloneUAParser);
    })
    rl.on('error', async (line) => {
      // can add error handling 
    })
    rl.on('close', async () => {
      // if(this.arr.length === 0){
      //   throw new Error('No data');
      // }
      await stringify(this.arr, { header: true, columns: columns }, (err, output) => {
        if (err) throw err;
        fs.writeFile('my.csv', output, (err) => {
          if (err) throw err;
          console.log('saved csv file')
        });
      });
    })
  }
}
    
module.exports = {
    Reader,
}