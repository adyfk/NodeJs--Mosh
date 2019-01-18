const EventEmitter = require('events');
const emitter = new EventEmitter(); //Object
    
function log(msg){
    console.log(msg)
    emitter.emit("messageLogged",{id:1,url:'http://'});
}
module.exports = log