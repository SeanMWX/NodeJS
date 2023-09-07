const EventEmitter = require('events');
const Logger = require('./logger');

const emitter = new EventEmitter();
const logger = new Logger();

// Register a listener
logger.on('log', (arg) => {
    console.log(`Listener called:`);
    console.log(arg);
});

logger.log({id: 1, name: 'CoCo', age: 18});

