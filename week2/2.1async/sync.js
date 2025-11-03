 //reading a file synchronously 

fs = require('fs'); // importing the external fs library (file system)

const contents = fs.readFileSync("a.txt", "utf-8"); // bytes, hexcode 
console.log(contents);

const contents2 = fs.readFileSync("b.txt","utf-8"); //synchronous
console.log(contents2);


