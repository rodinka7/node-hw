const fs = require('fs');
const createDir = require('./src/createDir');

const walkThroughFiles = require('./src/filesWalker');

const { 
    originalDir,
    sortedDir,
    dirPath
} = require('./src/vars');

async function run(){    
    const originalDirExists = fs.existsSync(originalDir);
    const sortedDirExists = fs.existsSync(sortedDir);

    if (!originalDirExists){
        console.log(`По указанному пути ${dirPath} директории не существует!`);        
        return;
    }

    if (!sortedDirExists)
        await createDir(sortedDir);
    
    walkThroughFiles(originalDir);
}

run();