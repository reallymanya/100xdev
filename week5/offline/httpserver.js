import axios from "axios";
async function mann(){
    const response = await axios.post("https://httpdump.app/dumps/674fec64-f797-42d1-8110-c41dba611b3e",{
        username: "harkirat",
        password: "123"
    },
    {
        headers: {
            "Authorization": "Bearer 123"
        },
    },
);
    console.log(response.data);
}

mann();

async function main(){
    const response = await axios.get("https://httpdump.app/dumps/674fec64-f797-42d1-8110-c41dba611b3e",
       //get request you cant send body 
    {
        headers: {
            "Authorization": "Bearer 123"
        },
    },
);
    console.log(response.data);
}

//CLEANER SYNTAX
async function mainn(){
    const response = await axios(
        {
        url: "https://httpdump.app/dumps/674fec64-f797-42d1-8110-c41dba611b3e",
        method: "POST",
        headers: {
            "Authorization": "Bearer 123"
        },
        data:{
            username: "manya"
        }
    },
);
    console.log(response.data);
}

mann();

mainn();