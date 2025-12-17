import axios from "axios";

//two popular ways to hit the backend server and get response from there

function main(){
    fetch("https://jsonplaceholder.typicode.com/todos/1") //returns a promise
    .then( async response => {
        const json = await response.json();
        console.log(json.id);
    })
}

//slightly cleaner 
async function mainn(){
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1") //returns a promise
    const json = await response.json();
    console.log(json);
}

//sending post
async function man(){
    const response = await fetch("https://www.postb.in/1764595355175-6093447497114",
        {
        method: "POST"
    }
) 
    const textual = await response.text();
    console.log(textual);
}
// --------------------------------
//using axios
async function mainnn(){
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1") //returns json data directly
    //response.data has json
    console.log(response.data.id);
}

//sending post 
async function mann(){
    const response = await axios.post("https://www.postb.in/1764595355175-6093447497114")
    console.log(response.data);//do not have to worry about parse, axios will parse automatically
}


main();
mainnn();
man();