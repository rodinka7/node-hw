const fs = require('fs');
const cb = require('./callback');

module.exports = dir => {
    return new Promise((res, rej) => {
        fs.mkdir(dir, err => cb('createDir', err, null, res, rej));     
    })
}