import express from "express";

const app = express();

//function that returns a boolean if the age of person is more than 14
function isOldEnoughMiddleware(req,res,next){
    const age = req.query.age;
    if(age >= 14){
       next();
    } else{
        res.json({
            msg: "sorry",
        })
    }
}

app.get("/ride1", isOldEnoughMiddleware,function(req,res){
        res.json({
            msg: "you have successfuly ride",
        });
    });

app.listen(3000);