const fs = require('fs');
const path = require('path');

const copyFile = require('./copyFile');
const { sortedDir, needRm, rgx } = require('./vars');
const createDir = require('./createDir');
const removeFile = require('./removeFile');

function showError(err){
    console.log('done', err);
}

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
    const exists = fs.existsSync(newDir);
    
    if (!exists)        
        await createDir(newDir); 
    
    await copyFile(
        filePath, 
        path.join(newDir, item), 
        showError
    );    
    
    await removeFile(filePath);    
}