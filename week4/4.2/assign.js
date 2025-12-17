/*You need to create 4 routes (4 things that the hospital can do)
1. GET - User can check how many kidneys they have and their health
2. POST - User can add a new kidney
3. PUT - User can replace a kidney, make it healthy
4. DELETE - User can remove a kidney*/

import express from "express";

const app = express();

var users = [
  {
    name: "John",
    kidneys: [
      {
        healthy: false,
      },
      {
        healthy: true
      }
    ]
  }
];

app.use(express.json()); // with the help of this middleware Express parses the JSON and puts it in req.body.

app.get("/", function (req, res) {
  const johnKidneys = users[0].kidneys;
  const numofKidneys = johnKidneys.length;
  let numofHealthyKindeys = 0;

  // for (let i = 0; i < johnKidneys.length; i++) {
  //   if (johnKidneys[i].healthy) {
  //     numofHealthyKindeys = numofHealthyKindeys + 1;
  //   }
  // }

  //using filter function
  const healthyKidneys = johnKidneys.filter(kidney => kidney.healthy);
    const numofHealthyKidneys = healthyKidneys.length;

  const numofUnhealthyKidneys = numofKidneys - numofHealthyKindeys;

  res.json({
    numofKidneys,
    numofHealthyKindeys,
    numofUnhealthyKidneys,
  });
});

//add a kidney 
app.post("/", function (req, res) {
  let isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });

  res.json({
    msg: "Done",
  });
});

//converts unhealthy to healthy

app.put("/", function (req, res) {
    if (isthereatleastoneunhealthykidney()) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json({});
} else{
    res.status(411).json({
      msg: "You have no bad kidneys",
    });
}
});

//removing all the unhealthy kidneys
//only if atleast one unhealthy kidney is there, do this else return 411

function isthereatleastoneunhealthykidney() {
  let atleastoneunhealthykidney = false;

  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastoneunhealthykidney = true;
    }
  }
  return atleastoneunhealthykidney;
}
app.delete("/", function (req, res) {
  // if (isthereatleastoneunhealthykidney()) {
  //   const newKidneys = [];
  //   for (let i = 0; i < users[0].kidneys.length; i++) {
  //     if (users[0].kidneys[i].healthy) {
  //       newKidneys.push({
  //         healthy: true,
  //       });
  //     }
  //   }
  //   users[0].kidneys = newKidneys;
  //   res.json({ msg: "done" });
  // } 
  const unhealthyKidneys = johnKidneys.filter((kidney) => !kidney.healthy);

  if (unhealthyKidneys.length !== 0) {
    users[0].kidneys = johnKidneys.filter((kidney) => kidney.healthy);
    res.json({ msg: "done" });
  } else {
    res.status(411).json({
      msg: "You have no bad kidneys",
    });
  }
});

app.listen(3000);
