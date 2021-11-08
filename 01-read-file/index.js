const fs = require('fs');

let readableStream = fs.createReadStream("./text.txt", "utf8");

readableStream.on("data", function(chunk){ 
  console.log(chunk);
});