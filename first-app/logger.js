const EventEmitter = require('events');
var url = 'http://mylogger.io/log';

const emitter = new EventEmitter();

class Logger extends EventEmitter {
    log(message) {
        // Send an HTTP request
        this.emit('log', message);
    }
}

// export object
// module.exports.log = log;

// export function
module.exports = Logger;

// console.log(__filename);
// console.log(__dirname);

