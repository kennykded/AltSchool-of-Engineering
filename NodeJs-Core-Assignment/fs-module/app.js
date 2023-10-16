import { mkdir, writeFile, appendFile, rename, readFile, unlink, rmdir } from 'fs';
import { resolve, join } from 'path';

let cwd = resolve()
let folderPath = join(cwd, 'Students');
let newFolderPath = join(cwd, 'Names');
let myName = 'Kenny David'
let moreDetails = `age: 30\n sex:Male \n phoneNumber: 0703864XXXX \n role:Backend Engineer`


// Create directory/folder named: “Students”
function makeDirectory() {
    mkdir(folderPath, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder created successfully!')
    });

}
console.log(makeDirectory());


// In the Students directory, create a file named user.js 
function writeToFile() {
    writeFile(join(folderPath, 'user.js'), 'Hello World', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('File written successfully!')

    });
}
console.log(writeToFile());


// Update the Students directory to “Names”
function renameDirectory() {
    rename(folderPath, newFolderPath, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Directory renamed successfully!')

    });
}
console.log(renameDirectory())


// Add your name as content to the file user.js
function reWriteToFile() {
    writeFile(join(newFolderPath, 'user.js'), myName, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('File written successfully!')

    });
}
console.log(reWriteToFile())


// Update the file and add your age, sex, nationality, phone number and any other information about yourself
function appendToFile() {
    appendFile(join(newFolderPath, 'user.js'), moreDetails, err => {
        if (err) {
            console.log(err);
        }
        console.log('File appended successfully!')

    })
}
console.log(appendToFile())


// Update the file user.js to {your_name}.js
function renameFile() {
    rename(join(newFolderPath, 'user.js'), join(newFolderPath, 'kenny_david.js'), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('file renamed successfully!')
    })

}
console.log(renameFile())


// Read the contents from {your_name}.js. User fs.open or fs.readFile
function readContent() {
    readFile(join(newFolderPath, 'kenny_david.js'), 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log('file read successfully!')

    });

}
console.log(readContent())


// Delete the file {your_name}.js
function deleteFile() {
    unlink(join(newFolderPath, 'kenny_david.js'), (err) => {
        if (err) throw err;
        console.log('File deleted succesfully')

    })
}
console.log(deleteFile())


// Delete the directory “Names”
function deleteDirectory() {
    rmdir(newFolderPath, (err) => {
        if (err) throw err
        console.log('folder deleted succesfully!')
    });

}
console.log(deleteDirectory())
