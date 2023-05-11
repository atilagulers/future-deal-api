const express = require('express');
const router = express.Router();

//GET /user/:userId

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`GET THIS CLAIM ${userId}`);
});

//POST /user

router.post('/', (req, res) => {
  const data = req.body;
  res.json(data);
});

module.exports = router;
