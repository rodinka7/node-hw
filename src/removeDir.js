const fs = require('fs');
const cb = require('./callback');

module.exports = function removeDir(dir){
    return new Promise((res, rej) =>                   
        fs.rmdir(dir, err => cb('removeDir', err, null, res, rej))
    )
}