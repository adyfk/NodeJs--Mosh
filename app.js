const os = require('os');
var totalMemory = os.totalmem()
var freeMemory = os.freemem()

console.log('Host Name', os.hostname())
console.log('OS type', os.type())
console.log('Total Memory', totalMemory)
console.log('Free Memory', freeMemory)