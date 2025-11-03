// Write code that
// logs hi after 1 second
// logs hello 3 seconds after step 1
// logs hello there 5 seconds after step 2

function setTimeoutPromisified(ms){
    return new Promise(resolve => setTimeout(resolve,ms));

}

async function solve(){
    await setTimeoutPromisified(1000);
    console.log("hi");
    await setTimeoutPromisified(3000);
    console.log("hello");
    await setTimeoutPromisified(5000);
    console.log("hello there");
    
}

solve();