
//Assignment #2 - Trying to code a filesystem based todo app and store data into the file todo.json 

import fs from "fs";

import express from "express";
import { nanoid } from "nanoid";

const app = express();
app.use(express.json()); 

//reading from todos.json
const todos = JSON.parse(fs.readFileSync("todos.json", "utf-8"));


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
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));

});

//delete to do
app.delete("/todos/:id", (req,res)=>{
    const idr = todos.findIndex(x => x.id === req.params.id);
    if(idr === -1 ) return res.status(400).json({error: "Todo not found"});
    const removed = todos.splice(idr, 1)[0];
    res.json({message: "Deleted", deleted: removed});
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));

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
    fs.writeFileSync("todos.json", JSON.stringify(todos, null, 2));

})

app.listen(3000);