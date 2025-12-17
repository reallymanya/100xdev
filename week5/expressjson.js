import express from "express";

const app = express();

//middleware logs the method,timestamp,url,hostname
app.use((req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Hostname:", req.hostname);
    console.log("Time:", new Date().toISOString());
    console.log("-----------------------------");
    next(); // move to the next middleware/route
});


app.use(express.json()); // with the help of this middleware Express parses the JSON and puts it in req.body.

app.post("/sum", function(req, res) {
    console.log(req.body); 
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b
    })

});


app.listen(3000, () =>{
    console.log("server running on port 3000");
});