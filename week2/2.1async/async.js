//start all 3 tasks and wait for them to finish

/*const fs = require("fs");

function print(err, data){
    if(err){
        console.log("File not found");
    }else
    console.log(data);
}

fs.readFile("a.txt","utf-8",print); //asynchronously

fs.readFile("b.txt","utf-8",print);

console.log("Done");
*/

//timeout

function timeout(){
    console.log("click button");
}

console.log("hi");

//i/o bound
setTimeout(timeout,1000);

console.log("welcome");

//cpu bound will run first
// above fn will remain in call stack until thread is idle
let c = 0;
for(let i = 0; i<10000000000;i++){
    c = c++;
}

console.log("expensive op done");