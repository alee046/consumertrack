# consumertrack take home

### Libraries used
1.  geoip-lite: 3rd party service that gets its data from the maxminds API
    csv-stringify: helper method that turns a nested structure to csv format
    ua-parser-js: UA parsing library
    jest: for unit testing
    
### How to start
1. `cd` into the project folder.
2. run `npm install` to install 3rd party libraries.
3. run `node index.js` to run the program, a csv will be output `my.csv`
- The structure of the CSV will be `logStream,deviceType,browserType,country,state`

### Notes/Todos
1. Added unit tests
2. Tried to get docker image running in time box
Todos
1. Can add error handling
2. Can add a node env arg to pass in log file path
