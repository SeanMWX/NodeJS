const path = require('path');
const os = require('os');
const fs = require('fs');

var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log(totalMemory);
console.log(freeMemory);

// Template string
// ES6
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

// Sync
var files = fs.readdirSync('./');
console.log(files);

// Asyn
fs.readdir('./', function(err, files) {
	if (err) console.log(`Error: ${err}`);
	else console.log(`Results: ${files}`);
});