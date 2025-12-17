import express from "express";
import cors from "cors"; // for enabling CORS

const app = express();


app.use(express.json()); 
app.use(cors({
    domains: ["http://localhost:3000", "http://your-client-app-url.com"],
}));
app.post("/sum", function(req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b
    })

});

app.listen(3000);