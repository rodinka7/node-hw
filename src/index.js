const fs = require('fs');
const { promisify } = require('util');
const access = promisify(fs.access);

const createDir = require('./createDir');
const walkThroughFiles = require('./filesWalker');

const { 
    originalDir,
    sortedDir
} = require('./vars');

function run(){
    access(originalDir)
        .then(() => {
            access(sortedDir)
                .then(() => {
                    walkThroughFiles(originalDir);
                })
                .catch(async err => {
                    await createDir(sortedDir);
                    walkThroughFiles(originalDir);                  
                })
        })
        .catch(err => {
            console.log('access', originalDir, err);                    
        })
}

run();