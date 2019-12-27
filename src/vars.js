const path = require('path');
const fs = require('fs');

const args = process.argv.splice(2);

let [ dirPath, sortedDirPath, needRm ] = args;

if (!dirPath || !sortedDirPath){
    console.log(`Запустите скрипт script.js с указанием пути к папке, которую нужно отсортировать, и пути, по которому разместить папку с отсортированными файлами!`);
    process.exit(0);
}

const originalDir = path.join(dirPath);
const sortedDir = path.join(sortedDirPath);

const rgx = /^[a-z]+$/;

needRm = needRm == 'true' ? 1 : 0;

module.exports = {
    originalDir,
    sortedDir,
    needRm,
    rgx
}
