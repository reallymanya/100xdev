//express app to generate an authenticated backend 

const express = require("express");

const app = express();

app.use(express.json()); //help you parse the post body

const users = [];

//should return random long string
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        

    let token = "";
    for (let i = 0; i < 32; i++) {
        
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    if(users.find(u => u.username === username && u.password === password)){
        res.json({
            message: "You are already signed up"
        })
        return
    }

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are signed in"
    })

    console.log(users);
})

app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find( u => u.username === username && u.password === password)

    if(user){
        const token = generateToken();
        user.token = token;
        res.json({
            token: token
        })
    }
    else {
        return res.status(401).json({ 
            error: "Invalid username or password" 
        })
    }

    console.log(users);
})

//creating an authenticated ep
//endpoint that'll only return you info if you have signed in
// endpoint /me that returns users information only if they send their token

app.get("/me",(req,res)=>{
    const token = req.headers.token

    // const foundUser = null;
    // for(let i = 0; i< users.length;i++){
    //     if(users[i].token === token){
    //         foundUser = users[i];
    //     }
    // }
    let user = users.find(u => u.token === token)

    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    }else{
        res.json({
            error: "token invalid"
        })
    }
})

app.listen(3000); //http server listening on port 3000