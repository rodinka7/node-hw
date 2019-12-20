const fs = require('fs');
const cb = require('./callback');
const { needRm } = require('./vars');

module.exports = filepath => {
    return new Promise((res, rej) => {
        if (!needRm){     
            res();
        } else {    
            fs.unlink(filepath, err => cb('removeFile', err, null, res, rej));     
        }
    });
}