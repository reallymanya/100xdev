import express from "express";

const app = express();

let requestCount = 0;

function requestIncrease(req,res,next){
    requestCount = requestCount + 1;
    console.log("total number of requests = " + requestCount);
    next();
}

function realSumHandler(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })

}

app.get("/sum", requestIncrease,realSumHandler );
app.get("/admin", function(req, res){
    res.json({
        message: "total number of requests = " + requestCount
    });
});
app.listen(3000);