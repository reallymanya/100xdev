//A Promise in JavaScript is an object that represents the eventual completion (or failure) of an 
// asynchronous operation and its resulting value.

const fs = require("fs");

console.log("top of file");
function readTheFile(resolve){
    console.log("readTheFile called");
    setTimeout(function(){
        console.log("callback based setTimeout completed");
        resolve();
    },3000);
}

function setTimeoutPromisified(fileName){
    console.log("SetTimeoutPromisified called");
    // read the file and return its value
    return new Promise(readTheFile);
}

const p = setTimeoutPromisified();

function callback() {
    console.log("timer is done");
}

p.then(callback);

console.log("end of file ");

//custom promise class

class Promise2{
    constructor(fn){
         const afterDone = () => {
        this.resolve();   // now this works!
    };
        fn(afterDone);
    }
    then(callback){
        this.resolve = callback;
    }
}

function readTheFile(resolve){
    setTimeout(function(){
        console.log("callback based setTimeout completed");
        resolve();
    },3000);
}

function setTimeoutPromisified(fileName){
    return new Promise2(readTheFile);
}

let p2 = setTimeoutPromisified();

function callback() {
    console.log("timer is done");
}

p2.then(callback);

