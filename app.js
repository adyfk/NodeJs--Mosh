const EventEmitter = require('events');
const emitter = new EventEmitter(); //Object
    
//Register a Listener
emitter.on('messageLogged',(args)=> console.log('Listener Called',args) )

//Raise an Event
emitter.emit("messageLogged",{id:1,url:'http://'});

//Raise: Logging {data:message}