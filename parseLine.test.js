let parseLine = require('./parseLine').parseLine;
let parser = require('ua-parser-js');

test('parses a log line and adds a CSV entry into memory array, sets fallback values for device type and browser type', async () => {
    let cloneUAParser = new parser.UAParser();
    let arr = [];
    let test = '65.55.208.48 - - [10/Jun/2015:22:23:48 +0000] "GET /savings-account/simple-tips-saving-growing-wealth/ HTTP/1.1" 200 14185 "-" "msnbot-UDiscovery/2.0b (+http://search.msn.com/msnbot.htm)"'
    await (parseLine(test, arr, cloneUAParser));
    expect(arr).toEqual([["65.55.208.48 - - [10/Jun/2015:22:23:48 +0000] \"GET /savings-account/simple-tips-saving-growing-wealth/ HTTP/1.1\" 200 14185 \"-\" \"msnbot-UDiscovery/2.0b (+http://search.msn.com/msnbot.htm)\"", "Desktop", "unknown", "US", "IL"]]);
});