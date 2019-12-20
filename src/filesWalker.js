const fs = require('fs');
const path = require('path');

const sortFile = require('./sortFile');
const callback = require('./callback');
const removeDir = require('./removeDir');

function readDirectory(dir){
    return new Promise((res, rej) => 
        fs.readdir(dir, (err, files) => callback('readDirectory', err, files, res, rej))
    );
}

async function walkThroughFiles(dir) {
    const files = await readDirectory(dir);
    
    if (!files.length)
        await removeDir(dir);

    for await (let fileName of files){
        const filePath = path.join(dir, fileName);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()){
            await walkThroughFiles(filePath);
        } else {
            await sortFile(filePath, fileName);
        }
    }
    
    await removeDir(dir);
}

module.exports = walkThroughFiles;