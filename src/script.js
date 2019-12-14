const fs = require('fs');
const path = require('path');

const args = process.argv.splice(2);

let [ dirPath, sortedDirPath, needRm ] = args;
    
const originalDir = path.join(dirPath);
const sortedDir = path.join(sortedDirPath);

const rgx = /^[a-z]+$/;

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
            try {
                fs.rmdirSync(originalDir);
            } catch(error) {
                console.log(error);
            }
            return;
        }

        if (!sortedDirExists){
            fs.mkdir(sortedDir, {recursive: true}, error => {
                if (error){
                    console.log(error);
                    return;
                }
                searchFiles(originalDir);
            });            
        } else 
            searchFiles(originalDir);
    })
}

function searchFiles(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(item => {
        const filePath = path.join(dir, item);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()){
            searchFiles(filePath);
        } else {
            moveFile(filePath, item);
        } 
    });

    if (needRm) {
        try {
            fs.rmdirSync(dir);
        } catch(error){
            console.log(error);
        }
    }
}

function moveFile(filePath, item) {
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
        fs.mkdirSync(newDir);

    try {
        fs.copyFileSync(filePath, path.join(newDir, item));
        
        if (needRm) {
            try {
                fs.unlinkSync(filePath);
            } catch(error) {
                console.log(error);
            }
        }
    } catch(error) {
        console.log(error);
    }
}

init();