// Try to create a TODO application where

// 1. User can signup/signin
// 2. User can create/delete/update TODOs
// 3. User can see their existing todos and mark them as done



import express from "express";
import jwt from 'jsonwebtoken';
const JWT_SECRET = "thisisatodo"
import path from "path";
import { fileURLToPath } from "url";
const app = express();

// needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); 
app.use(express.static(path.join(__dirname, "todo")));
//Tell Express to serve ALL files inside the todo folder directly to the browser.”

const users = [];

//logs the request
function logger(req,res,next){
    console.log(req.method + " request came");
    next();
}

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "TODO","index2.html"));
})

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
        password: password,
        todos: []
    })

    res.json({
        message: "You are signed up"
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
    try{
    const token = req.headers.token;
    const decoded = jwt.verify(token,JWT_SECRET);
    req.username = decoded.username;
        next();

    }catch(err){
        return res.status(401).json({
            error: "You are not logged in"
        })
    }
}

app.get("/todos",logger,auth,(req,res)=>{
    let user = users.find(u => u.username === req.username);

  res.json({
    todos: user.todos || []
  });
})

app.post("/todos",logger, auth,(req,res) =>{
    const text = req.body.text;
    if(!text) return res.status(400).json({error: "add the title"})

    let user = users.find(u => u.username === req.username);
    const id = Date.now();
    const completed = false;
    const newtask = {id, text,completed};
    user.todos.push(newtask);

    res.status(201).json({todo: newtask}); 
});

app.put("/todos/:id", logger, auth, (req,res)=>{

    let user = users.find(u => u.username === req.username);

    const todo = user.todos.find(t => t.id == req.params.id);
    
     if (!todo) return res.status(404).json({ error: "Todo not found" });

     const { text, completed } = req.body;
     
    if (text !== undefined) {
    todo.text = text;
    }
    
    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json({message: "Tododos Updated", todo});
})

app.delete("/todos/:id", logger, auth, (req, res) => {
  let user = users.find(u => u.username === req.username);

  user.todos = user.todos.filter(t => t.id != req.params.id);

  res.json({ message: "Todo deleted" });
});


app.listen(3000); 