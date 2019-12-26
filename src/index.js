const fs = require('fs');
const { promisify } = require('util');
const access = promisify(fs.access);
const mkdir = promisify(fs.mkdir);

const walkThroughFiles = require('./filesWalker');

const { 
    originalDir,
    sortedDir
} = require('./vars');

async function run(){
    try {
        await access(originalDir);
    } catch(err){
        console.log('access', originalDir, err);
        return;                  
    }

    try {
        await access(sortedDir);
    } catch(err){
        await mkdir(sortedDir);
    }

    walkThroughFiles(originalDir);
}

run();