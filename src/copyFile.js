const fs = require("fs");

module.exports = function copyFile(source, target){
    return new Promise((resolve, reject) => {
        const rStream = fs.createReadStream(source);
        rStream.on('error', err => reject(err));
    
        const wStream = fs.createWriteStream(target);        
        wStream
            .on('error', err => reject(err))
            .on('close', () => resolve());
        
        rStream.pipe(wStream);
    });
}