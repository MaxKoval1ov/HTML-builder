const fs = require('fs');
const path = require('path');

const file = path.parse("/file.txt");

let readableStream = fs.createReadStream("./text.txt", "utf8");

readableStream.on("data", function(chunk){ 
  console.log(chunk);
});


// console.log(file);

// const readFileAsArray = function(file, cb) {
//     fs.readFile(file, function(err, data) {
//       if (err) {
//         return cb(err);
//       }
//       const lines = data.toString().trim();
//       cb(lines);
//     });
//   };

//   readFileAsArray("text.txt",console.log);