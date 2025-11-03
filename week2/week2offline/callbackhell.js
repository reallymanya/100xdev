// Write code that
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

setTimeout(function(){
    console.log("hi");
    setTimeout(function(){
        console.log("hello");
        setTimeout(function(){
            console.log("hello there");
        },5000);
    },3000);
},1000);

//alt solution
function step3done(){
    console.log("hello there");
}

function step2done(){
    console.log("hello");
    setTimeout(step3done,5000);
}

function step1done(){
    console.log("hi");
    setTimeout(step2done,3000);
}

setTimeout(step1done,1000);

//promisified version
function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

setTimeoutPromisified(1000).then(function () {
  console.log("hi");
  setTimeoutPromisified(3000).then(function () {
    console.log("hello");
    setTimeoutPromisified(5000).then(function () {
      console.log("hello there");
    });
  });
});

//better version (promise chaining)
setTimeoutPromisified(1000).then(function()
{
    console.log("hi");
    return setTimeoutPromisified(3000);
})
.then(function(){
    console.log("hello");
    return setTimeoutPromisified(5000);
})
.then(function(){
    console.log("hello there");
})

//Each .then() waits for the previous one’s returned promise to resolve.
//So it forms a clean sequential chain, avoiding “callback hell.”