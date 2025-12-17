import express from "express";

const app = express();

//middleware logs the method,timestamp,url,hostname
app.use(function(req,res,next){
    console.log(`Method: ${req.method}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`hostname: ${req.hostname}`);
    console.log(`URL: ${req.url}`);
    next();
})

app.get("/sum/:a/:b", function(req, res) {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);

    res.json({
        ans: a + b
    })

});

app.get("/multiply", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a * b
    })

    
});

app.get("/divide", function(req, res) {
     const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
 const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a - b
    })
});

app.listen(3000);