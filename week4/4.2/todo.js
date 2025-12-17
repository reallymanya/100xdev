//Assignment #1 - Trying to code a todo app and store data into the array


import express from "express";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json()); 

let todos = [
  {
    id: "1",
    title: "Buy groceries",
    completed: false
  },
  {
    id: "2",
    title: "Finish assignment",
    completed: true
  },
  {
    id: "3",
    title: "Go for a walk",
    completed: false
  }
];

//get all
app.get("/todos",(req,res)=>{
    res.json(todos);
});

//get specific
app.get("/todos/:id", (req,res) =>{
    const u = todos.find(x => x.id === req.params.id);
    if(!u) return res.status(404).json({error : "Todo not found"});
    res.json(u);
});
//create to do
app.post("/add",(req,res) =>{
    const {title} = req.body || {};
    if(!title) return res.status(400).json({error: "add the title"})
    const id = nanoid ? nanoid(8) : String(Date.now());
    const completed = false;
    const newtask = {id, title,completed};
    todos.push(newtask);
    res.status(201).json(newtask); //201 = created
});

//delete to do
app.delete("/todos/:id", (req,res)=>{
    const idr = todos.findIndex(x => x.id === req.params.id);
    if(idr === -1 ) return res.status(400).json({error: "Todo not found"});
    const removed = todos.splice(idr, 1)[0];
    res.json({message: "Deleted", deleted: removed});
});

//update to do
app.put("/todos/:id", (req,res)=>{
    const {title,completed} = req.body || {};
    const idr = todos.findIndex(x => x.id === req.params.id);
    if(idr === -1) return res.status(404).json({error: "Todo not found"});
    if (title !== undefined) {
        todos[idr].title = title;
    }
    if (completed !== undefined) {
        todos[idr].completed = completed;
    }

    res.json(todos[idr]);
})

app.listen(3000);

//let currentId = 1;

// //app.post("/add", (req, res) => {
//   const { title } = req.body || {};
//   if (!title) return res.status(400).json({ error: "Add the title" });

//   const newTask = {
//     id: currentId++,
//     title,
//     completed: false
//   };

//   todos.push(newTask);
//   res.status(201).json(newTask);
// });