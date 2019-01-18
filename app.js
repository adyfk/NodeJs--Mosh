const fs = require('fs');

console.log(fs.readdirSync('./'))


//always prefer to use it
fs.readdir('$', (err, result) => {
    if (err) console.log('Error', err)
    else console.log(result)
})