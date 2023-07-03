const express = require('express');
const app = express();
const verifyToken = require('./authMiddleware');


app.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Access granted to protected route' });
});