const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "manyawillsoongetajob"
const app = express();

app.use(express.json()); 

const users = [];

//logs the request
function logger(req,res,next){
    console.log(req.method + " request came");
    next();
}

app.post("/signup",logger,function(req,res){
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

app.post("/signin", logger,function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find( u => u.username === username && u.password === password)

    if(user){
        const token = jwt.sign({
            username: username
        },JWT_SECRET);

        res.header("jwt",token);

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

//checks if user is logged in
function auth(req,res,next){
    const token = req.headers.token;
    
    const decoded = jwt.verify(token,JWT_SECRET);

    if(decoded.username){
        req.username = decoded.username;
        next()
    }else{
        res.json({
            message: "You are not logged in"
        })
    }
}

app.get("/me",logger,auth,(req,res)=>{
    // const token = req.headers.token //jwt

    // const decodedInfo = jwt.verify(token,JWT_SECRET); //decode the JWT and get back the username
    // const unAuthDecodedInfo = jwt.decode(token) //.decode syntax

    // const username = decodedInfo.username;
    
    let user = users.find(u => u.username === req.username)

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

app.listen(3000); 