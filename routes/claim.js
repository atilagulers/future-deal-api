const express = require('express');
const router = express.Router();
const {StatusCodes} = require('http-status-codes');
const Claim = require('../models/Claim');
const {tryCatch} = require('../utils');

//GET /claim/:claimId
router.get(
  '/:claimId',
  tryCatch(async (req, res) => {
    const claimId = req.params.claimId;

    const data = await Claim.findById(claimId);

    res.status(StatusCodes.OK).json({
      success: true,
      data,
    });
  })
);

//POST /claim

router.post(
  '/',
  tryCatch(async (req, res) => {
    const claim = req.body;

    const data = await Claim.create(claim);

    res.status(StatusCodes.CREATED).json({
      success: true,
      data,
    });
  })
);

module.exports = router;
