
const Logger = require('./logger')
const logger = new Logger()
    
logger.on('messageLogged',(args)=> console.log('Listener Called',args) )

logger.log('ini Pesan')
