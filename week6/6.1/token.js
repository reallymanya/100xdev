const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "manyawillsoongetajob"
const app = express();

app.use(express.json()); 
