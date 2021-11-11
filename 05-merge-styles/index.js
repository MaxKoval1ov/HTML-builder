const path = require('path');
const fs = require('fs');

const styles = path.join(__dirname, "styles");
const bundle = path.join(__dirname, "project-dist", "bundle.css")

let arr = [];

async function mergeStyles(source ,destination)
 {
      fs.readdir(source, {withFileTypes: true}, async (err, files) => {
    if (err) throw err;

    files.forEach(a => {
        let tmpPath = path.resolve(source, a.name);
        let parse = path.parse(tmpPath);
        if(a.isFile(), parse.ext == '.css')
             fs.readFile(tmpPath, 'utf-8',(err, str) => {
                arr.push(str);
                 fs.writeFile(destination, arr.join(""), err => {
                    if(err) throw err;
                    })
            })
    })
})
}

mergeStyles(styles, bundle);

