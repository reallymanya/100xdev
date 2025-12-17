
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
//import.meta.url gives the URL of the current file.
//fileURLToPath() converts the URL → actual file path.
///Users/Manya/project/app.js

const __dirname = path.dirname(__filename);
//Takes the file’s full path (__filename)
// Removes the file name from it
// Leaves only the folder path of the current file:

const FILES_DIR = path.join(__dirname,"files");
//Creates the absolute path to your files directory:



app.get("/files",(req,res) =>{
    fs.readdir(FILES_DIR, (err,files) => {
        if(err){
            return res.status(500).json({error: "unable to read directory"});
        }
        res.status(200).json(files);
    });
});


// path.join() combines two paths:
// 	•	FILES_DIR → the absolute path of your /files folder
// 	•	filename → the file the user requested (e.g., "abc.txt")
app.get("/files/:fileName", function(req,res){
    const name = req.params.fileName;
    const filepath = path.join(FILES_DIR, name);
    
    fs.readFile(filepath,"utf-8", function(err,data){
        if(err){
            return res.status(404).send("file not found");
        }
        res.status(200).send(data);
    });
});

app.use((req,res) => {
    res.status(404).send("Not found");
});

export default app; 