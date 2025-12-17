//add user logic //users with ids and they have theit own todos

import fs from "fs";

import express from "express";

const app = express();
app.use(express.json()); 

const loadUsers = () => {
  return JSON.parse(fs.readFileSync("users.json", "utf-8"));
};

const saveUsers = (users) => {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
};

//GET all todos for a user
app.get("/users/:id/todos", (req, res) => {
    const users = loadUsers();

    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.todos);
});


//adding todo in a user
app.post("/users/:id/todos",(req,res) =>{
    const {title} = req.body || {};
    if(!title) return res.status(400).json({error: "add the title"})

   const users = loadUsers();

   const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    
    const newTodo = {
        id: String(Date.now()),  // simple unique ID
        title,
        completed: false
    };
    user.todos.push(newTodo);

    saveUsers(users);
    res.status(201).json(newTodo); //201 = created

});

//deleting todo for a user

app.delete("/users/:userid/todos/:todosid", (req,res)=>{

    const users = loadUsers();

   const user = users.find(u => u.id === req.params.userid);
    if (!user) return res.status(404).json({ error: "User not found" });

    const idr = user.todos.findIndex(x => x.id === req.params.todosid);
    if(idr === -1 ) return res.status(400).json({error: "Todo not found"});
    const removed = user.todos.splice(idr, 1)[0];
     saveUsers(users);
    res.json({message: "Deleted", deleted: removed});


});

//updating todo for a user

app.put("/users/:userid/todos/:todosid", (req,res)=>{
    const users = loadUsers();

   const user = users.find(u => u.id === req.params.userid);
    if (!user) return res.status(404).json({ error: "User not found" });

    const {title, completed} = req.body || {};

    const idr = user.todos.findIndex(x => x.id === req.params.todosid);
    if(idr === -1) return res.status(404).json({error: "Todo not found"});

    if (title !== undefined) {
        user.todos[idr].title = title;
    }
    if (completed !== undefined) {
        user.todos[idr].completed = completed;
    }
    saveUsers(users);
   
res.json(user.todos[idr]);
})

//get all users
app.get("/users", (req, res) => {
    const users = loadUsers();
    res.json(users);
});
//create user
app.post("/users", (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const users = loadUsers();

    const newUser = {
        id: String(Date.now()),   
        name,
        todos: []              
    };

    users.push(newUser);

    saveUsers(users);

    res.status(201).json(newUser);
});

//delete user
app.delete("/users/:id",(req,res)=>{
     const users = loadUsers();

     const idr = users.findIndex(u => u.id === req.params.userid);
     if (idr === -1) return res.status(404).json({ error: "User not found" });

     const removed = users.splice(idr, 1)[0];

     saveUsers(users);

     res.json({ message: "User deleted", deleted: removed });

})

app.listen(3000);