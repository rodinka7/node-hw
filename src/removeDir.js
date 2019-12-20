const fs = require('fs');
const { needRm } = require('./vars');
const cb = require('./callback');

module.exports = function removeDir(dir){
    return new Promise((res, rej) => {
        if (!needRm){
            res();
        } else {            
            fs.rmdir(dir, err => cb('removeDir', err, null, res, rej));        
        }
    })
}