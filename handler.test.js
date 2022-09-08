const Reader = require('./handler').Reader;
const parseLine = require('./parseLine');
var fs = require('fs');
var readline = require('readline');

var mockParseLink = jest.fn();
jest.mock('fs', ()=> {
  return {
    createReadStream: jest.fn(),
    writeFile: jest.fn(),
  }
})
jest.mock('./parseLine');
jest.mock('csv-stringify', ()=>{
  return {
    stringify:  jest.fn((arr, options, callback) => callback(null,'someData'))
  }
})
jest.mock('geoip-lite', () => () => ({
  lookup: jest.fn()
}))

test('it parses data using the FS Line reader and writes to a csv file', async () => {
    // const mockedReadStream = new Readable()
    const mReadStream = {
        pipe: jest.fn().mockReturnThis(),
        resume: jest.fn().mockImplementation(() => {
          jest.fn();
          return this;
        }),
      };
      const interfaceMock = {
        on: jest.fn().mockImplementation((event, handler) =>{
          if(event === 'line'){
            handler()
            jest.fn();
            return this;
          }
          if(event === 'close'){
            handler()
            jest.fn();
            return this;
          }
        }),
      }
    let writeFileMock = jest.fn()

    jest.spyOn(parseLine, 'parseLine').mockImplementation(mockParseLink);
    jest.spyOn(fs, 'createReadStream').mockReturnValue(mReadStream)
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFileMock);
    jest.spyOn(readline, 'createInterface').mockReturnValue(interfaceMock);

    const app = new Reader('/test/path');

    await app.start();

    expect(mockParseLink).toHaveBeenCalled();
    expect(writeFileMock).toHaveBeenCalled();
    expect.assertions(2)
});