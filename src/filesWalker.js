const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);

const sortFile = require('./sortFile');
const { needRm } = require('./vars');

async function walkThroughFiles(dir) {
    const files = await readdir(dir);

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
        await rmdir(dir);
}

module.exports = walkThroughFiles;