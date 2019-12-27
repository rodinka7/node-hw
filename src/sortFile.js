const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);
const mkdir = promisify(fs.mkdir);

const copyFile = require('./copyFile');
const { 
    sortedDir, 
    needRm, 
    rgx 
} = require('./vars');

module.exports = async function sortFile(filePath, item){
    const splitedFileName = item.split('');

    const firstLetter = splitedFileName.reduce((prev, letter) => {
        letter = letter.toLowerCase();
        if (!prev && letter.match(rgx)){
            prev = letter;
        }
        return prev;
    }, '');
    
    if (!firstLetter) return;
    
    const newDir = path.join(sortedDir, firstLetter);

    try {
        await access(newDir);
    } catch(err){
        await mkdir(newDir);
    }
    
    try {
        await copyFile(
            filePath, 
            path.join(newDir, item)
        );
    } catch(e){
        console.log(e);
        return;
    }
    
    if (needRm)
        await unlink(filePath);
}