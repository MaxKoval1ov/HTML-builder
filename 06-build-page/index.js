const fs = require('fs')
const path = require('path');
const { PerformanceNodeTiming } = require('perf_hooks');

function mergeFiles(source ,destination, ext)
 {
    let arr = [];
      fs.readdir(source, {withFileTypes: true}, async (err, files) => {
    if (err) throw err;
    files.forEach(a => {
        let tmpPath = path.join(source, a.name);
        let parse = path.parse(tmpPath);
        if(a.isFile(), parse.ext == ext)
             fs.readFile(tmpPath, 'utf-8',(err, str) => {
                arr.push(str);
                 fs.writeFile(destination, arr.join(""), err => {
                    if(err) throw err;
                    })
            })
    })
})
}

function copyFiles(source, dest){
    fs.readdir(source, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(source,dest);
            throw err;
        }
        files.forEach( a => {
            if(a.isFile())
            {
                fs.copyFile(source + "/" + a.name, dest + "/" + a.name, (err) => {
                    if(err) throw err;
                })
            }
            else {
                fs.mkdir(dest + "/" + a.name, {recursive: true}, (err) => {
                    if (err) throw err;
                })
                copyFiles(source + "/" + a.name, dest + "/" + a.name)
            }
        })
    })
}

// async function getComponents(components) {
//     let obj = {};
//      fs.readdir(components,{withFileTypes: true}, (err, files) => {
//         files.forEach( a => {
//             let filePath = path.join(components,a.name);
//             let parsed = path.parse(filePath);
//              fs.readFile(filePath, 'utf-8',(err, str) => {
//                 if(err) throw err;
//                 console.log(str);
//                 obj[parsed.name] = str;
//             })
//         })
//     })
//     return obj;
// }

async function getComponents(components){
    let obj = {};
    const files = await fs.promises.readdir(components);
    for(let file of files){
        let filePath = path.join(components, file);
        let parsed = path.parse(filePath);

        const data = await fs.promises.readFile(filePath, "utf-8");
        obj[parsed.name] = data;
    }
    return obj;
}

function makeHtml(source, destination, template,components) {

    
    fs.readFile(template, 'utf-8', (err, data) => {
        getComponents(components).then( obj => {
            for(let prop in obj){
                data = data.replace(`{{${prop}}}`, obj[prop])
            }
            return data;
        }).then((data) => fs.writeFile(destination,data, err => {
            if(err) throw err
        }))
    })
}

//Existing files
const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const styles = path.join(__dirname, "styles");
const assets = path.join(__dirname, "assets");

//new files
const projectDist = path.join(__dirname, "project-dist");
const newHtml = path.join(projectDist, "index.html");
const newStyles = path.join(projectDist, 'style.css');
const newAssets = path.join(projectDist, 'assets');


fs.mkdir(projectDist, { recursive: true }, (err) => {
    if(err) throw err;
  })

mergeFiles(styles, newStyles, ".css");

fs.rm(newAssets, { recursive: true }, () => {
    fs.mkdir(newAssets, { recursive: true }, (err) => {
      if(err) throw err;
      copyFiles(assets,newAssets);
    })
});

makeHtml("s",newHtml,template, components);