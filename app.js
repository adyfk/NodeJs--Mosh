const EventEmitter = require('events');
const emitter = new EventEmitter(); //Object
    
emitter.on('messageLogged',(args)=> console.log('Listener Called',args) )
//wilnot Called

const log = require('./logger')
log('ini Pesan')
