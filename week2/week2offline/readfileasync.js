const fs = require("fs");

function setTimeoutPromisified(duration){
    return new Promise(function (resolve){
        setTimeout(resolve,duration);
    });
}

function readFileAsync(){
    return new Promise ( function(resolve,reject){
        fs.readFile("b.txt","utf-8",function(err,data){
            if(err)
                reject("error");
            else
                resolve(data);
        })
    })
}

//async await way
async function solve(){
    try{
   const data = await readFileAsync();
   console.log(data);
    } catch(err){
         console.error("Something went wrong:", err);
    }
}



solve();

//promise way
readFileAsync()
    .then(function(x){
        console.log("files have been read");
    })
    .catch(function(e){
        console.log(e);
    })



    //promise way 2.0
    function onDone(data) {
  console.log(data);
}

function onError(err) {
  console.log("Error: " + err);
}

readFileAsync().then(onDone).catch(onError);
