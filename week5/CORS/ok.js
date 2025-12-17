import express from "express";
// import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json()); 
// app.use(cors());

//hosting on same domain
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"achha","index.html"));
})
app.post("/sum", function(req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b
    })
});

app.listen(3000);




