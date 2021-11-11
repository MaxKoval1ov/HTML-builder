const fs = require('fs');
const process = require('process')

let writeableStream = fs.createWriteStream("./02-write-file/text.txt",{
    flags: 'a+' // 'a' means appending (old data will be preserved)
  });


const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
    })

readline.on("line", (msg) => {
    if(msg == "exit")
    {
      process.exit();
    }
    writeableStream.write(msg + "\n");
})
  
process.on('SIGINT', (signal) => {
    console.log(`Received ${signal}`);
    process.exit();
})

process.on('exit', (code) => {
    readline.close();
    writeableStream.end();
    console.log('Bye bye!Process exit event with code: ', code);
  });
console.log("Hello, write smth to file:");