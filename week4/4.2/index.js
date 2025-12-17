import express from 'express'

const app = express()

function sum(n){
  let ans = 0;
  for(let i = 1; i<=n;i++){
    ans = ans + i;
  }
  return ans;
}

//route handlers
app.get('/', (req, res) => {
  const n = parseInt(req.query.n);
  const ans = sum(n);
  res.send('Hello World sum is ' + ans);
}) //input will be passed as /?n=5

app.post('/', (req, res) => { 
  res.send('Hello World from myside')
})


app.listen(3000) //which part 