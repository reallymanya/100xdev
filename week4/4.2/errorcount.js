import express from "express";
const app = express();
let errorCount = 0;

// You have been given an express server which has a few endpoints.
// Your task is to
// 1. Ensure that if there is ever an exception, the end user sees a status code of 404
// 2. Maintain the errorCount variable whose value should go up every time there is an exception in any endpoint

app.get('/user', function(req, res) {
   const shouldWork = req.query.ok === "true";

  if (shouldWork) {
    // SUCCESS
    return res.status(200).json({ name: 'john' });
  }

  // ERROR
  next(new Error("User not found"));
 // throw new Error("User not found");
  
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.get('/errorCount', function(req, res) {
  res.status(200).json({ errorCount });
});

//error handling middleware
app.use(function(err,req,res,next)
{
     errorCount++;
    res.status(404).send({})
   
})

app.listen(3000);