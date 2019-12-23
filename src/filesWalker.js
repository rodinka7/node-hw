const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const stat = promisify(fs.stat);

const sortFile = require('./sortFile');
const callback = require('./callback');
const removeDir = require('./removeDir');

const { needRm } = require('./vars');

function readDirectory(dir){
    return new Promise((res, rej) => 
        fs.readdir(dir, (err, files) => callback('readDirectory', err, files, res, rej))
    );
}

async function walkThroughFiles(dir) {
    const files = await readDirectory(dir);

    for await (let fileName of files){
        const filePath = path.join(dir, fileName);
        
        await stat(filePath)
            .then(async stats => {
                if (stats.isDirectory()){
                    await walkThroughFiles(filePath);
                } else {
                    await sortFile(filePath, fileName);
                }
            })
            .catch(error => {
                console.log(error);                
            })
    }
    
    if (needRm)
        await removeDir(dir);
}

module.exports = walkThroughFiles;