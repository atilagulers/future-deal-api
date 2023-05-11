const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');
const Claim = require('../models/Claim');
const {tryCatch} = require('../utils');

//GET /claim/:claimId

router.get('/:claimId', (req, res) => {
  const claimId = req.params.claimId;
  res.status(StatusCodes.OK).send(`GET THIS CLAIM ${claimId}`);
});

//POST /claim

router.post(
  '/',
  tryCatch(async (req, res) => {
    const claim = req.body;

    const data = await Claim.create(claim);

    res.status(StatusCodes.CREATED).json({
      status: 'success',
      data,
    });
  })
);

module.exports = router;
