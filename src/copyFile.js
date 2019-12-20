const fs = require("fs");

module.exports = function copyFile(source, target, callback){
    return new Promise(resolve => {        
        let callbackCalled = false;
    
        const rStream = fs.createReadStream(source);
        rStream.on('error', err => done(err));
    
        const wStream = fs.createWriteStream(target);        
        wStream
            .on('error', err => done(err))
            .on('close', () => {
                done();             
                resolve();
            });
        
        rStream.pipe(wStream);
        
        function done(err){
            if (!callbackCalled && err){
                callback(err);
                callbackCalled = true;
            }            
        }
    });
}