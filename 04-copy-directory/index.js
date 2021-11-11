const fs = require('fs')
const path = require('path/posix')

function copyFiles(folder) {
    const dir = path.join(__dirname, folder);
    const newDir = dir + "-copy";
   
    fs.mkdir(newDir, { recursive: true }, (err) => {
        if (err) throw err;
    })

    fs.readdir(newDir, (err, files) => {
    if(err) throw err;
    files.forEach( a => {
        fs.unlink(path.join(newDir, a), err => {
        if(err) throw err;
        })
    })
    })
    
    fs.readdir(dir,{ withFileTypes: true }, (err, files) => {
    if (err) {
        throw err;
    }
    files.forEach((a) => {
        if(a.isFile()){
            fs.copyFile(dir + "/" + a.name, newDir + "/" + a.name, (err) => {
                if(err) throw err;
            })
        }
    }) 
    })
}

copyFiles("./files")