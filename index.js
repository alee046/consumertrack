var Reader = require('./handler').Reader;


const reader = new Reader('./gobankingrates.com.access.log');
reader.start();

