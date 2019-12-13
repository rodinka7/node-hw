const fs = require('fs');
const path = require('path');

const args = process.argv.splice(2);

let [ dirPath, sortedDirPath, needRm ] = args;
    
const originalDir = path.join(dirPath);
const sortedDir = path.join(sortedDirPath);

function init(){    
    const originalDirExists = fs.existsSync(originalDir);
    const sortedDirExists = fs.existsSync(sortedDir);

    needRm = needRm == 'true' ? 1 : 0;

    if (!originalDirExists){
        console.log(`По указанному пути ${dirPath} директории не существует!`);        
        return;
    }

    fs.readdir(originalDir, (err, files) => {
        if (err){
            console.log(err);
            return;
        }

        if (!files.length){
            removeDir(originalDir, 'dir');
            return;
        }

        if (!sortedDirExists){
            fs.mkdir(sortedDir, {recursive: true}, error => {
                if (error){
                    console.log(error);
                    return;
                }
                searchFiles(files, originalDir);
            });            
        } else 
            searchFiles(files, originalDir);
    })
}

function searchFiles(files, dir) {
    files.forEach(item => {
        const filePath = path.join(dir, item);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()){
            searchFiles(fs.readdirSync(filePath), filePath);
        } else {
            moveFile(filePath, item);
        } 
    });

    removeDir(dir, 'dir');
}

function moveFile(filePath, item) {
    const splitedFileName = item.split(''); 
    let firstLetter = findFirstLetter(splitedFileName);
    
    if (!firstLetter) return;
    
    const newDir = path.join(sortedDir, firstLetter); 
    
    const exists = fs.existsSync(newDir);
    
    if (!exists)
        fs.mkdirSync(newDir);

    try {
        fs.copyFileSync(filePath, path.join(newDir, item));
        removeDir(filePath);
    } catch(error) {
        console.log(error);
    }
}  

function removeDir(dir, entity){
    if (!needRm) return;
    
    try {
        switch(entity) {
            case 'dir':
                fs.rmdirSync(dir);
                break;
            default:
                fs.unlinkSync(dir);  
        }
    } catch(err) {
        console.log(err);        
    } 
}

function findFirstLetter(splited) {
    const rgx = /^[a-z]+$/;

    for (let i = 0; i < splited.length; i++) {
        let letter = splited[i].toLowerCase();
        if (letter.match(rgx)){
            return letter;
        }
    }
}

init();