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

    if (!sortedDirExists){
        fs.mkdir(sortedDir, {recursive: true}, err => {
            if (err){
                console.log(err);
                return;
            }
            searchFiles(originalDir);
        });            
    } else 
        searchFiles(originalDir);
}

function searchFiles(dir) {
    const structure = fs.readdirSync(dir);

    structure.forEach(item => {
        const filePath = path.join(dir, item);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()){            
            searchFiles(filePath);
        } else {
            moveFile(filePath, item);
        } 
    });

    removeDirectory(dir);
}

function moveFile(filePath, item) {
    const splitedFileName = item.split(''); 
    let firstLetter = findFirstLetter(splitedFileName);
    
    if (!firstLetter) return;
    
    const newDir = path.join(sortedDir, firstLetter); 
    
    const exists = fs.existsSync(newDir);
    
    if (!exists)
        fs.mkdirSync(newDir);

    const data = fs.readFileSync(filePath);     
        
    if (data) {
        try {
            fs.writeFileSync(path.join(newDir, item), data);
            removeFile(filePath);                               
        } catch(error) {
            console.log(error);
        }
    } else 
        removeFile(filePath);
}  

function removeFile(filePath) {    
    if (!needRm) return;
    
    try {
        fs.unlinkSync(filePath);
    } catch(err) {
        console.log(err);        
    }  
}

function removeDirectory(dir) {
    if (!needRm) return;  

    let files = fs.readdirSync(dir);
    if (files.length) return;
    
    try {
        fs.rmdirSync(dir);
    } catch(error) {
        console.log(error);                        
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