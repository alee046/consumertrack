let Reader = require('./handler').Reader;
let parseLine = require('./parseLine');
let fs = require('fs');
let readline = require('readline');
let mockParseLine = jest.fn();

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
  let mockReadStream = {
    pipe: jest.fn().mockReturnThis(),
    resume: jest.fn().mockImplementation(() => {
      jest.fn();
      return this;
    }),
  };
  let interfaceMock = {
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

  jest.spyOn(parseLine, 'parseLine').mockImplementation(mockParseLine);
  jest.spyOn(fs, 'createReadStream').mockReturnValue(mockReadStream)
  jest.spyOn(fs, 'writeFile').mockImplementation(writeFileMock);
  jest.spyOn(readline, 'createInterface').mockReturnValue(interfaceMock);

  let app = new Reader('/test/path');

  await app.start();

  expect(mockParseLine).toHaveBeenCalled();
  expect(writeFileMock).toHaveBeenCalled();
  expect.assertions(2)
});